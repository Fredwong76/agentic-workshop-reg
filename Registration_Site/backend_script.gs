function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date().toLocaleString(), 
      data.name, 
      data.email, 
      data.mode,
      data.interests || ""
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
}
