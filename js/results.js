// Sample data for results
const resultsData = [
    {
        model: 'DeepSeek v3',
        avgScore: '88%',
        avgTime: '1m 15s',
        avgCost: '$0.15',
        detailsLink: '#',
        totalTasks: 250
    },
    {
        model: 'Claude 3.5 Sonnet',
        avgScore: '85%',
        avgTime: '1m 45s',
        avgCost: '$0.12',
        detailsLink: '#',
        totalTasks: 250
    },
    {
        model: 'GPT-4o',
        avgScore: '82%',
        avgTime: '55s',
        avgCost: '$0.06',
        detailsLink: '#',
        totalTasks: 250
    },
    {
        model: 'Gemini Pro',
        avgScore: '80%',
        avgTime: '1m 05s',
        avgCost: '$0.08',
        detailsLink: '#',
        totalTasks: 250
    },
];

// Function to populate the results table
function populateResultsTable() {
    const tbody = document.getElementById('results-body');
    tbody.innerHTML = ''; // Clear existing content

    resultsData.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.model}</td>
            <td>${result.avgScore}</td>
            <td>${result.avgTime}</td>
            <td>${result.avgCost}</td>
            <td>
                <button class="details-btn" onclick="window.location.href='${result.detailsLink}'">
                    View Details
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to filter results
function filterResults() {
    const modelFilter = document.getElementById('model-filter').value;
    
    const filteredData = resultsData.filter(result => {
        const matchesModel = modelFilter === 'all' || result.model.toLowerCase().includes(modelFilter.toLowerCase());
        return matchesModel;
    });

    const tbody = document.getElementById('results-body');
    tbody.innerHTML = '';

    filteredData.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.model}</td>
            <td>${result.avgScore}</td>
            <td>${result.avgTime}</td>
            <td>${result.avgCost}</td>
            <td>
                <button class="details-btn" onclick="window.location.href='${result.detailsLink}'">
                    View Details
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add event listeners for filters
document.addEventListener('DOMContentLoaded', () => {
    populateResultsTable();
    
    // Add filter event listener
    document.getElementById('model-filter').addEventListener('change', filterResults);
}); 