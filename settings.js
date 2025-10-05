/* ===================================
   FIXIT SETTINGS PAGE - JAVASCRIPT
   =================================== */

/* ===================================
   LOAD USER SETTINGS
   =================================== */

function loadUserSettings() {
    const user = sessionStorage.getItem('fixitUser');
    if (user) {
        try {
            const userData = JSON.parse(user);
            
            // Load personal information
            if (userData.firstName) {
                document.getElementById('firstName').value = userData.firstName;
                document.getElementById('profilePreview').textContent = userData.firstName.charAt(0).toUpperCase();
            }
            if (userData.lastName) {
                document.getElementById('lastName').value = userData.lastName;
            }
            if (userData.email) {
                document.getElementById('email').value = userData.email;
            }
            if (userData.phone) {
                document.getElementById('phone').value = userData.phone;
            }
            if (userData.city) {
                document.getElementById('city').value = userData.city;
            }
            if (userData.bio) {
                document.getElementById('bio').value = userData.bio;
            }
            
            // Load notification settings
            if (userData.settings) {
                if (userData.settings.notifyNewJobs !== undefined) {
                    document.getElementById('notifyNewJobs').checked = userData.settings.notifyNewJobs;
                }
                if (userData.settings.notifyMessages !== undefined) {
                    document.getElementById('notifyMessages').checked = userData.settings.notifyMessages;
                }
                if (userData.settings.notifyRatings !== undefined) {
                    document.getElementById('notifyRatings').checked = userData.settings.notifyRatings;
                }
                if (userData.settings.emailNotifications !== undefined) {
                    document.getElementById('emailNotifications').checked = userData.settings.emailNotifications;
                }
                
                // Load privacy settings
                if (userData.settings.showPhone !== undefined) {
                    document.getElementById('showPhone').checked = userData.settings.showPhone;
                }
                if (userData.settings.showEmail !== undefined) {
                    document.getElementById('showEmail').checked = userData.settings.showEmail;
                }
                if (userData.settings.publicProfile !== undefined) {
                    document.getElementById('publicProfile').checked = userData.settings.publicProfile;
                }
            }
        } catch (e) {
            console.log('Could not parse user data:', e);
        }
    }
}

/* ===================================
   PROFILE PICTURE
   =================================== */

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Bildet er for stort! Maksimal størrelse er 5MB.');
            return;
        }
        
        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Vennligst velg en bildefil (JPG, PNG, etc.)');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePreview').innerHTML = 
                `<img src="${e.target.result}" alt="Profile">`;
            
            // Save to sessionStorage
            const user = sessionStorage.getItem('fixitUser');
            let userData = user ? JSON.parse(user) : {};
            userData.profilePicture = e.target.result;
            sessionStorage.setItem('fixitUser', JSON.stringify(userData));
            
            showSuccessMessage();
        }
        reader.readAsDataURL(file);
    }
}

/* ===================================
   SAVE PERSONAL INFORMATION
   =================================== */

function savePersonalInfo() {
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const bio = document.getElementById('bio').value;
    
    // Validate required fields
    if (!firstName || !lastName) {
        alert('Vennligst fyll inn fornavn og etternavn');
        return;
    }
    
    if (!email) {
        alert('Vennligst fyll inn e-postadresse');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Vennligst skriv inn en gyldig e-postadresse');
        return;
    }
    
    // Get existing user data
    const user = sessionStorage.getItem('fixitUser');
    let userData = user ? JSON.parse(user) : {};
    
    // Update user data
    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.email = email;
    userData.phone = phone;
    userData.city = city;
    userData.bio = bio;
    
    // Save notification settings
    if (!userData.settings) {
        userData.settings = {};
    }
    userData.settings.notifyNewJobs = document.getElementById('notifyNewJobs').checked;
    userData.settings.notifyMessages = document.getElementById('notifyMessages').checked;
    userData.settings.notifyRatings = document.getElementById('notifyRatings').checked;
    userData.settings.emailNotifications = document.getElementById('emailNotifications').checked;
    
    // Save privacy settings
    userData.settings.showPhone = document.getElementById('showPhone').checked;
    userData.settings.showEmail = document.getElementById('showEmail').checked;
    userData.settings.publicProfile = document.getElementById('publicProfile').checked;
    
    // Save to sessionStorage
    sessionStorage.setItem('fixitUser', JSON.stringify(userData));
    
    // Show success message
    showSuccessMessage();
}

/* ===================================
   CHANGE PASSWORD
   =================================== */

function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate fields
    if (!newPassword || !confirmPassword) {
        alert('Vennligst fyll ut begge passordfeltene');
        return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert('Passordene matcher ikke');
        return;
    }
    
    // Check password length
    if (newPassword.length < 6) {
        alert('Passordet må være minst 6 tegn');
        return;
    }
    
    // Check password strength
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        if (confirm('Passordet er svakt. Det bør inneholde store og små bokstaver og tall. Vil du fortsette likevel?')) {
            // Continue
        } else {
            return;
        }
    }
    
    // Save new password (in a real app, this would be sent to a server)
    const user = sessionStorage.getItem('fixitUser');
    let userData = user ? JSON.parse(user) : {};
    userData.passwordLastChanged = new Date().toISOString();
    sessionStorage.setItem('fixitUser', JSON.stringify(userData));
    
    // Show success message
    alert('✓ Passord endret!\n\nDitt passord er nå oppdatert.');
    
    // Clear password fields
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

/* ===================================
   DELETE ACCOUNT
   =================================== */

function deleteAccount() {
    // First confirmation
    if (confirm('⚠️ Er du sikker på at du vil slette kontoen din?\n\nDenne handlingen kan ikke angres.')) {
        // Second confirmation
        if (confirm('❗ Siste bekreftelse:\n\nAll data vil bli permanent slettet:\n- Profil\n- Jobber\n- Meldinger\n- Vurderinger\n\nVil du fortsette?')) {
            // Clear all data
            sessionStorage.clear();
            localStorage.clear();
            
            // Show goodbye message
            alert('👋 Kontoen din er slettet.\n\nVi er lei oss for å se deg gå! Takk for at du brukte FixIt.');
            
            // Redirect to welcome page
            window.location.href = 'index.html';
        }
    }
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.style.display = 'block';
    
    // Scroll to top to show message
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Hide after 3 seconds
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

function autoSaveSettings() {
    // Auto-save notification and privacy settings when toggled
    const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            savePersonalInfo();
        });
    });
}

/* ===================================
   INITIALIZATION
   =================================== */

function initSettingsPage() {
    // Load user settings
    loadUserSettings();
    
    // Enable auto-save for toggles
    autoSaveSettings();
    
    console.log('Settings page initialized');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initSettingsPage);