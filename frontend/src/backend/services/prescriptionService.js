import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import axios from 'axios';
import { supabase } from '../config/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = process.env.VERCEL
  ? path.join(os.tmpdir(), 'uploads')
  : path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const uploadPrescription = async ({ userId, file }) => {
  if (!file) {
    const error = new Error('No file uploaded');
    error.statusCode = 400;
    throw error;
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Invalid image type');
    error.statusCode = 400;
    throw error;
  }

  const filename = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, file.buffer);

  const extractedText = await extractOCRText(filePath, file.mimetype);

  const { data, error } = await supabase
    .from('prescriptions')
    .insert({
      user_id: userId,
      file_name: filename,
      file_path: `/uploads/${filename}`,
      file_type: file.mimetype,
      ocr_text: extractedText,
    })
    .select()
    .single();

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const prescription = {
    ...data,
    _id: data.id,
    filePath: data.file_path,
    fileType: data.file_type,
    fileName: data.file_name,
    ocrText: data.ocr_text,
    aiAnalysis: data.ai_analysis,
    createdAt: data.created_at,
  };

  return {
    prescription,
    ocrText: extractedText,
  };
};

export const analyzePrescription = async ({ prescriptionId, userId }) => {
  const { data: prescription, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('id', prescriptionId)
    .eq('user_id', userId)
    .single();

  if (error || !prescription) {
    const err = new Error('Prescription not found');
    err.statusCode = 404;
    throw err;
  }

  if (!prescription.ocr_text) {
    const err = new Error('OCR text is missing');
    err.statusCode = 400;
    throw err;
  }

  let analysis;
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    analysis = await callGemini(prescription.ocr_text);
  } else {
    analysis = await callOpenAI(prescription.ocr_text);
  }

  const { data: updated, error: updateError } = await supabase
    .from('prescriptions')
    .update({ ai_analysis: analysis })
    .eq('id', prescriptionId)
    .eq('user_id', userId)
    .select()
    .single();

  if (updateError) {
    const err = new Error(updateError.message);
    err.statusCode = 400;
    throw err;
  }

  const returnedPrescription = {
    ...updated,
    _id: updated.id,
    filePath: updated.file_path,
    fileType: updated.file_type,
    fileName: updated.file_name,
    ocrText: updated.ocr_text,
    aiAnalysis: updated.ai_analysis,
    createdAt: updated.created_at,
  };

  return { prescription: returnedPrescription, analysis };
};

export const getPrescriptionHistory = async (userId) => {
  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data || []).map(p => ({
    ...p,
    _id: p.id,
    filePath: p.file_path,
    fileType: p.file_type,
    fileName: p.file_name,
    ocrText: p.ocr_text,
    aiAnalysis: p.ai_analysis,
    createdAt: p.created_at,
  }));
};

export const getPrescriptionById = async ({ prescriptionId, userId }) => {
  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('id', prescriptionId)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    const err = new Error('Prescription not found');
    err.statusCode = 404;
    throw err;
  }

  return {
    ...data,
    _id: data.id,
    filePath: data.file_path,
    fileType: data.file_type,
    fileName: data.file_name,
    ocrText: data.ocr_text,
    aiAnalysis: data.ai_analysis,
    createdAt: data.created_at,
  };
};

export const deletePrescription = async ({ prescriptionId, userId }) => {
  const { data: prescription, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('id', prescriptionId)
    .eq('user_id', userId)
    .single();

  if (error || !prescription) {
    const err = new Error('Prescription not found');
    err.statusCode = 404;
    throw err;
  }

  const { error: deleteError } = await supabase
    .from('prescriptions')
    .delete()
    .eq('id', prescriptionId)
    .eq('user_id', userId);

  if (deleteError) {
    throw deleteError;
  }

  const fullPath = path.join(uploadDir, path.basename(prescription.file_path));
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }

  return {
    ...prescription,
    _id: prescription.id,
    filePath: prescription.file_path,
    fileType: prescription.file_type,
    fileName: prescription.file_name,
    ocrText: prescription.ocr_text,
    aiAnalysis: prescription.ai_analysis,
    createdAt: prescription.created_at,
  };
};

const extractOCRText = async (filePath, mimetype) => {
  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      return await callGeminiOCR(filePath, mimetype);
    }
    const text = await simulateOCR(filePath, mimetype);
    return text;
  } catch (error) {
    const err = new Error('OCR failed');
    err.statusCode = 422;
    throw err;
  }
};

const callGeminiOCR = async (filePath, mimetype) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString('base64');
    
    // Normalize mimetype (e.g. image/jpg to image/jpeg)
    let normalizedMimeType = mimetype;
    if (mimetype === 'image/jpg') normalizedMimeType = 'image/jpeg';

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: "Extract all text from this prescription image or document. Output only the extracted text. If there is no text or it is not a prescription, output an empty string."
              },
              {
                inlineData: {
                  mimeType: normalizedMimeType,
                  data: base64Data
                }
              }
            ]
          }
        ]
      }
    );

    const extractedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return extractedText.trim();
  } catch (error) {
    console.error('Gemini OCR Error:', error.response?.data || error.message);
    throw error;
  }
};

const simulateOCR = async (filePath, mimetype) => {
  const sampleText = [
    'Dr. Jane Smith',
    'Prescription for Amitriptyline',
    'Take 1 tablet twice daily after food',
    'Duration: 10 days',
    'Avoid alcohol',
  ];

  if (mimetype === 'application/pdf') {
    return sampleText.join('\n');
  }

  return sampleText.join('\n');
};

const callGemini = async (ocrText) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze this prescription text and return structured JSON: ${ocrText}`
              }
            ]
          }
        ],
        systemInstruction: {
          parts: [
            {
              text: 'You are a medical analysis assistant. Return clean JSON matching this schema: {"medicineName":"...","genericName":"...","purpose":"...","dosage":"...","frequency":"...","timing":"...","beforeAfterFood":"...","duration":"...","possibleSideEffects":[],"warnings":[],"drugInteractions":[],"alternativeMedicines":[],"doctorNotes":"...","patientAdvice":"...","confidenceScore":0.0}'
            }
          ]
        },
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      }
    );

    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    const err = new Error('Gemini analysis failed');
    err.statusCode = 502;
    throw err;
  }
};

const callOpenAI = async (ocrText) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a medical analysis assistant. Return clean JSON only. No markdown. Use the following structure: {"medicineName":"...","genericName":"...","purpose":"...","dosage":"...","frequency":"...","timing":"...","beforeAfterFood":"...","duration":"...","possibleSideEffects":[],"warnings":[],"drugInteractions":[],"alternativeMedicines":[],"doctorNotes":"...","patientAdvice":"...","confidenceScore":0.0}',
          },
          {
            role: 'user',
            content: `Analyze this prescription text and return structured JSON: ${ocrText}`,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices?.[0]?.message?.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    const err = new Error('OpenAI analysis failed');
    err.statusCode = 502;
    throw err;
  }
};

export const getMedicinePrices = async (medicineName) => {
  return {
    medicine: medicineName || 'Sample Medicine',
    lowestPrice: '$8.00',
    amazon: '$10.00',
    netmeds: '$9.00',
    pharmEasy: '$8.50',
    apolloPharmacy: '$9.50',
    tata1mg: '$8.20',
    purchaseLink: 'https://example.com/medicine',
  };
};
