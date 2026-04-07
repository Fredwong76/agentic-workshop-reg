const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';

async function checkRegistration() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    try {
        console.log('Searching for "Workshop Registrations" sheet...');
        const res = await drive.files.list({
            q: "name = 'Workshop Registrations' and mimeType = 'application/vnd.google-apps.spreadsheet'",
            fields: 'files(id, name)',
        });

        if (res.data.files.length === 0) {
            console.log('No spreadsheet found. Did you share it with the service account email?');
            console.log('Service Account: workshop-registration-manager@workshop-manager-lps.iam.gserviceaccount.com');
            return;
        }

        const fileId = res.data.files[0].id;
        console.log(`Found Sheet! ID: ${fileId}`);

        const sheets = google.sheets({ version: 'v4', auth });
        const data = await sheets.spreadsheets.values.get({
            spreadsheetId: fileId,
            range: 'Sheet1!A:D',
        });

        if (data.data.values) {
            console.log('--- Current Registrations ---');
            data.data.values.forEach((row, index) => {
                console.log(`${index}: ${row.join(' | ')}`);
            });
        } else {
            console.log('Sheet is empty.');
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
}

checkRegistration();
