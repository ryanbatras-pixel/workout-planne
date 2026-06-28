export function renderLibrary(exercises) {
    const libGrid = document.getElementById('lib-grid');
    libGrid.innerHTML = exercises.map(ex => `
        <div class="lib-card">
            <strong>${ex.name}</strong><br>
            <small>${ex.muscle}</small>
        </div>
    `).join('');
}