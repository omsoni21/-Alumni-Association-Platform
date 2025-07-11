// Load feedback entries from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadFeedback();
});

// Handle form submission
document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    // Create feedback object
    const feedback = {
        name,
        email,
        rating,
        comments,
        timestamp: new Date().toLocaleString(),
    };

    // Save feedback to localStorage
    saveFeedback(feedback);

    // Clear the form
    document.getElementById('feedback-form').reset();
    document.getElementById('rating-output').textContent = '3';

    // Reload feedback entries
    loadFeedback();
});

// Save feedback to localStorage
function saveFeedback(feedback) {
    let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    feedbackList.push(feedback);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
}

// Load feedback from localStorage and display it
function loadFeedback() {
    const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    const feedbackEntries = document.getElementById('feedback-entries');
    feedbackEntries.innerHTML = '';

    feedbackList.forEach((feedback, index) => {
        const entry = document.createElement('div');
        entry.className = 'feedback-entry';
        entry.innerHTML = `
            <p><strong>Name:</strong> ${feedback.name}</p>
            <p><strong>Email:</strong> ${feedback.email}</p>
            <p><strong>Rating:</strong> ${feedback.rating}/5</p>
            <p><strong>Comments:</strong> ${feedback.comments}</p>
            <p><strong>Submitted On:</strong> ${feedback.timestamp}</p>
            <button class="delete-button" onclick="deleteFeedback(${index})">Delete</button>
        `;
        feedbackEntries.appendChild(entry);
    });
}

// Delete feedback entry
function deleteFeedback(index) {
    let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    feedbackList.splice(index, 1); // Remove the feedback entry at the specified index
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
    loadFeedback(); // Reload feedback entries
}

// Update rating output as the slider changes
document.getElementById('rating').addEventListener('input', function () {
    document.getElementById('rating-output').textContent = this.value;
});