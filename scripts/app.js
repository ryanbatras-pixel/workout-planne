import { renderGenerator } from './generator.js';

const app = document.getElementById('app-container');

const views = {
    home: `
        <div class="card">
            <h1>Ready to transform?</h1>
            <button onclick="window.location.hash='generator'">Start Now</button>
        </div>
    `,
    generator: `
        <div class="card" id="gen-view">
            <h2>Workout Generator</h2>
        </div>
    `
};

function router() {
    const hash = window.location.hash.replace('#', '') || 'home';
    app.innerHTML = views[hash];
    if (hash === 'generator') renderGenerator();
}

window.addEventListener('hashchange', router);
router(); // Initial load