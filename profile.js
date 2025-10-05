/* ===================================
   FIXIT PROFILE PAGE - JAVASCRIPT
   =================================== */

/* ===================================
   LOAD USER PROFILE
   =================================== */

function loadUserProfile() {
    const user = sessionStorage.getItem('fixitUser');
    if (user) {
        try {
            const userData = JSON.parse(user);
            
            // Update profile name and avatar
            if (userData.firstName && userData.lastName) {
                document.getElementById('profileName').textContent = 
                    userData.firstName + ' ' + userData.lastName;
                document.getElementById('profileAvatar').textContent = 
                    userData.firstName.charAt(0).toUpperCase();
            }
            
            // Update email
            if (userData.email) {
                document.getElementById('userEmail').textContent = userData.email;
            }
            
            // Update phone
            if (userData.phone) {
                document.getElementById('userPhone').textContent = userData.phone;
            }
            
            // Update location
            if (userData.city) {
                document.getElementById('userLocation').textContent = userData.city;
            }
            
            // Update age
            if (userData.age) {
                document.getElementById('userAge').textContent = userData.age + ' år';
            }
            
            // Set user type (Helper or Job Poster)
            if (userData.userType) {
                const typeIcon = userData.userType === 'helper' ? '🛠️' : '📋';
                const typeText = userData.userType === 'helper' ? 'Hjelper' : 'Jobbposter';
                document.getElementById('profileType').textContent = typeIcon + ' ' + typeText;
            }
            
            // Load user statistics if available
            if (userData.completedJobs) {
                document.getElementById('completedJobs').textContent = userData.completedJobs;
            }
            
            if (userData.successRate) {
                document.getElementById('successRate').textContent = userData.successRate + '%';
            }
            
            if (userData.memberSince) {
                document.getElementById('memberSince').textContent = userData.memberSince;
            }
            
        } catch (e) {
            console.log('Could not parse user data:', e);
        }
    } else {
        // If no user data, redirect to login
        console.log('No user data found, redirecting to login...');
        // Uncomment the line below if you want to force login
        // window.location.href = 'login.html';
    }
}

/* ===================================
   ACTION FUNCTIONS
   =================================== */

function editProfile() {
    // Navigate to edit profile page or show edit modal
    alert('Redigeringsfunksjon kommer snart!\n\nHer vil du kunne endre:\n- Profilbilde\n- Navn\n- Kontaktinformasjon\n- Ferdigheter\n- Om meg tekst');
    
    // When you have an edit page ready:
    // window.location.href = 'edit-profile.html';
}

function viewSettings() {
    // Navigate to settings page
    alert('Innstillinger kommer snart!\n\nHer vil du kunne endre:\n- Varslingsinnstillinger\n- Personvern\n- Kontoinnstillinger\n- Språk');
    
    // When you have a settings page ready:
    // window.location.href = 'settings.html';
}

function viewPaymentMethods() {
    // Navigate to payment methods page
    alert('Betalingsmetoder kommer snart!\n\nHer vil du kunne:\n- Legge til Vipps\n- Legge til bankkonto\n- Endre betalingsmetode\n- Se transaksjonshistorikk');
    
    // When you have a payment methods page ready:
    // window.location.href = 'payment-methods.html';
}

function logout() {
    // Confirm logout
    if (confirm('Er du sikker på at du vil logge ut?')) {
        // Clear session storage
        sessionStorage.clear();
        
        // Clear local storage if you're using it
        // localStorage.clear();
        
        // Show logout message
        alert('Du er nå logget ut. Ha en fin dag!');
        
        // Redirect to welcome/login page
        window.location.href = 'index.html';
    }
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

function updateProfileStats(completedJobs, successRate, memberSince) {
    // Update profile statistics
    if (completedJobs !== undefined) {
        document.getElementById('completedJobs').textContent = completedJobs;
    }
    if (successRate !== undefined) {
        document.getElementById('successRate').textContent = successRate + '%';
    }
    if (memberSince !== undefined) {
        document.getElementById('memberSince').textContent = memberSince;
    }
}

function addSkill(skillName, skillLevel) {
    // Add a new skill to the skills section
    const skillsContainer = document.querySelector('.profile-section:nth-child(4)');
    
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
        <span class="skill-name">${skillName}</span>
        <span class="skill-level">${skillLevel}</span>
    `;
    
    skillsContainer.appendChild(skillItem);
}

function addBadge(badgeText) {
    // Add a new badge to the badges section
    const badgeContainer = document.querySelector('.badge-container');
    
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = badgeText;
    
    badgeContainer.appendChild(badge);
}

/* ===================================
   INITIALIZATION
   =================================== */

function initProfilePage() {
    // Load user profile data
    loadUserProfile();
    
    // You can add more initialization code here
    console.log('Profile page initialized');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initProfilePage);