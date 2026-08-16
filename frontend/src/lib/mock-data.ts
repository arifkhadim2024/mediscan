export type Pharmacy = {
  name: string;
  price: number;
  availability: "In Stock" | "Low Stock" | "Out of Stock";
  delivery: string;
  url: string;
  logoColor: string;
};

export type Medicine = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  purpose: string;
  howToTake: string;
  timing: "Before food" | "After food" | "With food" | "Anytime";
  sideEffects: string[];
  warnings: string[];
  interactions: string[];
  alternatives: string[];
  description: string;
  uses: string[];
  benefits: string[];
  storage: string;
  pregnancy: string;
  alcohol: string;
  driving: string;
  kidney: string;
  liver: string;
  foodInteractions: string;
  prices: Pharmacy[];
  image?: string;
};

export type Prescription = {
  id: string;
  doctor: string;
  patient: string;
  hospital: string;
  date: string;
  status: "Analyzed" | "Processing" | "Failed";
  medicines: Medicine[];
};

export const directProductUrls: Record<string, Record<string, string>> = {
  "paracetamol-650": {
    "Tata 1mg": "https://www.1mg.com/drugs/dolo-650-tablet-74051",
    "PharmEasy": "https://pharmeasy.in/online-medicine-order/dolo-650mg-strip-of-15-tablets-21946",
    "Amazon Pharmacy": "https://www.amazon.in/s?k=Dolo+650",
    "Apollo Pharmacy": "https://www.apollopharmacy.in/otc/dolo-650mg-tablet-15-s",
    "Netmeds": "https://www.netmeds.com/prescriptions/dolo-650-mg-tablet-15-s",
    "Flipkart Health+": "https://healthplus.flipkart.com/dolo-650mg-tablet-15-s"
  },
  "azithromycin-500": {
    "Tata 1mg": "https://www.1mg.com/drugs/azee-500-tablet-132204",
    "PharmEasy": "https://pharmeasy.in/online-medicine-order/azee-500mg-tablet-21950",
    "Amazon Pharmacy": "https://www.amazon.in/s?k=Azee+500",
    "Apollo Pharmacy": "https://www.apollopharmacy.in/medicine/azee-500mg-tablet",
    "Netmeds": "https://www.netmeds.com/prescriptions/azee-500-mg-tablet-5-s",
    "Flipkart Health+": "https://healthplus.flipkart.com/azee-500mg-tablet-5-s"
  },
  "pantoprazole-40": {
    "Tata 1mg": "https://www.1mg.com/drugs/pan-40-tablet-66046",
    "PharmEasy": "https://pharmeasy.in/online-medicine-order/pan-40mg-tablet-21952",
    "Amazon Pharmacy": "https://www.amazon.in/s?k=Pan+40",
    "Apollo Pharmacy": "https://www.apollopharmacy.in/medicine/pan-40mg-tablet",
    "Netmeds": "https://www.netmeds.com/prescriptions/pan-40-mg-tablet-15-s",
    "Flipkart Health+": "https://healthplus.flipkart.com/pan-40mg-tablet-15-s"
  }
};

export function getPharmacyUrl(pharmacyName: string, medicineId: string, medicineName: string): string {
  const normalizedId = medicineId.toLowerCase();
  const normalizedName = medicineName.toLowerCase();
  
  let key = "";
  if (normalizedId.includes("paracetamol") || normalizedName.includes("paracetamol") || normalizedName.includes("dolo")) {
    key = "paracetamol-650";
  } else if (normalizedId.includes("azithromycin") || normalizedName.includes("azithromycin") || normalizedName.includes("azee")) {
    key = "azithromycin-500";
  } else if (normalizedId.includes("pantoprazole") || normalizedName.includes("pantoprazole") || normalizedName.includes("pan 40")) {
    key = "pantoprazole-40";
  }

  if (key && directProductUrls[key]?.[pharmacyName]) {
    return directProductUrls[key][pharmacyName];
  }

  switch (pharmacyName) {
    case "Amazon Pharmacy":
      return `https://www.amazon.in/s?k=${encodeURIComponent(medicineName)}`;
    case "Tata 1mg":
      return `https://www.1mg.com/search/all?name=${encodeURIComponent(medicineName)}`;
    case "PharmEasy":
      return `https://pharmeasy.in/search/all?searchTextField=${encodeURIComponent(medicineName)}`;
    case "Apollo Pharmacy":
      return `https://www.apollopharmacy.in/search-medicines/${encodeURIComponent(medicineName)}`;
    case "Netmeds":
      return `https://www.netmeds.com/catalogsearch/result?q=${encodeURIComponent(medicineName)}`;
    case "Flipkart Health+":
      return `https://healthplus.flipkart.com/search?q=${encodeURIComponent(medicineName)}`;
    default:
      return `https://www.1mg.com/search/all?name=${encodeURIComponent(medicineName)}`;
  }
}

const pharmacies = (base: number, medicineName: string, medicineId: string): Pharmacy[] => [
  { name: "Amazon Pharmacy", price: base + 2, availability: "In Stock", delivery: "2 days", url: getPharmacyUrl("Amazon Pharmacy", medicineId, medicineName), logoColor: "#FF9900" },
  { name: "Tata 1mg", price: base, availability: "In Stock", delivery: "1 day", url: getPharmacyUrl("Tata 1mg", medicineId, medicineName), logoColor: "#F97316" },
  { name: "PharmEasy", price: base + 1, availability: "In Stock", delivery: "2 days", url: getPharmacyUrl("PharmEasy", medicineId, medicineName), logoColor: "#10B981" },
  { name: "Apollo Pharmacy", price: base + 4, availability: "Low Stock", delivery: "Same day", url: getPharmacyUrl("Apollo Pharmacy", medicineId, medicineName), logoColor: "#0EA5E9" },
  { name: "Netmeds", price: base + 3, availability: "In Stock", delivery: "3 days", url: getPharmacyUrl("Netmeds", medicineId, medicineName), logoColor: "#EF4444" },
  { name: "Flipkart Health+", price: base + 5, availability: "In Stock", delivery: "3 days", url: getPharmacyUrl("Flipkart Health+", medicineId, medicineName), logoColor: "#2563EB" },
];

export const medicines: Medicine[] = [
  {
    id: "paracetamol-650",
    name: "Paracetamol 650",
    dosage: "650 mg",
    frequency: "1-0-1",
    duration: "5 Days",
    purpose: "Pain Relief & Fever",
    howToTake: "Swallow whole with a glass of water.",
    timing: "After food",
    sideEffects: ["Nausea", "Rash", "Loss of appetite", "Mild drowsiness"],
    warnings: ["Do not exceed 4g per day", "Avoid with liver conditions"],
    interactions: ["Warfarin", "Alcohol", "Isoniazid"],
    alternatives: ["Crocin 650", "Dolo 650", "Calpol 650"],
    description: "Paracetamol is a common pain reliever and a fever reducer, used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.",
    uses: ["Fever", "Mild to moderate pain", "Headache", "Body ache"],
    benefits: ["Fast acting relief", "Well tolerated", "Safe for most adults"],
    storage: "Store below 25°C in a dry place away from direct sunlight.",
    pregnancy: "Generally safe. Consult your doctor before use.",
    alcohol: "Avoid alcohol — may increase risk of liver damage.",
    driving: "Safe. Does not usually affect ability to drive.",
    kidney: "Use with caution in kidney disease.",
    liver: "Not recommended for patients with severe liver disease.",
    foodInteractions: "No significant food interactions. Take after meals to avoid stomach upset.",
    prices: pharmacies(68, "Paracetamol 650", "paracetamol-650"),
    image: "/images/paracetamol.png",
  },
  {
    id: "azithromycin-500",
    name: "Azithromycin 500",
    dosage: "500 mg",
    frequency: "1-0-0",
    duration: "3 Days",
    purpose: "Bacterial Infection",
    howToTake: "Take at the same time each day.",
    timing: "Before food",
    sideEffects: ["Diarrhea", "Nausea", "Abdominal pain", "Headache"],
    warnings: ["Complete the full course", "May cause QT prolongation"],
    interactions: ["Antacids", "Warfarin", "Digoxin"],
    alternatives: ["Azee 500", "Zithromax", "Azax 500"],
    description: "Azithromycin is a broad-spectrum macrolide antibiotic used to treat a variety of bacterial infections.",
    uses: ["Respiratory tract infections", "Ear infections", "Skin infections", "STIs"],
    benefits: ["Short 3-day course", "Long lasting effect", "Once daily dosing"],
    storage: "Store below 30°C.",
    pregnancy: "Use only if clearly needed. Consult doctor.",
    alcohol: "Avoid — may worsen side effects.",
    driving: "Caution — may cause dizziness.",
    kidney: "Safe in mild-moderate impairment.",
    liver: "Avoid in severe liver disease.",
    foodInteractions: "Take 1 hour before or 2 hours after meals for best absorption.",
    prices: pharmacies(142, "Azithromycin 500", "azithromycin-500"),
    image: "/images/azithromycin.png",
  },
  {
    id: "pantoprazole-40",
    name: "Pantoprazole 40",
    dosage: "40 mg",
    frequency: "1-0-0",
    duration: "14 Days",
    purpose: "Acidity & GERD",
    howToTake: "Swallow tablet whole, do not crush.",
    timing: "Before food",
    sideEffects: ["Headache", "Diarrhea", "Nausea", "Gas"],
    warnings: ["Long term use may reduce vitamin B12", "Avoid abrupt stop"],
    interactions: ["Clopidogrel", "Methotrexate"],
    alternatives: ["Pan 40", "Pantocid", "Pantop 40"],
    description: "Pantoprazole reduces stomach acid production and is used to treat acid-related conditions.",
    uses: ["GERD", "Peptic ulcer", "Zollinger-Ellison syndrome"],
    benefits: ["Long lasting acid control", "Heals ulcers", "Once daily"],
    storage: "Store below 25°C, protect from moisture.",
    pregnancy: "Consult doctor before use.",
    alcohol: "May worsen acidity — best avoided.",
    driving: "Generally safe.",
    kidney: "No dose adjustment needed.",
    liver: "Reduce dose in severe liver disease.",
    foodInteractions: "Take 30-60 minutes before breakfast.",
    prices: pharmacies(85, "Pantoprazole 40", "pantoprazole-40"),
    image: "/images/pantoprazole.png",
  },
];

export const prescriptions: Prescription[] = [
  {
    id: "rx-1024",
    doctor: "Dr. Anita Rao, MD",
    patient: "Rahul Sharma",
    hospital: "Apollo Hospital, Bengaluru",
    date: "2026-06-28",
    status: "Analyzed",
    medicines: [medicines[0], medicines[1]],
  },
  {
    id: "rx-1018",
    doctor: "Dr. Vikram Nair, MBBS",
    patient: "Rahul Sharma",
    hospital: "Fortis Health, Mumbai",
    date: "2026-06-14",
    status: "Analyzed",
    medicines: [medicines[2]],
  },
  {
    id: "rx-1002",
    doctor: "Dr. Meera Iyer, MD",
    patient: "Rahul Sharma",
    hospital: "Manipal Clinic, Pune",
    date: "2026-05-30",
    status: "Analyzed",
    medicines: [medicines[0], medicines[2]],
  },
];

export const dashboardStats = {
  totalPrescriptions: 12,
  medicinesAnalyzed: 34,
  savings: 1284,
  activity: [
    { day: "Mon", prescriptions: 2, medicines: 5 },
    { day: "Tue", prescriptions: 1, medicines: 3 },
    { day: "Wed", prescriptions: 3, medicines: 8 },
    { day: "Thu", prescriptions: 0, medicines: 0 },
    { day: "Fri", prescriptions: 2, medicines: 6 },
    { day: "Sat", prescriptions: 4, medicines: 9 },
    { day: "Sun", prescriptions: 0, medicines: 3 },
  ],
};

export function findMedicine(id: string) {
  return medicines.find((m) => m.id === id);
}
export function findPrescription(id: string) {
  return prescriptions.find((p) => p.id === id);
}