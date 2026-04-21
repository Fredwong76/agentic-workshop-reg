const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';

async function checkScriptOwner() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });
    const scriptId = '1D-KSMxTI_SZ-H9rgm63Obpgy2feMx-mCcyJCjPPmsP4yJrC_YiJA2ulW';

    try {
        console.log('Checking owners for Apps Script project:', scriptId);
        const res = await drive.files.get({
            fileId: scriptId,
            fields: 'name, owners',
        });

        console.log('\n--- Script Owner Details ---');
        res.data.owners.forEach(owner => {
            console.log(`Name: ${owner.displayName}`);
            console.log(`Email: ${owner.emailAddress}`);
        });

    } catch (err) {
        console.error('Error fetching script metadata:', err.message);
    }
}

checkScriptOwner();
