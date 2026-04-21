const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';

async function checkSheetOwner() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });
    const fileId = '14kSE5Vg0H7jzHFCLN04Vmh3Wi_WFcfJL4LRV49A3OI8';

    try {
        console.log('Checking owners for file:', fileId);
        const res = await drive.files.get({
            fileId: fileId,
            fields: 'owners, permissions',
        });

        console.log('\n--- Owner Details ---');
        res.data.owners.forEach(owner => {
            console.log(`Name: ${owner.displayName}`);
            console.log(`Email: ${owner.emailAddress}`);
        });

        console.log('\n--- Permissions Summary ---');
        res.data.permissions.forEach(p => {
            console.log(`Role: ${p.role}, Type: ${p.type}, Email: ${p.emailAddress || 'N/A'}`);
        });

    } catch (err) {
        console.error('Error fetching file metadata:', err.message);
    }
}

checkSheetOwner();
