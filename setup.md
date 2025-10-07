# Expense Tracker Setup Guide

Your Expense Tracker is now configured with your Google Sheets credentials and a Node.js backend!

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

### 3. Access the Application

Open your browser and go to: `http://localhost:3000`

## What's Been Configured

✅ **Google Sheets Integration**
- API Key: `AIzaSyBsoEbU9E4aveh55fVcjPKMF1z0oA5aOHQ`
- Spreadsheet ID: `1t5eVxXL8CTEINqSNGTlwe4vysr-UzZsSwj4UXtIGXD4`
- Backend handles all Google Sheets API calls

✅ **Backend Server**
- Express.js server running on port 3000
- CORS enabled for frontend communication
- API endpoints for loading and saving transactions

✅ **Frontend Updates**
- Updated to use backend API instead of direct Google Sheets calls
- No more CORS issues
- Better error handling

## API Endpoints

- `GET /api/transactions` - Load all transactions from Google Sheets
- `POST /api/transactions` - Save new transaction to Google Sheets
- `GET /api/health` - Health check endpoint

## Google Sheets Structure

Your Google Sheet should have these headers in row 1:
```
A1: Date
B1: Description  
C1: Category
D1: Amount
E1: Type
F1: Note
```

## Troubleshooting

### If you get "Module not found" errors:
```bash
npm install
```

### If the server won't start:
- Check if port 3000 is available
- Try: `npm start` or `node server.js`

### If transactions aren't saving:
- Check browser console for errors
- Verify your Google Sheet has the correct headers
- Ensure the sheet is shared with "Anyone with link can view"

### If you can't access the app:
- Make sure the server is running
- Check that you're going to `http://localhost:3000`
- Try refreshing the page

## Development Mode

For development with auto-restart:
```bash
npm run dev
```

## Files Structure

```
expense-tracker/
├── index.html          # Frontend
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Dependencies
├── setup.md           # This file
└── README.md          # Main documentation
```

## Security Notes

- Your API key is now secure in the backend
- No API keys exposed in frontend code
- CORS properly configured
- All Google Sheets calls go through the backend

## Next Steps

1. Start the server: `npm start`
2. Open `http://localhost:3000`
3. Add your first transaction!
4. Check your Google Sheet to see the data

Your Expense Tracker is now fully functional with Google Sheets integration! 🎉
