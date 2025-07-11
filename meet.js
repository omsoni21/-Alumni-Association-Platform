// Load events with RSVP
const events = JSON.parse(localStorage.getItem('events')) || [];
const eventList = document.getElementById('eventList');

// Function to display events with RSVP
function displayEventsWithRSVP() {
  eventList.innerHTML = ''; // Clear existing content

  events.forEach((event, index) => {
    if (event.event_rsvp) {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event-details';
      eventDiv.innerHTML = `
        <h3>${event.event_name}</h3>
        <p><strong>Date:</strong> ${event.event_date}</p>
        <p><strong>Time:</strong> ${event.event_time}</p>
        <p><strong>Location:</strong> ${event.event_location}</p>
        <p><strong>RSVP:</strong> <button class="rsvpBtn" data-index="${index}">Click to RSVP</button></p>
      `;
      eventList.appendChild(eventDiv);
    }
  });

  // Add event listeners to RSVP buttons
  document.querySelectorAll('.rsvpBtn').forEach(button => {
    button.addEventListener('click', () => {
      const eventIndex = button.getAttribute('data-index');
      const event = events[eventIndex];
      document.getElementById('rsvpModal').style.display = 'flex';

      // Update RSVP form to include event details
      const rsvpForm = document.getElementById('rsvpForm');
      rsvpForm.dataset.eventIndex = eventIndex;
    });
  });
}

// Open RSVP Modal
document.getElementById('rsvpBtn')?.addEventListener('click', function () {
  document.getElementById('rsvpModal').style.display = 'flex';
});

// Close RSVP Modal
document.querySelector('.close-btn')?.addEventListener('click', function () {
  document.getElementById('rsvpModal').style.display = 'none';
});

// Handle RSVP Form Submission
document.getElementById('rsvpForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const eventIndex = this.dataset.eventIndex;

  // Save RSVP data (you can send this to a server or store it locally)
  const rsvpData = { name, email, eventIndex };
  console.log('RSVP Submitted:', rsvpData);

  // Close the modal
  document.getElementById('rsvpModal').style.display = 'none';

  // Show a success message
  alert('Thank you for RSVPing! We look forward to seeing you at the event.');
});

// Display events with RSVP when the page loads
displayEventsWithRSVP();