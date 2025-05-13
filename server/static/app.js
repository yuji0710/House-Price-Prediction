
document.addEventListener("DOMContentLoaded", function () {
    fetchLocations();
});

function fetchLocations() {
    fetch("http://127.0.0.1:5000/get_location_names")
        .then(response => response.json())
        .then(data => {
            let locationSelect = document.getElementById("location");
            locationSelect.innerHTML = "";
            data.locations.forEach(location => {
                let option = document.createElement("option");
                option.value = location;
                option.textContent = location;
                locationSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching locations:", error));
}

function predictPrice() {
    let sqft = document.getElementById("sqft").value;
    let location = document.getElementById("location").value;
    let bhk = document.getElementById("bhk").value;
    let bath = document.getElementById("bath").value;

    if (!sqft || !bhk || !bath || !location) {
        alert("⚠️ Please fill in all fields");
        return;
    }

    let requestData = {
        total_sqft: parseFloat(sqft),
        location: location,
        bhk: parseInt(bhk),
        bath: parseInt(bath)
    };

    fetch("http://127.0.0.1:5000/predict_home_price", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("⚠️ Error: " + data.error);
            } else {
                document.getElementById("result").innerHTML = `Estimated Price: <strong>₹${data.estimated_price} Lakh</strong>`;
            }
        })
        .catch(error => console.error("Error predicting price:", error));
}
