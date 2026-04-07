const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';

async function listAllSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    try {
        console.log('Listing all Google Sheets accessible to the service account...');
        const res = await drive.files.list({
            q: "mimeType = 'application/vnd.google-apps.spreadsheet'",
            fields: 'files(id, name)',
        });

        if (res.data.files.length === 0) {
            console.log('No spreadsheets found.');
            return;
        }

        res.data.files.forEach(file => {
            console.log(`Sheet Found: "${file.name}" (ID: ${file.id})`);
        });

    } catch (err) {
        console.error('Error:', err.message);
    }
}

listAllSheets();
