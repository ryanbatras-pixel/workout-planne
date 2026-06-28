// 1. Select the elements
var navLinks = document.querySelectorAll('.nav-link');
var pages = document.querySelectorAll('.page');
var ctaButton = document.getElementById('cta-button');

// 2. Function to switch pages
function switchPage(targetId) {
    // Hide all pages
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
        pages[i].classList.add('hidden');
    }
    // Show target page
    document.getElementById('view-' + targetId).classList.add('active');
    document.getElementById('view-' + targetId).classList.remove('hidden');
}

// 3. Attach click events to nav buttons
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function() {
        var target = this.getAttribute('data-view');
        switchPage(target);
    });
}

// 4. Make the CTA button switch to generator
ctaButton.addEventListener('click', function() {
    switchPage('generator');
});
// Add this to scripts/app.js
var genForm = document.getElementById('gen-form');
var planDisplay = document.getElementById('plan-display');

genForm.addEventListener('submit', function(event) {
    // 1. Stop the page from refreshing
    event.preventDefault();

    // 2. Capture the inputs
    var userName = document.getElementById('name').value;
    var goal = document.getElementById('goal').value;
    var equipment = document.getElementById('equip').value;

    // 3. Simple logic to show we captured the data
    var planHTML = `
        <div class="card" style="margin-top: 20px;">
            <h3>Workout for ${userName || "User"}</h3>
            <p><strong>Goal:</strong> ${goal}</p>
            <p><strong>Equipment:</strong> ${equipment}</p>
            <p>Your 7-day routine will be generated here soon.</p>
        </div>
    `;

    // 4. Inject into the page
    planDisplay.innerHTML = planHTML;
});