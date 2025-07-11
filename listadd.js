document.addEventListener('DOMContentLoaded', function () {
  const alumniGrid = document.getElementById('alumni-grid');

  // Retrieve alumni data from localStorage
  const alumniList = JSON.parse(localStorage.getItem('alumniList')) || [];

  // Function to create an alumni card
  function createAlumniCard(alumni) {
    const card = document.createElement('div');
    card.classList.add('alumni-card');

    card.innerHTML = `
      <img src="${alumni.image}" alt="${alumni.name}">
      <div class="details">
        <h3>${alumni.name}</h3>
        <p><strong>Graduation Year:</strong> ${alumni.graduationYear}</p>
        <p><strong>Profession:</strong> ${alumni.profession}</p>
        <p><strong>Company:</strong> ${alumni.company}</p>
        <a href="connect.html" class="btn-connect">Connect</a>
      </div>
    `;

    return card;
  }

  // Add alumni cards to the grid
  alumniList.forEach((alumni) => {
    const card = createAlumniCard(alumni);
    alumniGrid.appendChild(card);
  });
});