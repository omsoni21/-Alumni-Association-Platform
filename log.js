document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("adminSignupForm");
    const loginForm = document.getElementById("adminLoginForm");

    // ADMIN SIGNUP HANDLING
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("signupUsername").value;
            let password = document.getElementById("signupPassword").value;

            let admins = JSON.parse(localStorage.getItem("admins")) || [];

            // Check if username already exists
            if (admins.some(admin => admin.username === username)) {
                alert("Username already exists! Try a different one.");
                return;
            }

            admins.push({ username, password });
            localStorage.setItem("admins", JSON.stringify(admins));

            document.getElementById("signupSuccess").classList.remove("hidden");
            signupForm.reset();
        });
    }

    // ADMIN LOGIN HANDLING
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("adminUsername").value;
            let password = document.getElementById("adminPassword").value;

            let admins = JSON.parse(localStorage.getItem("admins")) || [];
            let adminExists = admins.some(admin => admin.username === username && admin.password === password);

            if (adminExists) {
                localStorage.setItem("adminLoggedIn", "true");
                window.location.href = "admin_dashboard.html"; // Redirect to donation portal
            } else {
                document.getElementById("loginError").classList.remove("hidden");
            }
        });
    }

    // CHECK ADMIN LOGIN FOR DONATION PORTAL
    if (window.location.pathname.includes("donation_portal.html")) {
        checkAdminLogin();
        displayDonations(); // Display donation transactions
    }
});

// FUNCTION TO CHECK IF ADMIN IS LOGGED IN
function checkAdminLogin() {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "admin_logi.html";
    }
}

// FUNCTION TO LOGOUT ADMIN
function logoutAdmin() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin_logi.html";
}

// FUNCTION TO DISPLAY DONATION TRANSACTIONS
function displayDonations() {
    const donationList = document.getElementById("donationList");
    if (!donationList) return;

    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donationList.innerHTML = ""; // Clear the list before displaying

    donations.forEach((donation, index) => {
        const donationItem = document.createElement("div");
        donationItem.className = "donation-item";
        donationItem.innerHTML = `
            <h3>Donation #${index + 1}</h3>
            <p><strong>Donor Name:</strong> ${donation.donorName}</p>
            <p><strong>Amount:</strong> $${donation.amount}</p>
            <p><strong>Date:</strong> ${donation.date}</p>
            <p><strong>Message:</strong> ${donation.message}</p>
        `;
        donationList.appendChild(donationItem);
    });
}

// FUNCTION TO HANDLE DONATION SUBMISSION (IF NEEDED)
function submitDonation(event) {
    event.preventDefault();

    let donorName = document.getElementById("donorName").value;
    let amount = document.getElementById("donationAmount").value;
    let message = document.getElementById("donationMessage").value;
    let date = new Date().toLocaleDateString();

    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push({ donorName, amount, date, message });
    localStorage.setItem("donations", JSON.stringify(donations));

    alert("Donation submitted successfully!");
    displayDonations(); // Refresh the donation list
}