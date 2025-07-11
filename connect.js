document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.connect-form form');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form fields
    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    // Simulate form submission (replace with actual API call or backend logic)
    setTimeout(() => {
      // Display success message
      alert('Your message has been sent successfully!');
      form.reset(); // Clear the form
    }, 1000);
  });
});