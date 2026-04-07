const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';
const SPREADSHEET_ID = '1h19ZODELm796GGubZIVG7toOcHTvZ3voCGFxinVitXc';

async function listParticipants() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    try {
        console.log('Fetching participants from Google Sheet...');
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A2:E', // Starting from A2 to skip headers
        });

        const rows = res.data.values;
        if (!rows || rows.length === 0) {
            console.log('No participants found.');
            return;
        }

        console.log('PARTICIPANTS_LIST_START');
        rows.forEach((row, index) => {
            console.log(JSON.stringify({
                index: index + 1,
                timestamp: row[0],
                name: row[1],
                email: row[2],
                mode: row[3],
                interests: row[4] || ''
            }));
        });
        console.log('PARTICIPANTS_LIST_END');

    } catch (err) {
        console.error('Error:', err.message);
    }
}

listParticipants();
