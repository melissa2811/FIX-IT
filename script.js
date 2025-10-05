/* ===================================
   FIXIT APP - UNIVERSAL JAVASCRIPT
   Shared functions used across all pages
   =================================== */

/* ===================================
   UNIVERSAL NAVIGATION FUNCTIONS
   =================================== */

function showProfileMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeProfileMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function logout() {
    if (confirm('Er du sikker på at du vil logge ut?')) {
        sessionStorage.clear();
        localStorage.clear();
        alert('Du er nå logget ut!');
        window.location.href = 'index.html';
    }
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

function showLoadingMessage(text) {
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loadingMessage';
    loadingMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        text-align: center;
        color: #2F3456;
        font-weight: 600;
    `;
    loadingMessage.innerHTML = text;
    document.body.appendChild(loadingMessage);
}

function showSuccessMessage(icon, title, message) {
    const successMessage = document.createElement('div');
    successMessage.id = 'successMessage';
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        text-align: center;
        color: #2F3456;
    `;
    successMessage.innerHTML = `
        <div style="font-size: 3em; margin-bottom: 15px;">${icon}</div>
        <h2 style="color: #8BA794; margin-bottom: 10px;">${title}</h2>
        <p>${message}</p>
    `;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        const msg = document.getElementById('successMessage');
        if (msg) document.body.removeChild(msg);
    }, 1500);
}

/* ===================================
   CLOSE MENU ON OUTSIDE CLICK
   =================================== */

document.addEventListener('click', function(event) {
    const menu = document.getElementById('profileMenu');
    if (menu && event.target.classList.contains('profile-menu-overlay')) {
        closeProfileMenu();
    }
});