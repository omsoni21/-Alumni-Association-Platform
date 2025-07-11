// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Check if admin is logged in
let isAdminLoggedIn = false;

// Function to handle admin login
function loginAdmin() {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    isAdminLoggedIn = true;
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
  } else {
    alert('Invalid credentials. Please try again.');
  }
}

// Initialize members array from localStorage or empty array
let members = JSON.parse(localStorage.getItem('members')) || [];

// Only display members if we're on the member.html page
if (window.location.pathname.includes('member.html')) {
  displayMembers(members);
}

// Function to display members
function displayMembers(membersList) {
  const membersListElement = document.getElementById('members-list');
  if (!membersListElement) return; // Exit if element doesn't exist
  
  membersListElement.innerHTML = '';
  membersList.forEach(member => {
    const li = document.createElement('li');
    // Add proper spacing and a separator between name and position
    li.innerHTML = `<span class="member-name">${member.name}</span> : <span class="member-position">${member.position}</span>`;
    membersListElement.appendChild(li);
  });
}

// Function to add a member
function addMember() {
  const name = document.getElementById('add-member-name').value.trim();
  const position = document.getElementById('add-member-position').value.trim();
  if (name && position) {
    members.push({ name, position });
    localStorage.setItem('members', JSON.stringify(members));
    if (window.location.pathname.includes('member.html')) {
      displayMembers(members);
    }
    document.getElementById('add-member-name').value = '';
    document.getElementById('add-member-position').value = '';
  } else {
    alert('Please fill in both name and position fields.');
  }
}

// Function to remove a member
function removeMember() {
  const name = document.getElementById('remove-member-name').value.trim();
  if (name) {
    const initialLength = members.length;
    members = members.filter(member => member.name.toLowerCase() !== name.toLowerCase());
    if (members.length < initialLength) {
      localStorage.setItem('members', JSON.stringify(members));
      if (window.location.pathname.includes('member.html')) {
        displayMembers(members);
      }
      alert(`Member "${name}" removed successfully.`);
    } else {
      alert(`Member "${name}" not found.`);
    }
    document.getElementById('remove-member-name').value = '';
  } else {
    alert('Please enter a name to remove.');
  }
}

// Function to search members
function searchMembers() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  const filteredMembers = members.filter(member => member.name.toLowerCase().includes(searchValue));
  displayMembers(filteredMembers);
}

// Function to handle member click
function handleMemberClick(event) {
  const target = event.target;
  if (target.tagName === 'LI') {
    const memberName = target.querySelector('.member-name').textContent;
    const memberPosition = target.querySelector('.member-position').textContent;
    const memberDetails = {
      name: memberName,
      position: memberPosition
    };
    localStorage.setItem('selectedMember', JSON.stringify(memberDetails));
    window.location.href = 'members-details.html';
  }
}

// Add event listener to members list 
const membersList = document.getElementById('members-list');
if (membersList) {
  membersList.addEventListener('click', handleMemberClick);
} 

// Function to display member details
function displayMemberDetails() {
  const memberDetails = JSON.parse(localStorage.getItem('selectedMember'));
  if (memberDetails) {
    const detailsContainer = document.getElementById('member-details'); 
    detailsContainer.innerHTML = `
      <h2>${memberDetails.name}</h2>
      <p>${memberDetails.position}</p>
    `;
  }
} 

// Add event listener to members details page
const memberDetailsPage = document.getElementById('member-details');
if (memberDetailsPage) {
  memberDetailsPage.addEventListener('click', displayMemberDetails);
} 



