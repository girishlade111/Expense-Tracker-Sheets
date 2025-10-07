const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from public folder

// Google Sheets configuration
const GOOGLE_SHEETS_CONFIG = {
    apiKey: 'AIzaSyBsoEbU9E4aveh55fVcjPKMF1z0oA5aOHQ',
    spreadsheetId: '1t5eVxXL8CTEINqSNGTlwe4vysr-UzZsSwj4UXtIGXD4',
    range: 'Sheet1!A:F'
};

// Initialize Google Sheets API
const sheets = google.sheets({ version: 'v4', auth: GOOGLE_SHEETS_CONFIG.apiKey });

// Routes
app.get('/api/transactions', async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
            range: GOOGLE_SHEETS_CONFIG.range,
        });

        const rows = response.data.values || [];
        const transactions = rows.slice(1).map((row, index) => ({
            id: Date.now() + index,
            date: row[0] || '',
            description: row[1] || '',
            category: row[2] || '',
            amount: parseFloat(row[3]) || 0,
            type: row[4] || '',
            note: row[5] || '',
            timestamp: new Date().toISOString()
        }));

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

app.post('/api/transactions', async (req, res) => {
    try {
        const transaction = req.body;
        
        const values = [
            [
                transaction.date,
                transaction.description,
                transaction.category,
                transaction.amount,
                transaction.type,
                transaction.note || ''
            ]
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
            range: GOOGLE_SHEETS_CONFIG.range,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: values
            }
        });

        res.json({ success: true, message: 'Transaction saved successfully' });
    } catch (error) {
        console.error('Error saving transaction:', error);
        res.status(500).json({ error: 'Failed to save transaction' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Expense Tracker API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Expense Tracker available at http://localhost:${PORT}`);
});
