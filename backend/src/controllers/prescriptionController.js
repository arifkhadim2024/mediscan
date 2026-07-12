import { asyncHandler, sendSuccess } from '../utils/apiResponse.js';
import { uploadPrescription, analyzePrescription, getPrescriptionHistory, getPrescriptionById, deletePrescription, getMedicinePrices } from '../services/prescriptionService.js';

export const upload = asyncHandler(async (req, res) => {
  const result = await uploadPrescription({ userId: req.user._id, file: req.file });
  sendSuccess(res, 'Prescription uploaded successfully', result, 201);
});

export const analyze = asyncHandler(async (req, res) => {
  const result = await analyzePrescription({ prescriptionId: req.body.prescriptionId, userId: req.user._id });
  sendSuccess(res, 'Prescription analyzed successfully', result, 200);
});

export const history = asyncHandler(async (req, res) => {
  const result = await getPrescriptionHistory(req.user._id);
  sendSuccess(res, 'Prescription history fetched successfully', result, 200);
});

export const remove = asyncHandler(async (req, res) => {
  const result = await deletePrescription({ prescriptionId: req.params.id, userId: req.user._id });
  sendSuccess(res, 'Prescription deleted successfully', result, 200);
});

export const getOne = asyncHandler(async (req, res) => {
  const result = await getPrescriptionById({ prescriptionId: req.params.id, userId: req.user._id });
  sendSuccess(res, 'Prescription fetched successfully', result, 200);
});

export const prices = asyncHandler(async (req, res) => {
  const result = await getMedicinePrices(req.query.medicine || 'Aspirin');
  sendSuccess(res, 'Medicine price comparison fetched successfully', result, 200);
});
