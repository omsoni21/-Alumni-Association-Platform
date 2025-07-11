  // Check if user is logged in
        document.addEventListener("DOMContentLoaded", function () {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                window.location.href = 'admin_login.html'; // Redirect to login if not logged in
            }
        });

        // Logout functionality
        document.getElementById('logout').addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('loggedInUser'); // Clear logged-in user
            window.location.href = 'admin_login.html'; // Redirect to login page
        });