// Load existing medicines from localStorage or initialize with an empty array
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

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
