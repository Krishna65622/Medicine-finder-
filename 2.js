setTimeout(function() {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            document.body.style.overflow = 'auto'; 
        }
     
let oldMedicines = [
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
]


let medicines = JSON.parse(localStorage.getItem("medicines")) || []
if (medicines.length === 0) {
    medicines = medicines.concat(oldMedicines);
    localStorage.setItem("medicines", JSON.stringify(medicines));
}


function searchMedicines() {
    const query = document.getElementById("medicineName").value.trim().toLowerCase();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = ""; 
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

    if (!query) {
        displayMedicines();
        return;
    }


    const originalMedicine = findMostRelatedMedicine(query, medicines);

    
    const relatedMedicines = medicines
        .filter(medicine => medicine.name.toLowerCase().includes(query) || 
                            medicine.category.toLowerCase().includes(query));

    
    if (originalMedicine) {
        resultsSection.innerHTML += `<h3>Original Medicine</h3>`;
        resultsSection.innerHTML += createMedicineCard(originalMedicine);

        
        const bestAlternatives = relatedMedicines.filter(medicine => medicine.name.toLowerCase() !== originalMedicine.name.toLowerCase());
        showBestAlternatives(bestAlternatives);
    } else {
        
        resultsSection.innerHTML += `<h3>Best Alternatives</h3>`;
        showBestAlternatives(relatedMedicines);
    }
}


function findMostRelatedMedicine(query, medicines) {
    
    return medicines
        .map(medicine => {
            
            const matchCount = getMatchCount(query, medicine.name.toLowerCase());
            return { medicine, matchCount };
        })
        .sort((a, b) => b.matchCount - a.matchCount) 
        .shift();
}


function getMatchCount(query, name) {
    let matchCount = 0;
    for (let i = 0; i < query.length; i++) {
        if (name[i] === query[i]) {
            matchCount++;
        }
    }
    return matchCount;
}


function showBestAlternatives(relatedMedicines) {
    const resultsSection = document.getElementById("results-section");
    if (relatedMedicines.length > 0) {
        
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


document.getElementById("medicineName").addEventListener("input", searchMedicines);


document.addEventListener("DOMContentLoaded", () => {
    displayMedicines(); 
});


function displayMedicines() {
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = ""; 
    let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

    if (medicines.length === 0) {
        resultsSection.innerHTML = `<p>No medicines found.</p>`;
        return;
    }

    medicines.forEach(medicine => {
        resultsSection.innerHTML += createMedicineCard(medicine);
    });
} 



  // Load existing medicines from localStorage or initialize with an empty array
let Medicines = JSON.parse(localStorage.getItem("medicines")) || [];

// Function to add a new medicine
function addMedicine(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById("new-medicine-name").value.trim();
    const manufacturer = document.getElementById("new-medicine-manufacturer").value.trim();
    const price = parseFloat(document.getElementById("new-medicine-price").value.trim());
    const category = document.getElementById("new-medicine-category").value;
    const image = document.getElementById("new-medicine-image").value.trim();

    if (name && manufacturer && price && category) {
        // Add the new medicine to the array
        const newMedicine = {
            name,
            manufacturer,
            price,
            category,
            image: image || "https://via.placeholder.com/100"
        };
        medicines.push(newMedicine);

        // Save updated medicines to localStorage
        localStorage.setItem("medicines", JSON.stringify(medicines));

        // Clear the form
        document.getElementById("add-medicine-form").reset();

        alert("Medicine added successfully!");
    } else {
        alert("Please fill out all required fields.");
    }
}

// Event listener for adding a new medicine
document.getElementById("add-medicine-form").addEventListener("submit", addMedicine);

 