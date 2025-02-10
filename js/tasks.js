// Sample tasks data for demonstration
const sampleTasks = [
    {
        id: 1,
        name: "Solve Today's Wordle",
        description: "Navigate to the Wordle website and solve today's puzzle using the available hints and game rules.",
        difficulty: "easy",
        type: "browsing",
        successRate: 85
    },
    {
        id: 2,
        name: "Download Spotify",
        description: "Download and install the Spotify desktop application for the current operating system.",
        difficulty: "easy",
        type: "system",
        successRate: 92
    },
    {
        id: 3,
        name: "Create a Simple Web Page",
        description: "Create a basic HTML page with a header, paragraph, and an image using a text editor.",
        difficulty: "medium",
        type: "coding",
        successRate: 78
    },
    {
        id: 4,
        name: "Book a Flight Ticket",
        description: "Search and find the cheapest flight ticket between two specified cities for given dates.",
        difficulty: "medium",
        type: "ui",
        successRate: 65
    }
];

let currentPage = 1;
const tasksPerPage = 8;
let filteredTasks = [...sampleTasks];

// Initialize the tasks grid
function initializeTasksGrid() {
    const tasksGrid = document.querySelector('.tasks-grid');
    const startIdx = (currentPage - 1) * tasksPerPage;
    const endIdx = startIdx + tasksPerPage;
    const tasksToShow = filteredTasks.slice(startIdx, endIdx);
    
    tasksGrid.innerHTML = '';
    
    tasksToShow.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <h3>${task.name}</h3>
            <div class="task-meta">
                <span class="task-tag difficulty">${task.difficulty}</span>
                <span class="task-tag type">${task.type}</span>
            </div>
            <p class="task-description">${task.description}</p>
            <div class="task-stats">
                <span>Success Rate: ${task.successRate}%</span>
            </div>
            <a href="#" class="view-details" data-task-id="${task.id}">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </a>
        `;
        tasksGrid.appendChild(taskCard);
    });

    updatePagination();
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Filter tasks based on user selection
function filterTasks() {
    const difficulty = document.getElementById('task-difficulty-filter').value;
    const type = document.getElementById('task-type-filter').value;
    const searchQuery = document.getElementById('task-search').value.toLowerCase();

    filteredTasks = sampleTasks.filter(task => {
        const matchesDifficulty = difficulty === 'all' || task.difficulty === difficulty;
        const matchesType = type === 'all' || task.type === type;
        const matchesSearch = task.name.toLowerCase().includes(searchQuery) ||
                            task.description.toLowerCase().includes(searchQuery);

        return matchesDifficulty && matchesType && matchesSearch;
    });

    currentPage = 1;
    initializeTasksGrid();
}

// Initialize event listeners
function initializeEventListeners() {
    // Filter change events
    document.getElementById('task-difficulty-filter').addEventListener('change', filterTasks);
    document.getElementById('task-type-filter').addEventListener('change', filterTasks);
    document.getElementById('task-search').addEventListener('input', filterTasks);

    // Pagination events
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            initializeTasksGrid();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            initializeTasksGrid();
        }
    });

    // Task detail view events
    document.querySelector('.tasks-grid').addEventListener('click', (e) => {
        const detailsLink = e.target.closest('.view-details');
        if (detailsLink) {
            e.preventDefault();
            const taskId = detailsLink.dataset.taskId;
            showTaskDetails(taskId);
        }
    });
}

// Show task details (to be implemented)
function showTaskDetails(taskId) {
    // This would typically open a modal or navigate to a detail page
    console.log(`Showing details for task ${taskId}`);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTasksGrid();
    initializeEventListeners();
}); 