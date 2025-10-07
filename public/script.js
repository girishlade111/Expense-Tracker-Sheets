// Backend URL configuration
const BACKEND_URL = 'http://localhost:3000/api';

// Global variables
let transactions = [];
let categories = [];

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const transactionsList = document.getElementById('transactionsList');
const loadingModal = document.getElementById('loadingModal');
const messageContainer = document.getElementById('messageContainer');

// Summary elements
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');

// Filter elements
const filterType = document.getElementById('filterType');
const filterCategory = document.getElementById('filterCategory');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setDefaultDate();
});

function initializeApp() {
    // Load transactions from backend
    loadTransactions();
    
    // Initialize categories
    initializeCategories();
}

function setupEventListeners() {
    // Form submission
    expenseForm.addEventListener('submit', handleFormSubmit);
    
    // Clear form button
    document.getElementById('clearForm').addEventListener('click', clearForm);
    
    // Filter changes
    filterType.addEventListener('change', filterTransactions);
    filterCategory.addEventListener('change', filterTransactions);
}

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

// Backend API Integration Functions
async function loadTransactions() {
    showLoading(true);
    
    try {
        const response = await fetch(`${BACKEND_URL}/transactions`);
        if (!response.ok) {
            throw new Error('Failed to load transactions');
        }
        
        transactions = await response.json();
        updateUI();
        showMessage('Transactions loaded successfully', 'success');
    } catch (error) {
        console.error('Error loading transactions:', error);
        showMessage('Error loading transactions', 'error');
    } finally {
        showLoading(false);
    }
}

async function saveTransaction(transaction) {
    showLoading(true);
    
    try {
        const response = await fetch(`${BACKEND_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save transaction');
        }
        
        // Add transaction to local array
        transactions.unshift(transaction);
        
        updateUI();
        showMessage('Transaction saved successfully', 'success');
        return true;
    } catch (error) {
        console.error('Error saving transaction:', error);
        showMessage('Error saving transaction', 'error');
        return false;
    } finally {
        showLoading(false);
    }
}

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(expenseForm);
    const transaction = {
        id: Date.now(),
        date: formData.get('date'),
        description: formData.get('description'),
        category: formData.get('category'),
        amount: parseFloat(formData.get('amount')),
        type: formData.get('type'),
        note: formData.get('note'),
        timestamp: new Date().toISOString()
    };
    
    // Validate transaction
    if (!validateTransaction(transaction)) {
        return;
    }
    
    // Save transaction
    saveTransaction(transaction).then(success => {
        if (success) {
            clearForm();
        }
    });
}

function validateTransaction(transaction) {
    if (!transaction.date) {
        showMessage('Please select a date', 'error');
        return false;
    }
    
    if (!transaction.description.trim()) {
        showMessage('Please enter a description', 'error');
        return false;
    }
    
    if (!transaction.category) {
        showMessage('Please select a category', 'error');
        return false;
    }
    
    if (!transaction.amount || transaction.amount <= 0) {
        showMessage('Please enter a valid amount', 'error');
        return false;
    }
    
    if (!transaction.type) {
        showMessage('Please select a type', 'error');
        return false;
    }
    
    return true;
}

function clearForm() {
    expenseForm.reset();
    setDefaultDate();
}

// UI Update Functions
function updateUI() {
    updateSummary();
    updateTransactionsList();
    updateFilters();
}

function updateSummary() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;
    
    document.getElementById('totalBalance').textContent = formatCurrency(balance);
    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);
}

function updateTransactionsList() {
    const filteredTransactions = getFilteredTransactions();
    
    if (filteredTransactions.length === 0) {
        transactionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <h3>No transactions found</h3>
                <p>Add your first transaction to get started!</p>
            </div>
        `;
        return;
    }
    
    transactionsList.innerHTML = filteredTransactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-info">
                <div class="transaction-description">${transaction.description}</div>
                <div class="transaction-details">
                    <span class="transaction-category">${transaction.category}</span>
                    <span class="transaction-type ${transaction.type}">${transaction.type}</span>
                    <span>${formatDate(transaction.date)}</span>
                    ${transaction.note ? `<span>• ${transaction.note}</span>` : ''}
                </div>
            </div>
            <div class="transaction-amount ${transaction.type}">
                ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
            </div>
        </div>
    `).join('');
}

function updateFilters() {
    // Update category filter options
    const uniqueCategories = [...new Set(transactions.map(t => t.category))];
    const categoryFilter = document.getElementById('filterCategory');
    
    // Keep "All Categories" option
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function getFilteredTransactions() {
    let filtered = [...transactions];
    
    const typeFilter = filterType.value;
    const categoryFilter = filterCategory.value;
    
    if (typeFilter !== 'all') {
        filtered = filtered.filter(t => t.type === typeFilter);
    }
    
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(t => t.category === categoryFilter);
    }
    
    return filtered;
}

function filterTransactions() {
    updateTransactionsList();
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function initializeCategories() {
    categories = [
        'Food & Dining',
        'Transportation',
        'Shopping',
        'Entertainment',
        'Healthcare',
        'Education',
        'Utilities',
        'Salary',
        'Freelance',
        'Investment',
        'Other'
    ];
}

// UI Helper Functions
function showLoading(show) {
    loadingModal.style.display = show ? 'block' : 'none';
}

function showMessage(message, type = 'success') {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    messageContainer.appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

// Export functionality (for backup)
function exportTransactions() {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `expense-tracker-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Import functionality
function importTransactions(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedTransactions = JSON.parse(e.target.result);
            transactions = importedTransactions;
            updateUI();
            showMessage('Transactions imported successfully', 'success');
        } catch (error) {
            showMessage('Error importing transactions', 'error');
        }
    };
    reader.readAsText(file);
}

// Add export/import buttons to the UI
function addExportImportButtons() {
    const header = document.querySelector('.section-header');
    const exportImportDiv = document.createElement('div');
    exportImportDiv.className = 'export-import-buttons';
    exportImportDiv.innerHTML = `
        <button class="btn btn-secondary" onclick="exportTransactions()">
            <i class="fas fa-download"></i> Export
        </button>
        <input type="file" id="importFile" accept=".json" style="display: none;" onchange="importTransactions(this.files[0])">
        <button class="btn btn-secondary" onclick="document.getElementById('importFile').click()">
            <i class="fas fa-upload"></i> Import
        </button>
    `;
    header.appendChild(exportImportDiv);
}

// Initialize export/import functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addExportImportButtons, 1000);
});
