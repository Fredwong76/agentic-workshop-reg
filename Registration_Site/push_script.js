const { google } = require('googleapis');
const KEY_FILE = 'c:\\Users\\FHIN\\.gemini\\antigravity\\scratch\\Agent_Workshops\\workshop-manager-lps-1de840ec618f.json';
const scriptId = '1D-KSMxTI_SZ-H9rgm63Obpgy2feMx-mCcyJCjPPmsP4yJrC_YiJA2ulW';

async function pushScriptUpdate() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/script.projects'],
    });

    const script = google.script({ version: 'v1', auth });

    const newCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date().toLocaleString(), 
      data.name, 
      data.email, 
      data.mode,
      data.interests || "" // Capture the new interests field
    ]);
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}

// Optional: Test function to setup headers
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.appendRow(['Timestamp', 'Full Name', 'Email', 'Mode', 'Interests & Use Cases']);
  sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#f3f3f3');
}`;

    const manifest = `{
  "timeZone": "Asia/Singapore",
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE"
  }
}`;

    try {
        console.log('Pushing updated code to Apps Script...');
        await script.projects.updateContent({
            scriptId: scriptId,
            requestBody: {
                files: [
                    {
                        name: 'Code',
                        type: 'SERVER_JS',
                        source: newCode
                    },
                    {
                        name: 'appsscript',
                        type: 'JSON',
                        source: manifest
                    }
                ]
            }
        });
        console.log('Successfully pushed code update!');
    } catch (err) {
        console.error('Error pushing update:', err.message);
    }
}

pushScriptUpdate();
