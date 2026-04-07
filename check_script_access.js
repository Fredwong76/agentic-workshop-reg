const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';

async function checkScriptAccess() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: [
            'https://www.googleapis.com/auth/script.projects.readonly',
            'https://www.googleapis.com/auth/drive.metadata.readonly'
        ],
    });

    const script = google.script({ version: 'v1', auth });
    const drive = google.drive({ version: 'v3', auth });
    const scriptId = '1D-KSMxTI_SZ-H9rgm63Obpgy2feMx-mCcyJCjPPmsP4yJrC_YiJA2ulW';

    try {
        console.log('--- Checking Drive Metadata for the Script ---');
        const file = await drive.files.get({
            fileId: scriptId,
            fields: 'id, name, mimeType',
        });
        console.log(`Found File: ${file.data.name} (${file.data.id})`);

        console.log('\n--- Checking Apps Script API Access ---');
        const content = await script.projects.getContent({
            scriptId: scriptId
        });

        console.log('Success! I can read the script content:');
        content.data.files.forEach(f => console.log(`- ${f.name}.${f.type}`));

    } catch (err) {
        console.log('\nResult: I cannot access the script editor directly yet.');
        console.log('Error Detail:', err.message);
        console.log('\nTo give me access, you would need to:');
        console.log('1. Enable the "Google Apps Script API" in your GCP Console.');
        console.log('2. In Apps Script Settings, toggle "Google Apps Script API" to ON.');
        console.log('3. Share the script with:');
        console.log('   workshop-registration-manager@workshop-manager-lps.iam.gserviceaccount.com');
    }
}

checkScriptAccess();
