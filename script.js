/* ===================================
   FIXIT APP - COMPLETE JAVASCRIPT
   All functionality in one file
   =================================== */

// ===================================
// GLOBAL VARIABLES AND DATA
// ===================================

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

// Chat data
const chats = [
    {
        id: 0,
        name: 'Anne Johansen',
        initial: 'A',
        messages: [
            { sender: 'them', text: 'Hei! Jeg så at du søkte på hagearbeid-jobben min.', time: '14:30' },
            { sender: 'me', text: 'Hei! Ja, jeg er veldig interessert. Jeg har erfaring med hagearbeid.', time: '14:32' },
            { sender: 'them', text: 'Flott! Kan du komme i morgen kl. 14:00?', time: '14:35' },
            { sender: 'me', text: 'Ja, det passer perfekt! 👍', time: '14:36' },
            { sender: 'them', text: 'Er du fortsatt interessert?', time: '15:10' }
        ]
    },
    {
        id: 1,
        name: 'Kari Hansen',
        initial: 'K',
        messages: [
            { sender: 'them', text: 'Hei! Takk for hjelpen med rengjøringen!', time: '12:00' },
            { sender: 'me', text: 'Bare hyggelig! Det var en fin jobb.', time: '12:05' },
            { sender: 'them', text: 'Jeg har gitt deg 5 stjerner 😊', time: '12:10' },
            { sender: 'me', text: 'Tusen takk! 🌟', time: '12:15' }
        ]
    },
    {
        id: 2,
        name: 'Per Olsen',
        initial: 'P',
        messages: [
            { sender: 'them', text: 'Hei! Jeg har en flyttejobb. Når kan du starte?', time: 'I går' },
            { sender: 'me', text: 'Hei! Jeg kan i helgen.', time: 'I går' }
        ]
    }
];

let currentFilter = {
    location: 'all',
    category: 'all'
};

let currentChatIndex = null;
let currentPaymentMethod = 'vipps';
let selectedRatings = [0, 0];

// ===================================
// INDEX PAGE (Welcome) FUNCTIONS
// ===================================

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

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('registerModal');
    if (modal && event.target === modal) {
        modal.classList.remove('active');
    }
}

// ===================================
// REGISTRATION PAGE FUNCTIONS
// ===================================

function initRegisterPage() {
    // Check user type from URL
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('type') || 'helper';
    
    const registerTypeElement = document.getElementById('registerType');
    if (registerTypeElement) {
        registerTypeElement.textContent = 
            userType === 'helper' ? 'Registrer deg som hjelper' : 'Registrer deg som jobbposter';
    }
    
    // Age input listener for parent consent
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.addEventListener('input', function() {
            const age = parseInt(this.value);
            const parentConsent = document.getElementById('parentConsent');
            
            if (parentConsent) {
                if (age < 18 && age > 0) {
                    parentConsent.style.display = 'block';
                } else {
                    parentConsent.style.display = 'none';
                }
            }
        });
    }
    
    // Payment method toggle
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const vippsInfo = document.getElementById('vippsInfo');
            const bankInfo = document.getElementById('bankInfo');
            
            if (this.value === 'vipps') {
                if (vippsInfo) vippsInfo.style.display = 'block';
                if (bankInfo) bankInfo.style.display = 'none';
            } else {
                if (vippsInfo) vippsInfo.style.display = 'none';
                if (bankInfo) bankInfo.style.display = 'block';
            }
        });
    });
    
    // Form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const age = parseInt(document.getElementById('age').value);
            
            // Validate parent consent for under 18
            if (age < 18) {
                const parentApproval = document.getElementById('parentApproval');
                if (parentApproval && !parentApproval.checked) {
                    alert('Du må ha foreldresamtykke for å registrere deg under 18 år.');
                    return;
                }
            }
            
            // Show loading message
            showLoadingMessage('🔐 Bekrefter med BankID...');
            
            // Collect form data
            const userData = {
                userType: userType,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                age: age,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                street: document.getElementById('street').value,
                postalCode: document.getElementById('postalCode').value,
                city: document.getElementById('city').value,
                paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
                registeredAt: new Date().toISOString()
            };
            
            // Save to session storage
            sessionStorage.setItem('fixitUser', JSON.stringify(userData));
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        });
    }
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('profilePreview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Profile">`;
            }
        }
        reader.readAsDataURL(file);
    }
}

// ===================================
// LOGIN PAGE FUNCTIONS
// ===================================

function loginWithBankID() {
    const personnummer = document.getElementById('personnummer').value;
    
    // Validate personnummer (11 digits)
    if (personnummer.length !== 11) {
        alert('Vennligst skriv inn et gyldig personnummer (11 siffer)');
        return;
    }
    
    if (!/^\d{11}$/.test(personnummer)) {
        alert('Personnummer må kun inneholde tall');
        return;
    }
    
    // Show loading message
    showLoadingMessage('🔐 Logger inn med BankID...');
    
    // Store user data
    const userData = {
        personnummer: personnummer,
        name: 'Jonas',
        firstName: 'Jonas',
        loginTime: new Date().toISOString()
    };
    
    sessionStorage.setItem('fixitUser', JSON.stringify(userData));
    
    // Redirect after 1.5 seconds
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1500);
}

function initLoginPage() {
    // Auto-format personnummer input
    const personnummerInput = document.getElementById('personnummer');
    if (personnummerInput) {
        personnummerInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '').slice(0, 11);
        });
    }
}

// ===================================
// HOME PAGE FUNCTIONS
// ===================================

function initHomePage() {
    // Check if user is logged in
    const user = sessionStorage.getItem('fixitUser');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(user);
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userData.firstName || userData.name || 'Bruker';
    }
    
    // Load jobs
    displayJobs();
}

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
    
    if (filteredJobs.length === 0) {
        jobsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #5D6E75;">
                <p style="font-size: 1.2em; margin-bottom: 10px;">Ingen jobber funnet</p>
                <p>Prøv å endre filtrene dine</p>
            </div>
        `;
        return;
    }
    
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
        sessionStorage.setItem('selectedJob', JSON.stringify(job));
        window.location.href = 'payment.html';
    }
}

// ===================================
// POST JOB PAGE FUNCTIONS
// ===================================

function initPostJobPage() {
    // Set minimum date to today
    const dateInput = document.getElementById('jobDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Form submission
    const postJobForm = document.getElementById('postJobForm');
    if (postJobForm) {
        postJobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
            
            // Collect form data
            const jobData = {
                category: document.getElementById('jobCategory').value,
                title: document.getElementById('jobTitle').value,
                description: document.getElementById('jobDescription').value,
                location: document.getElementById('jobLocation').value,
                address: document.getElementById('jobAddress').value,
                date: document.getElementById('jobDate').value,
                time: document.getElementById('jobTime').value,
                duration: document.getElementById('jobDuration').value,
                paymentType: paymentType,
                price: paymentType === 'fixed' ? document.getElementById('jobPrice').value : 'Til forhandling',
                requireVerified: document.getElementById('requireVerified').checked,
                requireExperience: document.getElementById('requireExperience').checked,
                requireReferences: document.getElementById('requireReferences').checked,
                postedAt: new Date().toISOString(),
                poster: JSON.parse(sessionStorage.getItem('fixitUser')).firstName || 'Bruker'
            };
            
            // Show success message
            showSuccessMessage('✅', 'Jobb publisert!', 'Din jobb er nå synlig for hjelpere i området');
            
            // Save job to storage
            let postedJobs = JSON.parse(sessionStorage.getItem('postedJobs') || '[]');
            postedJobs.push(jobData);
            sessionStorage.setItem('postedJobs', JSON.stringify(postedJobs));
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        });
    }
}

function togglePaymentInput() {
    const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
    const priceInput = document.getElementById('priceInput');
    
    if (priceInput) {
        if (paymentType === 'negotiable') {
            priceInput.style.display = 'none';
            document.getElementById('jobPrice').required = false;
        } else {
            priceInput.style.display = 'block';
            document.getElementById('jobPrice').required = true;
        }
    }
}

// ===================================
// COMMUNICATION PAGE FUNCTIONS
// ===================================

function openChat(chatIndex) {
    currentChatIndex = chatIndex;
    const chat = chats[chatIndex];
    
    // Hide chat list, show chat window
    const chatList = document.getElementById('chatList');
    const chatWindow = document.getElementById('chatWindow');
    
    if (chatList) chatList.style.display = 'none';
    if (chatWindow) chatWindow.style.display = 'block';
    
    // Update header
    const currentChatName = document.getElementById('currentChatName');
    if (currentChatName) currentChatName.textContent = chat.name;
    
    const chatAvatar = document.querySelector('.chat-header .chat-avatar');
    if (chatAvatar) chatAvatar.textContent = chat.initial;
    
    // Load messages
    loadMessages(chat.messages);
}

function closeChat() {
    const chatList = document.getElementById('chatList');
    const chatWindow = document.getElementById('chatWindow');
    
    if (chatList) chatList.style.display = 'block';
    if (chatWindow) chatWindow.style.display = 'none';
    
    currentChatIndex = null;
}

function loadMessages(messages) {
    const container = document.getElementById('messagesContainer');
    if (!container) return;
    
    container.innerHTML = messages.map(msg => {
        if (msg.sender === 'them') {
            return `
                <div class="message received">
                    <div class="message-avatar">${chats[currentChatIndex].initial}</div>
                    <div class="message-content">
                        <div class="message-text">${msg.text}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="message sent">
                    <div class="message-content">
                        <div class="message-text">${msg.text}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                </div>
            `;
        }
    }).join('');
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    if (!input) return;
    
    const text = input.value.trim();
    
    if (text === '' || currentChatIndex === null) return;
    
    // Add message to current chat
    const now = new Date();
    const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
    
    chats[currentChatIndex].messages.push({
        sender: 'me',
        text: text,
        time: time
    });
    
    // Reload messages
    loadMessages(chats[currentChatIndex].messages);
    
    // Clear input
    input.value = '';
    
    // Simulate reply after 2 seconds
    setTimeout(() => {
        const replies = [
            'Takk for meldingen!',
            'Det høres bra ut!',
            'Perfekt!',
            'Flott! Vi snakkes.',
            'Takk, det gleder jeg meg til!'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        chats[currentChatIndex].messages.push({
            sender: 'them',
            text: randomReply,
            time: new Date().getHours() + ':' + String(new Date().getMinutes()).padStart(2, '0')
        });
        
        loadMessages(chats[currentChatIndex].messages);
    }, 2000);
}

function initCommunicationPage() {
    const input = document.getElementById('messageInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// ===================================
// RATING PAGE FUNCTIONS
// ===================================

function setRating(starElement, jobIndex) {
    const rating = parseInt(starElement.getAttribute('data-rating'));
    selectedRatings[jobIndex] = rating;
    
    // Get parent star rating container
    const container = starElement.parentElement;
    const stars = container.querySelectorAll('.star');
    
    // Update star display
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.textContent = '★';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
    });
}

function submitRating(jobIndex) {
    const rating = selectedRatings[jobIndex];
    
    if (rating === 0) {
        alert('Vennligst velg en vurdering (1-5 stjerner)');
        return;
    }
    
    // Show success message
    showSuccessMessage('⭐', 'Vurdering sendt!', 'Takk for din tilbakemelding');
    
    // Remove the rated job from list after 1.5 seconds
    setTimeout(() => {
        // Find and remove the job-to-rate element
        const jobElements = document.querySelectorAll('.job-to-rate');
        if (jobElements[jobIndex]) {
            jobElements[jobIndex].style.transition = 'all 0.3s';
            jobElements[jobIndex].style.opacity = '0';
            jobElements[jobIndex].style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                jobElements[jobIndex].remove();
                
                // Check if there are no more jobs to rate
                const remainingJobs = document.querySelectorAll('.job-to-rate');
                if (remainingJobs.length === 0) {
                    const section = document.querySelector('.rating-section');
                    if (section) {
                        section.innerHTML = `
                            <h3>Fullførte jobber å vurdere</h3>
                            <div style="text-align: center; padding: 40px; color: #5D6E75; background: white; border-radius: 15px;">
                                <p style="font-size: 1.2em; margin-bottom: 10px;">Alle jobber er vurdert! ✅</p>
                                <p>Du vil få nye jobber å vurdere etter hvert som du fullfører dem.</p>
                            </div>
                        `;
                    }
                }
            }, 300);
        }
    }, 1500);
}

// ===================================
// PAYMENT PAGE FUNCTIONS
// ===================================

function initPaymentPage() {
    const jobData = sessionStorage.getItem('selectedJob');
    
    if (!jobData) {
        window.location.href = 'home.html';
        return;
    }
    
    const job = JSON.parse(jobData);
    
    // Populate payment summary
    const paymentJob = document.getElementById('paymentJob');
    const paymentDate = document.getElementById('paymentDate');
    const paymentDuration = document.getElementById('paymentDuration');
    const paymentAmount = document.getElementById('paymentAmount');
    
    if (paymentJob) paymentJob.textContent = job.title;
    if (paymentDate) paymentDate.textContent = job.date;
    if (paymentDuration) paymentDuration.textContent = job.duration;
    if (paymentAmount) paymentAmount.textContent = job.price + ' kr';
    
    // Auto-format inputs
    const vippsInput = document.getElementById('vippsNumber');
    if (vippsInput) {
        vippsInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\s/g, '').replace(/\D/g, '');
            if (value.length > 3 && value.length <= 5) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length > 5) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5, 8);
            }
            this.value = value;
        });
    }
    
    const accountInput = document.getElementById('accountNumber');
    if (accountInput) {
        accountInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\s/g, '').replace(/\D/g, '');
            if (value.length > 4 && value.length <= 6) {
                value = value.slice(0, 4) + ' ' + value.slice(4);
            } else if (value.length > 6) {
                value = value.slice(0, 4) + ' ' + value.slice(4, 6) + ' ' + value.slice(6, 11);
            }
            this.value = value;
        });
    }
}

function selectPayment(method) {
    currentPaymentMethod = method;
    
    // Update UI
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    const vippsPayment = document.getElementById('vippsPayment');
    const bankPayment = document.getElementById('bankPayment');
    
    if (method === 'vipps') {
        document.getElementById('vippsOption').classList.add('selected');
        if (vippsPayment) vippsPayment.style.display = 'block';
        if (bankPayment) bankPayment.style.display = 'none';
    } else if (method === 'bank') {
        document.getElementById('bankOption').classList.add('selected');
        if (vippsPayment) vippsPayment.style.display = 'none';
        if (bankPayment) bankPayment.style.display = 'block';
    }
}

function confirmPayment() {
    // Validate payment details
    if (currentPaymentMethod === 'vipps') {
        const vippsNumber = document.getElementById('vippsNumber').value;
        
        if (!vippsNumber || vippsNumber.replace(/\s/g, '').length < 8) {
            alert('Vennligst skriv inn et gyldig Vipps-nummer');
            return;
        }
    } else if (currentPaymentMethod === 'bank') {
        const accountNumber = document.getElementById('accountNumber').value;
        const bankName = document.getElementById('bankName').value;
        
        if (!accountNumber || accountNumber.replace(/\s/g, '').length < 11) {
            alert('Vennligst skriv inn et gyldig kontonummer');
            return;
        }
        
        if (!bankName) {
            alert('Vennligst skriv inn bankens navn');
            return;
        }
    }
    
    // Show loading message
    const loadingText = currentPaymentMethod === 'vipps' ? 
        '📱 Behandler Vipps-betaling...' : 
        '🏦 Behandler bankoverføring...';
    
    showLoadingMessage(loadingText);
    
    // Simulate payment processing
    setTimeout(() => {
        // Show success screen
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #8BA794 0%, #BAC6B8 100%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #2F3456;
        `;
        successDiv.innerHTML = `
            <div style="font-size: 5em; margin-bottom: 20px;">✅</div>
            <h2 style="font-size: 2em; font-weight: 700; margin-bottom: 15px;">Søknad sendt!</h2>
            <p style="font-size: 1.1em; margin-bottom: 30px;">Du får beskjed når jobbutgiveren svarer</p>
            <button onclick="location.href='home.html'" style="padding: 15px 40px; background: #2F3456; color: #E9E4DC; border: none; border-radius: 30px; font-size: 1.1em; font-weight: 600; cursor: pointer;">
                Tilbake til hjemmet;
         
    
           ;
           
           </button>
        `;
        document.body.appendChild(successDiv);
        
        // Store application data
        const jobData = JSON.parse(sessionStorage.getItem('selectedJob'));
        const applicationData = {
            job: jobData,
            paymentMethod: currentPaymentMethod,
            appliedAt: new Date().toISOString(),
            status: 'pending'
        };
        
        let applications = JSON.parse(sessionStorage.getItem('myApplications') || '[]');
        applications.push(applicationData);
        sessionStorage.setItem('myApplications', JSON.stringify(applications));
    }, 1500);
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

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
    
    // Remove after showing
    setTimeout(() => {
        const msg = document.getElementById('successMessage');
        if (msg) document.body.removeChild(msg);
    }, 1500);
}

// ===================================
// PAGE INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Initialize based on current page
    switch(currentPage) {
        case 'index.html':
        case '':
            // Welcome page - no special init needed
            break;
            
        case 'register.html':
            initRegisterPage();
            break;
            
        case 'login.html':
            initLoginPage();
            break;
            
        case 'home.html':
            initHomePage();
            break;
            
        case 'post-job.html':
            initPostJobPage();
            break;
            
        case 'communication.html':
            initCommunicationPage();
            break;
            
        case 'payment.html':
            initPaymentPage();
            break;
            
        case 'rating.html':
            // Rating page - no special init needed
            break;
    }
});