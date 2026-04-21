const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';

async function verifyAllSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1h19ZODELm796GGubZIVG7toOcHTvZ3voCGFxinVitXc';

    try {
        console.log('Fetching sheet metadata for LSP Spreadsheet...');
        const meta = await sheets.spreadsheets.get({ spreadsheetId });

        for (const sheet of meta.data.sheets) {
            const title = sheet.properties.title;
            console.log(`\n--- Checking Sheet: "${title}" ---`);
            const data = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `'${title}'!A:E`,
            });

            if (data.data.values) {
                data.data.values.forEach((row, index) => {
                    console.log(`${index}: ${row.join(' | ')}`);
                });
            } else {
                console.log('Sheet is empty.');
            }
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
}

verifyAllSheets();
