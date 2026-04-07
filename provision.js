const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';

async function setupResources() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/cloud-platform'
        ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const drive = google.drive({ version: 'v3', auth });

    try {
        console.log('--- Step 1: Creating Google Sheet ---');
        const sheetResponse = await sheets.spreadsheets.create({
            resource: {
                properties: { title: 'Agentic_IDE_Workshop_Registrations' }
            }
        });
        const spreadsheetId = sheetResponse.data.spreadsheetId;
        const spreadsheetUrl = sheetResponse.data.spreadsheetUrl;
        console.log(`Sheet created! ID: ${spreadsheetId}`);
        console.log(`URL: ${spreadsheetUrl}`);

        console.log('--- Step 2: Setting up Headers ---');
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A1',
            valueInputOption: 'RAW',
            resource: {
                values: [['Timestamp', 'Full Name', 'Email', 'Mode']]
            }
        });
        console.log('Headers added.');

        console.log('--- Step 3: Granting User Access (You) ---');
        // We get your email from the owner field of the project if possible, 
        // but for now we'll just output the sheet ID so you can claim it if needed.
        // Or you can share it with your own email specifically:
        // await drive.permissions.create({ ... })
        console.log('NOTE: Since I am a service account, you need to share the sheet with yourself.');
        console.log(`Please visit ${spreadsheetUrl} and request access, or I can share it if you provide your email.`);

        return { spreadsheetId, spreadsheetUrl };

    } catch (err) {
        console.error('Error during setup:', err);
    }
}

setupResources();
