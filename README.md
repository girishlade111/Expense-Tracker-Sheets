# Expense Tracker with Google Sheets Integration

A professional and minimalistic expense tracking web application with Google Sheets integration. This application allows users to track their income and expenses with a clean, responsive interface while storing all data in Google Sheets for easy access and analysis.

![Expense Tracker Demo](https://via.placeholder.com/800x400?text=Expense+Tracker+Demo) <!-- Replace with actual screenshot -->

## Features

- ✅ **Professional & Minimalistic Design** - Clean, modern UI with intuitive navigation
- ✅ **Real-time Summary Cards** - Instant overview of balance, income, and expenses
- ✅ **Easy Transaction Entry** - Simple form for adding income and expense transactions
- ✅ **Advanced Filtering** - Filter transactions by type and category
- ✅ **Google Sheets Integration** - Data persistence using Google Sheets API
- ✅ **Export/Import Functionality** - Backup and restore your financial data
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Real-time Updates** - Instant synchronization with Google Sheets

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: Google Sheets API
- **Authentication**: API Key-based authentication
- **Deployment**: Can be deployed on any Node.js hosting platform

## Project Structure

```
expense-tracker/
├── credentials.json.example # Google Sheets API configuration (copy to credentials.json)
├── server.js                # Backend server implementation
├── package.json             # Project dependencies and scripts
├── public/                  # Frontend assets
│   ├── index.html           # Main HTML file
│   ├── styles.css           # Styling
│   └── script.js            # Frontend JavaScript
└── README.md                # Project documentation
```

## Prerequisites

- Node.js (version 14.0.0 or higher)
- npm (comes with Node.js)
- A Google account for Google Sheets integration

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/girishlade111/Expense-Tracker-Sheets.git
   cd Expense-Tracker-Sheets
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Google Sheets Setup

1. Create a new Google Sheet with the following headers in row 1:
   ```
   A1: Date
   B1: Description
   C1: Category
   D1: Amount
   E1: Type
   F1: Note
   ```

2. Set up Google Cloud Project and Service Account:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Sheets API
   - Create a service account
   - Download the JSON key file
   - Rename the downloaded file to `credentials.json` and place it in the project root

3. Update the configuration in `server.js` with your Spreadsheet ID:
   ```javascript
   const GOOGLE_SHEETS_CONFIG = {
       spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE',
       range: 'Sheet1!A:F'
   };
   ```

4. Share your Google Sheet with the service account email:
   - Click the "Share" button in your Google Sheet
   - Add the service account email (found in credentials.json) with editor permissions

## Usage

1. Start the server:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Start adding your transactions!

## API Endpoints

- `GET /api/transactions` - Retrieve all transactions from Google Sheets
- `POST /api/transactions` - Save a new transaction to Google Sheets
- `GET /api/health` - Health check endpoint

## Screenshots

![Dashboard](https://via.placeholder.com/800x500?text=Dashboard+View) <!-- Replace with actual screenshot -->
*Dashboard view showing summary cards and recent transactions*

![Add Transaction](https://via.placeholder.com/800x500?text=Add+Transaction+Form) <!-- Replace with actual screenshot -->
*Form for adding new income or expense transactions*

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Girish Lade**

- GitHub: [@girishlade111](https://github.com/girishlade111)
- Email: girishlade111@gmail.com

## Acknowledgments

- Thanks to [Google Sheets API](https://developers.google.com/sheets) for providing an easy way to store data
- Inspired by personal finance management needs
- Built with modern web technologies for a seamless user experience

---

**Note**: This application is intended for personal use. Please ensure you follow Google's API usage policies and secure your API keys appropriately.