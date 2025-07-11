// Dashboard data
const dashboardData = {
    totalUsers: 1234,
    activeSessions: 56,
    revenue: 12345,
    tasks: 24,
    recentActivities: [
        { type: 'registration', user: 'John Doe', time: '2 minutes ago' },
        { type: 'system', message: 'System update completed', time: '15 minutes ago' },
        { type: 'order', orderId: '#1234', time: '1 hour ago' },
        { type: 'system', message: 'Database backup completed', time: '2 hours ago' },
        { type: 'system', message: 'Security patch installed', time: '3 hours ago' }
    ]
};

// Update dashboard cards
function updateDashboardCards() {
    document.querySelector('.card:nth-child(1) p').textContent = dashboardData.totalUsers.toLocaleString();
    document.querySelector('.card:nth-child(2) p').textContent = dashboardData.activeSessions;
    document.querySelector('.card:nth-child(3) p').textContent = `$${dashboardData.revenue.toLocaleString()}`;
    document.querySelector('.card:nth-child(4) p').textContent = dashboardData.tasks;
}

// Update recent activities
function updateRecentActivities() {
    const activityList = document.querySelector('.activity-list');
    activityList.innerHTML = '';

    dashboardData.recentActivities.forEach(activity => {
        const li = document.createElement('li');
        let activityText = '';

        switch(activity.type) {
            case 'registration':
                activityText = `New user registration - ${activity.user}`;
                break;
            case 'order':
                activityText = `New order received ${activity.orderId}`;
                break;
            case 'system':
                activityText = activity.message;
                break;
        }

        li.innerHTML = `
            <div class="activity-content">
                <span class="activity-text">${activityText}</span>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityList.appendChild(li);
    });
}

// Initialize dashboard
function initDashboard() {
    updateDashboardCards();
    updateRecentActivities();
}

// Add event listeners for navigation
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    
    // Add click handlers for navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Add your navigation logic here
            console.log(`Navigating to: ${link.getAttribute('href')}`);
        });
    });
}); 