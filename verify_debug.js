const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';

async function checkRange() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '14kSE5Vg0H7jzHFCLN04Vmh3Wi_WFcfJL4LRV49A3OI8';

    try {
        const metadata = await sheets.spreadsheets.get({
            spreadsheetId
        });

        console.log('--- Spreadsheet Structure ---');
        metadata.data.sheets.forEach(s => {
            console.log(`Sheet Name: "${s.properties.title}"`);
        });

        const firstSheetName = metadata.data.sheets[0].properties.title;
        const data = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `'${firstSheetName}'!A:D`,
        });

        if (data.data.values) {
            console.log('--- Current Registrations ---');
            data.data.values.forEach((row, index) => {
                console.log(`${index}: ${row.join(' | ')}`);
            });
        } else {
            console.log('Sheet is still reported as empty by the API.');
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
}

checkRange();
