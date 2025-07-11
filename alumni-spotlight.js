// Handle "Connect" Button Click
document.querySelectorAll('.overlay .btn').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Redirecting to the registration page...');
    window.location.href = this.getAttribute('href'); // Redirect to the registration page
  });
});

// Optional: Add animations or other interactivity
document.addEventListener('DOMContentLoaded', function () {
  // Add any additional JavaScript functionality here
});