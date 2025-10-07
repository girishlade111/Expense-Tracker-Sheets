# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your Expense Tracker webapp.

## Prerequisites

- Google account
- Basic knowledge of Google Cloud Console

## Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top
3. Click "New Project"
4. Enter a project name (e.g., "Expense Tracker")
5. Click "Create"

### Step 2: Enable Google Sheets API

1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on "Google Sheets API"
4. Click "Enable"

### Step 3: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key (you'll need this)
4. Click "Restrict Key" and set restrictions:
   - Application restrictions: "HTTP referrers"
   - API restrictions: "Restrict key" > "Google Sheets API"

### Step 4: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Rename the first sheet to "Sheet1"
4. Add these headers in row 1:
   ```
   A1: Date
   B1: Description
   C1: Category
   D1: Amount
   E1: Type
   F1: Note
   ```
5. Format row 1 as bold headers
6. Share the sheet:
   - Click "Share" button
   - Click "Change to anyone with the link"
   - Set to "Viewer"
   - Click "Done"

### Step 5: Get Spreadsheet ID

1. Look at your Google Sheet URL
2. It will look like: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
3. Copy the ID between `/d/` and `/edit`
4. In this example, the ID is: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### Step 6: Configure the Application

1. Open `script.js` in your project
2. Find the `GOOGLE_SHEETS_CONFIG` object (around line 2)
3. Replace the placeholder values:

```javascript
const GOOGLE_SHEETS_CONFIG = {
    apiKey: 'YOUR_API_KEY_HERE', // Replace with your actual API key
    spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE', // Replace with your actual spreadsheet ID
    range: 'Sheet1!A:F'
};
```

### Step 7: Enable Google Sheets Integration

1. In `script.js`, find the `saveTransaction` function (around line 60)
2. Uncomment this line:
   ```javascript
   // await saveToGoogleSheets(transaction);
   ```
   Change it to:
   ```javascript
   await saveToGoogleSheets(transaction);
   ```

3. Find the `loadTransactions` function (around line 40)
4. Replace the localStorage code with:
   ```javascript
   try {
       const sheetData = await loadFromGoogleSheets();
       if (sheetData.length > 1) { // Skip header row
           transactions = sheetData.slice(1).map(row => ({
               id: Date.now() + Math.random(),
               date: row[0],
               description: row[1],
               category: row[2],
               amount: parseFloat(row[3]),
               type: row[4],
               note: row[5] || '',
               timestamp: new Date().toISOString()
           }));
       }
       updateUI();
       showMessage('Transactions loaded successfully', 'success');
   } catch (error) {
       console.error('Error loading transactions:', error);
       showMessage('Error loading transactions', 'error');
   }
   ```

### Step 8: Test the Integration

1. Open `index.html` in your browser
2. Add a test transaction
3. Check your Google Sheet to see if the data appears
4. Refresh the page to see if data loads from the sheet

## Troubleshooting

### Common Issues

1. **"API key not valid" error**
   - Check that your API key is correct
   - Ensure Google Sheets API is enabled
   - Verify API key restrictions

2. **"Access denied" error**
   - Check that your Google Sheet is shared properly
   - Ensure the sheet is accessible to anyone with the link

3. **CORS errors**
   - Use a local server (like Live Server in VS Code)
   - Or deploy to a web server

4. **Data not saving**
   - Check browser console for errors
   - Verify spreadsheet ID is correct
   - Ensure the sheet has the correct headers

### Testing Your Setup

1. **Test API Key**:
   ```
   https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID?key=YOUR_API_KEY
   ```
   This should return spreadsheet metadata.

2. **Test Sheet Access**:
   ```
   https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/Sheet1!A:F?key=YOUR_API_KEY
   ```
   This should return your sheet data.

## Security Best Practices

1. **Restrict API Key**:
   - Set HTTP referrer restrictions
   - Limit to Google Sheets API only
   - Use environment variables in production

2. **Sheet Permissions**:
   - Only share with necessary users
   - Use "Viewer" permissions for public access
   - Consider using service accounts for production

3. **Rate Limiting**:
   - Google Sheets API has usage limits
   - Implement error handling for rate limits
   - Consider caching for better performance

## Production Considerations

For production use, consider:

1. **Backend Proxy**: Create a backend service to handle API calls
2. **Authentication**: Implement proper user authentication
3. **Error Handling**: Add comprehensive error handling
4. **Caching**: Implement caching to reduce API calls
5. **Monitoring**: Add logging and monitoring

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all configuration values
3. Test API endpoints manually
4. Check Google Cloud Console for API usage
5. Review Google Sheets API documentation

---

**Note**: This setup is for development/testing. For production use, implement proper security measures and consider using a backend service.
