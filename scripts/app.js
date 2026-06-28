// scripts/app.js
import { exercises } from './data.js';
import { renderLibrary } from './ui.js';

// 1. Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    renderLibrary(exercises);
    
    // Check if we have a saved plan
    const saved = getSavedPlan();
    if (saved) {
        // Display the saved plan automatically
        planDisplay.innerHTML = `<div class="card"><h3>Your Saved Plan</h3>...</div>`;
    }
});

// 2. Navigation Logic
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const ctaButton = document.getElementById('cta-button');

function switchPage(targetId) {
    pages.forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    const targetPage = document.getElementById('view-' + targetId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('active');
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        switchPage(e.target.getAttribute('data-view'));
    });
});

if (ctaButton) {
    ctaButton.addEventListener('click', () => switchPage('generator'));
}

// 3. Generator Form Logic
const genForm = document.getElementById('gen-form');
const planDisplay = document.getElementById('plan-display');

if (genForm) {
    // Inside your genForm event listener in scripts/app.js
genForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const equip = document.getElementById('equip').value;
    const intensity = document.getElementById('goal').value; // 'muscle', 'weight', 'fit'

    const filtered = exercises.filter(ex => 
        ex.equipment === equip || ex.equipment === "none"
    );

    // Logic: 'muscle' goal = higher sets, 'weight' goal = higher reps
    const displayHTML = filtered.map(ex => {
        let sets = ex.sets;
        let reps = ex.reps;
        
        if (intensity === 'muscle') sets += 1;
        if (intensity === 'weight') reps += 5;

        return `
            <div class="exercise-card">
                <strong>${ex.name}</strong> 
                <p>Target: ${sets} sets of ${reps} reps</p>
            </div>
        `;
    }).join('');

    planDisplay.innerHTML = `<div class="card"><h3>Your Custom Plan</h3>${displayHTML}</div>`;
});
}
// Add these functions to your app.js
function savePlan(planData) {
    localStorage.setItem('fitForge_plan', JSON.stringify(planData));
}

function getSavedPlan() {
    const saved = localStorage.getItem('fitForge_plan');
    return saved ? JSON.parse(saved) : null;
}

// Update your submit listener to call savePlan()
genForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // ... (rest of your existing logic) ...
    
    // After generating the plan, save it
    savePlan(filtered); 
});
// Add this to your event listeners in scripts/app.js
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
    // 1. Clear local storage
    localStorage.removeItem('fitForge_plan');
    
    // 2. Clear the UI
    planDisplay.innerHTML = '';
    
    // 3. Optional: Reset form fields
    genForm.reset();
});