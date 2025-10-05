/* ===================================
   FIXIT INDEX PAGE - JAVASCRIPT
   =================================== */

/* ===================================
   REGISTER MODAL FUNCTIONS
   =================================== */

function showRegisterOptions() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/* ===================================
   CLOSE MODAL ON OUTSIDE CLICK
   =================================== */

window.onclick = function(event) {
    const modal = document.getElementById('registerModal');
    if (modal && event.target === modal) {
        modal.classList.remove('active');
    }
}

/* ===================================
   INITIALIZATION
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Index page loaded');
});