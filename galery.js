// Display uploaded photos from localStorage
window.onload = function() {
    const galleryContainer = document.getElementById('photo-gallery');

    // Retrieve uploaded photos from localStorage
    const uploadedPhotos = JSON.parse(localStorage.getItem('uploadedPhotos')) || [];

    // If there are photos, display them
    if (uploadedPhotos.length > 0) {
        uploadedPhotos.forEach(photo => {
            const imgElement = document.createElement('img');
            imgElement.src = photo;
            galleryContainer.appendChild(imgElement);
        });
    } else {
        galleryContainer.innerHTML = '<p>No photos uploaded yet.</p>';
    }
};
