/**
 * FitMetrics Core Application Controller
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // UI DOM Element Selection Map
    const elements = {
        form: document.getElementById('workout-form'),
        nameInput: document.getElementById('exercise-name'),
        setsInput: document.getElementById('sets'),
        repsInput: document.getElementById('reps'),
        grid: document.getElementById('workout-grid'),
        emptyState: document.getElementById('empty-state'),
        clearBtn: document.getElementById('clear-all')
    };

    // State Layer: Synchronize memory arrays safely against LocalStorage
    let state = {
        routines: JSON.parse(localStorage.getItem('fitmetrics_data')) || []
    };

    const persistState = () => {
        localStorage.setItem('fitmetrics_data', JSON.stringify(state.routines));
    };

    /**
     * View Layer: Synchronizes interface structure to reflect data states
     */
    const renderUI = () => {
        // Evaluate app tracking context to determine active display viewport state
        if (state.routines.length === 0) {
            elements.emptyState.classList.remove('hidden');
            elements.grid.classList.add('hidden');
            return;
        }

        elements.emptyState.classList.add('hidden');
        elements.grid.classList.remove('hidden');
        
        // Purge old view records safely prior to building the updated node array
        elements.grid.innerHTML = '';

        state.routines.forEach((workout, index) => {
            const card = document.createElement('article');
            card.className = 'workout-card';
            card.innerHTML = `
                <div class="meta">
                    <h4 class="title">${escapeHTML(workout.name)}</h4>
                    <div class="metrics-pill">
                        <span>${workout.sets} Sets</span> &times; <span>${workout.reps} Reps</span>
                    </div>
                </div>
                <button class="btn-card-delete" data-index="${index}">Remove</button>
            `;
            elements.grid.appendChild(card);
        });
    };

    /**
     * Security Helper: Prevents HTML Injection attacks by sanitizing user input strings
     */
    const escapeHTML = (string) => {
        const div = document.createElement('div');
        div.innerText = string;
        return div.innerHTML;
    };

    /**
     * Event Interaction Handlers
     */
    elements.form.addEventListener('submit', (event) => {
        event.preventDefault();

        const model = {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            name: elements.nameInput.value.trim(),
            sets: parseInt(elements.setsInput.value, 10),
            reps: parseInt(elements.repsInput.value, 10)
        };

        state.routines.push(model);
        persistState();
        renderUI();
        elements.form.reset();
        elements.nameInput.focus();
    });

    // Event Delegation handling for efficient performance on element deletions
    elements.grid.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-card-delete')) {
            const lookupIndex = event.target.getAttribute('data-index');
            state.routines.splice(lookupIndex, 1);
            persistState();
            renderUI();
        }
    });

    elements.clearBtn.addEventListener('click', () => {
        if (confirm('Confirm permanent deletion of all stored tracking metrics?')) {
            state.routines = [];
            persistState();
            renderUI();
        }
    });

    // Initialize layout display tracking systems on app launch
    renderUI();
});