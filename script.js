// Sample old medicines to test with
const oldMedicines = [
    {
        name: "Paracetamol",
        manufacturer: "XYZ Pharmaceuticals",
        price: 10,
        category: "Pain Reliever",
        image: "https://via.placeholder.com/100?text=Paracetamol"
    },
    {
        name: "Amoxicillin",
        manufacturer: "ABC Pharma",
        price: 20,
        category: "Antibiotic",
        image: "https://via.placeholder.com/100?text=Amoxicillin"
    },
    {
        name: "Ibuprofen",
        manufacturer: "123 Medicines",
        price: 15,
        category: "Pain Reliever",
        image: "https://via.placeholder.com/100?text=Ibuprofen"
    },
    {
        name: "Metformin",
        manufacturer: "Def Meds",
        price: 30,
        category: "Diabetes",
        image: "https://via.placeholder.com/100?text=Metformin"
    }
];

// Add old medicines to localStorage if not already added
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
if (medicines.length === 0) {
    medicines = medicines.concat(oldMedicines);
    localStorage.setItem("medicines", JSON.stringify(medicines));
}

// Function to search and display the original medicine and alternatives
function searchMedicines() {
    const query = document.getElementById("medicineName").value.trim().toLowerCase();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = ""; // Clear previous results

    // Fetch all medicines from localStorage
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

    // If query is empty, display all medicines
    if (!query) {
        displayMedicines();
        return;
    }

    // Find the most related medicine based on name similarity
    const originalMedicine = findMostRelatedMedicine(query, medicines);

    // Filter out related medicines
    const relatedMedicines = medicines
        .filter(medicine => medicine.name.toLowerCase().includes(query) || 
                            medicine.category.toLowerCase().includes(query));

    // Show the most related medicine as the Original Medicine
    if (originalMedicine) {
        resultsSection.innerHTML += `<h3>Original Medicine</h3>`;
        resultsSection.innerHTML += createMedicineCard(originalMedicine);

        // Remove the original medicine from the related medicines list to avoid duplication
        const bestAlternatives = relatedMedicines.filter(medicine => medicine.name.toLowerCase() !== originalMedicine.name.toLowerCase());
        showBestAlternatives(bestAlternatives);
    } else {
        // If no exact match, show related medicines as Best Alternatives
        resultsSection.innerHTML += `<h3>Best Alternatives</h3>`;
        showBestAlternatives(relatedMedicines);
    }
}

// Function to find the most related medicine based on name similarity
function findMostRelatedMedicine(query, medicines) {
    // Sort medicines by the highest number of matching characters in the name
    return medicines
        .map(medicine => {
            // Get the number of matching characters between the medicine name and the query
            const matchCount = getMatchCount(query, medicine.name.toLowerCase());
            return { ...medicine, matchCount };
        })
        .sort((a, b) => b.matchCount - a.matchCount) // Sort by match count (highest first)
        .shift(); // Return the medicine with the highest match count
}

// Function to count the matching characters between two strings
function getMatchCount(query, name) {
    let matchCount = 0;
    for (let i = 0; i < query.length; i++) {
        if (name[i] === query[i]) {
            matchCount++;
        }
    }
    return matchCount;
}

// Function to show best alternatives in a sorted manner
function showBestAlternatives(relatedMedicines) {
    const resultsSection = document.getElementById("results-section");
    if (relatedMedicines.length > 0) {
        // Sort the alternatives by category, then by name similarity
        relatedMedicines.sort((a, b) => {
            return a.category.toLowerCase().localeCompare(b.category.toLowerCase()) ||
                a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });

        relatedMedicines.forEach(medicine => {
            resultsSection.innerHTML += createMedicineCard(medicine);
        });
    } else {
        resultsSection.innerHTML += `<p>No best alternatives found.</p>`;
    }
}

// Function to create a medicine card
function createMedicineCard(medicine) {
    return `
        <div class="medicine-card">
            <img src="${medicine.image || 'https://via.placeholder.com/100'}" alt="${medicine.name}">
            <div>
                <p><strong>Name:</strong> ${medicine.name}</p>
                <p><strong>Manufacturer:</strong> ${medicine.manufacturer}</p>
                <p><strong>Price:</strong> Rs. ${medicine.price}</p>
            </div>
        </div>
    `;
}

// Event listener for live search
document.getElementById("medicineName").addEventListener("input", searchMedicines);

// Display all medicines (new + old) when no search is performed
document.addEventListener("DOMContentLoaded", () => {
    displayMedicines(); // Show all medicines (new + old) on page load
});

// Function to display all medicines
function displayMedicines() {
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = ""; // Clear previous results

    // Fetch all medicines from localStorage
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

    if (medicines.length === 0) {
        resultsSection.innerHTML = `<p>No medicines found.</p>`;
        return;
    }

    // Display all medicines
    medicines.forEach(medicine => {
        resultsSection.innerHTML += createMedicineCard(medicine);
    });
}
 