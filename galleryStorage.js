// Shared image storage functionality
const imageStorage = {
    // Get all images from localStorage
    getImages: function() {
        return JSON.parse(localStorage.getItem('galleryImages') || '[]');
    },

    // Save images to localStorage
    saveImages: function(images) {
        localStorage.setItem('galleryImages', JSON.stringify(images));
    },

    // Add a new image
    addImage: function(imageUrl) {
        const images = this.getImages();
        images.push({
            url: imageUrl,
            id: Date.now() // Unique ID for each image
        });
        this.saveImages(images);
    },

    // Delete an image by ID
    deleteImage: function(imageId) {
        const images = this.getImages();
        const filteredImages = images.filter(img => img.id !== imageId);
        this.saveImages(filteredImages);
    },

    // Check if user is admin
    isAdmin: function() {
        return localStorage.getItem('adminLoggedIn') === 'true';
    }
}; 