// Handling the file upload form submission
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const fileInput = document.getElementById('photo-upload');
    const file = fileInput.files[0];

    if (file) {
        // Simulating the photo upload
        const reader = new FileReader();
        reader.onloadend = function() {
            const uploadedImage = reader.result;

            // Store the uploaded image in localStorage (for demo purposes)
            let uploadedPhotos = JSON.parse(localStorage.getItem('uploadedPhotos')) || [];
            uploadedPhotos.push(uploadedImage);
            localStorage.setItem('uploadedPhotos', JSON.stringify(uploadedPhotos));

            showStatus('Your photo has been uploaded successfully!', 'green');
        }
        reader.readAsDataURL(file);
    } else {
        showStatus('Please select a photo to upload.', 'red');
    }
});

// Show a status message
function showStatus(message, color) {
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = message;
    statusMessage.style.color = color;
}
