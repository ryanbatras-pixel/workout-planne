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