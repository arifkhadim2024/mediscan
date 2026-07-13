//#region node_modules/.nitro/vite/services/ssr/assets/mock-data-BduAF806.js
var pharmacies = (base) => [
	{
		name: "Amazon Pharmacy",
		price: base + 2,
		availability: "In Stock",
		delivery: "2 days",
		url: "https://www.amazon.in/pharmacy",
		logoColor: "#FF9900"
	},
	{
		name: "Tata 1mg",
		price: base,
		availability: "In Stock",
		delivery: "1 day",
		url: "https://www.1mg.com",
		logoColor: "#F97316"
	},
	{
		name: "PharmEasy",
		price: base + 1,
		availability: "In Stock",
		delivery: "2 days",
		url: "https://pharmeasy.in",
		logoColor: "#10B981"
	},
	{
		name: "Apollo Pharmacy",
		price: base + 4,
		availability: "Low Stock",
		delivery: "Same day",
		url: "https://www.apollopharmacy.in",
		logoColor: "#0EA5E9"
	},
	{
		name: "Netmeds",
		price: base + 3,
		availability: "In Stock",
		delivery: "3 days",
		url: "https://www.netmeds.com",
		logoColor: "#EF4444"
	},
	{
		name: "Flipkart Health+",
		price: base + 5,
		availability: "In Stock",
		delivery: "3 days",
		url: "https://healthplus.flipkart.com",
		logoColor: "#2563EB"
	}
];
var medicines = [
	{
		id: "paracetamol-650",
		name: "Paracetamol 650",
		dosage: "650 mg",
		frequency: "1-0-1",
		duration: "5 Days",
		purpose: "Pain Relief & Fever",
		howToTake: "Swallow whole with a glass of water.",
		timing: "After food",
		sideEffects: [
			"Nausea",
			"Rash",
			"Loss of appetite",
			"Mild drowsiness"
		],
		warnings: ["Do not exceed 4g per day", "Avoid with liver conditions"],
		interactions: [
			"Warfarin",
			"Alcohol",
			"Isoniazid"
		],
		alternatives: [
			"Crocin 650",
			"Dolo 650",
			"Calpol 650"
		],
		description: "Paracetamol is a common pain reliever and a fever reducer, used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.",
		uses: [
			"Fever",
			"Mild to moderate pain",
			"Headache",
			"Body ache"
		],
		benefits: [
			"Fast acting relief",
			"Well tolerated",
			"Safe for most adults"
		],
		storage: "Store below 25°C in a dry place away from direct sunlight.",
		pregnancy: "Generally safe. Consult your doctor before use.",
		alcohol: "Avoid alcohol — may increase risk of liver damage.",
		driving: "Safe. Does not usually affect ability to drive.",
		kidney: "Use with caution in kidney disease.",
		liver: "Not recommended for patients with severe liver disease.",
		foodInteractions: "No significant food interactions. Take after meals to avoid stomach upset.",
		prices: pharmacies(68)
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
		sideEffects: [
			"Diarrhea",
			"Nausea",
			"Abdominal pain",
			"Headache"
		],
		warnings: ["Complete the full course", "May cause QT prolongation"],
		interactions: [
			"Antacids",
			"Warfarin",
			"Digoxin"
		],
		alternatives: [
			"Azee 500",
			"Zithromax",
			"Azax 500"
		],
		description: "Azithromycin is a broad-spectrum macrolide antibiotic used to treat a variety of bacterial infections.",
		uses: [
			"Respiratory tract infections",
			"Ear infections",
			"Skin infections",
			"STIs"
		],
		benefits: [
			"Short 3-day course",
			"Long lasting effect",
			"Once daily dosing"
		],
		storage: "Store below 30°C.",
		pregnancy: "Use only if clearly needed. Consult doctor.",
		alcohol: "Avoid — may worsen side effects.",
		driving: "Caution — may cause dizziness.",
		kidney: "Safe in mild-moderate impairment.",
		liver: "Avoid in severe liver disease.",
		foodInteractions: "Take 1 hour before or 2 hours after meals for best absorption.",
		prices: pharmacies(142)
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
		sideEffects: [
			"Headache",
			"Diarrhea",
			"Nausea",
			"Gas"
		],
		warnings: ["Long term use may reduce vitamin B12", "Avoid abrupt stop"],
		interactions: ["Clopidogrel", "Methotrexate"],
		alternatives: [
			"Pan 40",
			"Pantocid",
			"Pantop 40"
		],
		description: "Pantoprazole reduces stomach acid production and is used to treat acid-related conditions.",
		uses: [
			"GERD",
			"Peptic ulcer",
			"Zollinger-Ellison syndrome"
		],
		benefits: [
			"Long lasting acid control",
			"Heals ulcers",
			"Once daily"
		],
		storage: "Store below 25°C, protect from moisture.",
		pregnancy: "Consult doctor before use.",
		alcohol: "May worsen acidity — best avoided.",
		driving: "Generally safe.",
		kidney: "No dose adjustment needed.",
		liver: "Reduce dose in severe liver disease.",
		foodInteractions: "Take 30-60 minutes before breakfast.",
		prices: pharmacies(85)
	}
];
var prescriptions = [
	{
		id: "rx-1024",
		doctor: "Dr. Anita Rao, MD",
		patient: "Rahul Sharma",
		hospital: "Apollo Hospital, Bengaluru",
		date: "2026-06-28",
		status: "Analyzed",
		medicines: [medicines[0], medicines[1]]
	},
	{
		id: "rx-1018",
		doctor: "Dr. Vikram Nair, MBBS",
		patient: "Rahul Sharma",
		hospital: "Fortis Health, Mumbai",
		date: "2026-06-14",
		status: "Analyzed",
		medicines: [medicines[2]]
	},
	{
		id: "rx-1002",
		doctor: "Dr. Meera Iyer, MD",
		patient: "Rahul Sharma",
		hospital: "Manipal Clinic, Pune",
		date: "2026-05-30",
		status: "Analyzed",
		medicines: [medicines[0], medicines[2]]
	}
];
var dashboardStats = {
	totalPrescriptions: 12,
	medicinesAnalyzed: 34,
	savings: 1284,
	activity: [
		{
			day: "Mon",
			prescriptions: 2,
			medicines: 5
		},
		{
			day: "Tue",
			prescriptions: 1,
			medicines: 3
		},
		{
			day: "Wed",
			prescriptions: 3,
			medicines: 8
		},
		{
			day: "Thu",
			prescriptions: 0,
			medicines: 0
		},
		{
			day: "Fri",
			prescriptions: 2,
			medicines: 6
		},
		{
			day: "Sat",
			prescriptions: 4,
			medicines: 9
		},
		{
			day: "Sun",
			prescriptions: 0,
			medicines: 3
		}
	]
};
function findMedicine(id) {
	return medicines.find((m) => m.id === id);
}
function findPrescription(id) {
	return prescriptions.find((p) => p.id === id);
}
//#endregion
export { prescriptions as a, medicines as i, findMedicine as n, findPrescription as r, dashboardStats as t };
