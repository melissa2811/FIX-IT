/* ===================================
   FIXIT HOME PAGE - JAVASCRIPT
   =================================== */

// Job database
const jobs = [
    {
        id: 1,
        title: 'Barnepass i helgen',
        category: 'Barnepass',
        location: 'Halden',
        price: '300',
        duration: '3-4 timer',
        date: 'Lørdag 6. jan',
        description: 'Trenger noen til å passe 2 barn (5 og 8 år) lørdag ettermiddag mens vi er på bursdagsselskap.',
        poster: 'Lisa Berg'
    },
    {
        id: 2,
        title: 'Lufting av hund 2 ganger daglig',
        category: 'Dyrepass',
        location: 'Fredrikstad',
        price: '200',
        duration: '30 minutter',
        date: 'Hver dag',
        description: 'Søker noen som kan lufte golden retriever morgen og kveld. Veldig snill hund!',
        poster: 'Tom Hansen'
    },
    {
        id: 3,
        title: 'Snørydding av innkjørsel',
        category: 'Snørydding',
        location: 'Sarpsborg',
        price: '250',
        duration: '1 time',
        date: 'I dag',
        description: 'Trenger hjelp til å måke snø fra innkjørsel og fortau. Spade er tilgjengelig.',
        poster: 'Anne Johansen'
    },
    {
        id: 4,
        title: 'Hjelp med hagearbeid',
        category: 'Hage',
        location: 'Halden',
        price: '400',
        duration: '2-3 timer',
        date: 'I dag',
        description: 'Trenger hjelp til å rake løv og rydde i hagen. Verktøy er tilgjengelig.',
        poster: 'Anne Johansen'
    },
    {
        id: 5,
        title: 'Kutte greiner på tre',
        category: 'Trearbeid',
        location: 'Fredrikstad',
        price: '500',
        duration: '2-3 timer',
        date: 'I morgen',
        description: 'Har et tre i hagen som trenger beskjæring. Sag er tilgjengelig.',
        poster: 'Kari Hansen'
    },
    {
        id: 6,
        title: 'Rengjøring av leilighet',
        category: 'Rengjøring',
        location: 'Fredrikstad',
        price: '500',
        duration: '3 timer',
        date: 'I morgen',
        description: 'Trenger grundig rengjøring av 2-roms leilighet. Alt utstyr er tilgjengelig.',
        poster: 'Kari Hansen'
    },
    {
        id: 7,
        title: 'Hjelp til flytting',
        category: 'Flytting',
        location: 'Halden',
        price: '600',
        duration: '2 timer',
        date: 'Lørdag',
        description: 'Trenger hjelp til å flytte møbler fra 2. etasje til 1. etasje.',
        poster: 'Per Olsen'
    },
    {
        id: 8,
        title: 'Handle mat',
        category: 'Handling',
        location: 'Sarpsborg',
        price: '250',
        duration: '1 time',
        date: 'I dag',
        description: 'Kan noen handle mat for meg? Har liste klar. Lett jobb!',
        poster: 'Liv Andersen'
    },
    {
        id: 9,
        title: 'Male soverom',
        category: 'Maling',
        location: 'Halden',
        price: '800',
        duration: 'Hel dag',
        date: 'Neste uke',
        description: 'Trenger hjelp til å male et soverom. All maling og utstyr er kjøpt.',
        poster: 'Erik Nilsen'
    },
    {
        id: 10,
        title: 'Katt-passing i ferien',
        category: 'Dyrepass',
        location: 'Sarpsborg',
        price: '300',
        duration: '1 uke',
        date: '15. jan',
        description: 'Trenger noen som kan passe katten min mens jeg er bortreist i en uke.',
        poster: 'Maria Olsen'
    }
];

// Current filter state
let currentFilter = {
    location: 'all',
    category: 'all'
};

/* ===================================
   FILTER FUNCTIONS
   =================================== */

function filterByLocation(location) {
    currentFilter.location = location;
    
    // Update button states
    document.querySelectorAll('.location-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayJobs();
}

function filterByCategory() {
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        currentFilter.category = categorySelect.value;
        displayJobs();
    }
}

/* ===================================
   DISPLAY FUNCTIONS
   =================================== */

function displayJobs() {
    let filteredJobs = jobs;
    
    // Apply location filter
    if (currentFilter.location !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.location === currentFilter.location);
    }
    
    // Apply category filter
    if (currentFilter.category !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.category === currentFilter.category);
    }
    
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;
    
    // Display message if no jobs found
    if (filteredJobs.length === 0) {
        jobsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #5D6E75;">
                <p style="font-size: 1.2em; margin-bottom: 10px;">Ingen jobber funnet</p>
                <p>Prøv å endre filtrene dine</p>
            </div>
        `;
        return;
    }
    
    // Display job cards
    jobsList.innerHTML = filteredJobs.map(job => `
        <div class="job-card" onclick="viewJobDetail(${job.id})">
            <div class="job-title">${job.title}</div>
            <div class="job-category">${job.category}</div>
            <div class="job-details">🕒 ${job.duration} • 📅 ${job.date}</div>
            <div class="job-price">${job.price} kr</div>
            <div class="job-location">📍 ${job.location}</div>
        </div>
    `).join('');
}

function viewJobDetail(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        // Store selected job in sessionStorage
        sessionStorage.setItem('selectedJob', JSON.stringify(job));
        
        // Navigate to payment page (or create a job detail page)
        // For now, just show an alert
        alert(`Jobb valgt: ${job.title}\n\nPris: ${job.price} kr\nSted: ${job.location}\n\nBeskrivelse: ${job.description}`);
        
        // Uncomment this line when you have a payment page ready:
        // window.location.href = 'payment.html';
    }
}

/* ===================================
   INITIALIZATION
   =================================== */

function initHomePage() {
    // Check if user is logged in (optional)
    const user = sessionStorage.getItem('fixitUser');
    if (user) {
        try {
            const userData = JSON.parse(user);
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = userData.firstName || userData.name || 'Bruker';
            }
        } catch (e) {
            console.log('Could not parse user data');
        }
    }
    
    // Load and display jobs
    displayJobs();
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initHomePage);