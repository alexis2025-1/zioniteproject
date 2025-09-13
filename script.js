// Hamburger menu toggle for mobile nav
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
    menuToggle.onclick = function() {
        mainNav.classList.toggle('show');
    };
    // Optional: Hide menu when clicking outside
    window.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.classList.remove('show');
        }
    });
}
// Modal functionality
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginBtn.onclick = function() {
    loginModal.style.display = 'block';
}
closeModal.onclick = function() {
    loginModal.style.display = 'none';
    loginMessage.textContent = '';
}
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
        loginMessage.textContent = '';
    }
}

// Fetch and display events
async function loadEvents() {
    const res = await fetch('/api/events');
    const events = await res.json();
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    events.forEach(ev => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${ev.title}</strong> (${ev.date})<br>${ev.desc}`;
        eventsList.appendChild(li);
    });
}
loadEvents();

// Event upload (admin/founder only)
const eventForm = document.getElementById('eventForm');
const eventMessage = document.getElementById('eventMessage');
if (eventForm) {
    eventForm.onsubmit = async function(e) {
        e.preventDefault();
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const desc = document.getElementById('eventDesc').value;
        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, date, desc })
            });
            const data = await res.json();
            if (data.success) {
                eventMessage.textContent = 'Event added!';
                eventMessage.style.color = 'green';
                eventForm.reset();
                loadEvents();
            } else {
                eventMessage.textContent = data.message || 'Failed to add event.';
                eventMessage.style.color = 'red';
            }
        } catch (err) {
            eventMessage.textContent = 'Server error.';
            eventMessage.style.color = 'red';
        }
    }
}

// Fetch and display gallery
async function loadGallery() {
    const res = await fetch('/api/gallery');
    const gallery = await res.json();
    const galleryItems = document.getElementById('galleryItems');
    galleryItems.innerHTML = '';
    gallery.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        if (item.type === 'image') {
            div.innerHTML = `<img src="${item.url}" alt="${item.caption}"><br><span>${item.caption}</span>`;
        } else if (item.type === 'video') {
            div.innerHTML = `<video src="${item.url}" controls></video><br><span>${item.caption}</span>`;
        }
        galleryItems.appendChild(div);
    });
}
loadGallery();

// Gallery upload (admin/founder only)
const galleryForm = document.getElementById('galleryForm');
const galleryMessage = document.getElementById('galleryMessage');
if (galleryForm) {
    galleryForm.onsubmit = async function(e) {
        e.preventDefault();
        const formData = new FormData(galleryForm);
        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                galleryMessage.textContent = 'Upload successful!';
                galleryMessage.style.color = 'green';
                galleryForm.reset();
                loadGallery();
            } else {
                galleryMessage.textContent = data.message || 'Upload failed.';
                galleryMessage.style.color = 'red';
            }
        } catch (err) {
            galleryMessage.textContent = 'Server error.';
            galleryMessage.style.color = 'red';
        }
    }
}

// Founder display and upload
async function loadFounder() {
    const res = await fetch('/api/founder');
    const founder = await res.json();
    const founderDisplay = document.getElementById('founderDisplay');
    founderDisplay.innerHTML = founder.url ? `<img src="${founder.url}" alt="${founder.name}"><br><strong>${founder.name}</strong>` : '<em>No founder uploaded yet.</em>';
}
loadFounder();
const founderForm = document.getElementById('founderForm');
const founderMessage = document.getElementById('founderMessage');
if (founderForm) {
    founderForm.onsubmit = async function(e) {
        e.preventDefault();
        const formData = new FormData(founderForm);
        try {
            const res = await fetch('/api/founder', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                founderMessage.textContent = 'Founder uploaded!';
                founderMessage.style.color = 'green';
                founderForm.reset();
                loadFounder();
            } else {
                founderMessage.textContent = data.message || 'Upload failed.';
                founderMessage.style.color = 'red';
            }
        } catch (err) {
            founderMessage.textContent = 'Server error.';
            founderMessage.style.color = 'red';
        }
    }
}

// Pastor display and upload
async function loadPastor() {
    const res = await fetch('/api/pastor');
    const pastor = await res.json();
    const pastorDisplay = document.getElementById('pastorDisplay');
    pastorDisplay.innerHTML = pastor.url ? `<img src="${pastor.url}" alt="${pastor.name}"><br><strong>${pastor.name}</strong>` : '<em>No pastor uploaded yet.</em>';
}
loadPastor();
const pastorForm = document.getElementById('pastorForm');
const pastorMessage = document.getElementById('pastorMessage');
if (pastorForm) {
    pastorForm.onsubmit = async function(e) {
        e.preventDefault();
        const formData = new FormData(pastorForm);
        try {
            const res = await fetch('/api/pastor', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                pastorMessage.textContent = 'Pastor uploaded!';
                pastorMessage.style.color = 'green';
                pastorForm.reset();
                loadPastor();
            } else {
                pastorMessage.textContent = data.message || 'Upload failed.';
                pastorMessage.style.color = 'red';
            }
        } catch (err) {
            pastorMessage.textContent = 'Server error.';
            pastorMessage.style.color = 'red';
        }
    }
}

loginForm.onsubmit = async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Send login request to server
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.success) {
            loginMessage.style.color = 'green';
            loginMessage.textContent = 'Login successful!';
            setTimeout(() => {
                loginModal.style.display = 'none';
                loginMessage.textContent = '';
                // Show admin dashboard
                const adminDashboard = document.getElementById('adminDashboard');
                if (adminDashboard) {
                    adminDashboard.style.display = 'block';
                }
            }, 1000);
        } else {
            loginMessage.style.color = 'red';
            loginMessage.textContent = data.message || 'Login failed.';
        }
    } catch (err) {
        loginMessage.style.color = 'red';
        loginMessage.textContent = 'Server error.';
    }
}
