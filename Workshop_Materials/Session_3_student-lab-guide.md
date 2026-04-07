# Lab Guide: Singapore Carpark Availability Finder

## Overview

In this lab, you will build a static website hosted on Amazon S3 that displays real-time HDB carpark availability in Singapore. You will enter a postal code, and the website will show nearby carpark lot availability with color-coded indicators.

The backend (Lambda function + DynamoDB database) has already been set up by your instructor. Your job is to:

1. Create an S3 bucket and enable static website hosting
2. Build the frontend (HTML, CSS, JavaScript)
3. Integrate with the shared Lambda backend
4. Test with real postal codes

## Architecture

```
Your S3 Static Website  →  Shared Lambda Function URL  →  Shared DynamoDB Table
(you build this)            (provided by instructor)       (pre-seeded data)
                                                        →  data.gov.sg API
                                                           (real-time availability)
```

## Prerequisites

- AWS Console access to the LPS-Sandbox account (942226532280)
- Region: **ap-southeast-1 (Singapore)**
- A text editor (VS Code, Notepad++, etc.)

## Shared Resources (Provided by Instructor)

| Resource | Value |
|----------|-------|
| Lambda Function URL | `https://hwmxq5o73asklggjupi6vohbhq0itsap.lambda-url.ap-southeast-1.on.aws/` |
| API Usage | `GET <Lambda URL>?postal_code=<6-digit code>` |
| AWS Account | 942226532280 |
| Region | ap-southeast-1 |

### Lambda API Response Format

**Successful response:**
```json
{
  "carparks": [
    {
      "carpark_number": "PL48",
      "address": "BLK 271 PUNGGOL WALK",
      "availability": [
        {
          "lot_type": "C",
          "lots_available": 285,
          "total_lots": 476
        }
      ],
      "timestamp": "2026-04-07T13:34:38"
    }
  ]
}
```

**Error response:**
```json
{"error": "No carparks found for postal code 000000"}
```

### Lot Type Codes

| Code | Meaning |
|------|---------|
| C | Cars |
| H | Heavy Vehicles |
| Y | Motorcycles |

---

## Part 1: Create Your S3 Static Website (15 min)

### Step 1.1: Create an S3 Bucket

1. Open the AWS Console and navigate to **S3**
2. Make sure you are in the **ap-southeast-1 (Singapore)** region
3. Click **Create bucket**
4. Bucket name: `workshop-carpark-<your-name>` (e.g., `workshop-carpark-alice`)
   - Bucket names must be globally unique
5. Region: **Asia Pacific (Singapore) ap-southeast-1**
6. **Uncheck** "Block all public access"
   - Check the acknowledgment box that appears
7. Leave all other settings as default
8. Click **Create bucket**

### Step 1.2: Enable Static Website Hosting

1. Click on your newly created bucket
2. Go to the **Properties** tab
3. Scroll down to **Static website hosting**
4. Click **Edit**
5. Select **Enable**
6. Index document: `index.html`
7. Click **Save changes**
8. Note down the **Bucket website endpoint** URL — you'll need this later
   - It looks like: `http://workshop-carpark-<your-name>.s3-website-ap-southeast-1.amazonaws.com`

### Step 1.3: Set Bucket Policy for Public Read Access

1. Go to the **Permissions** tab
2. Scroll to **Bucket policy** and click **Edit**
3. Paste the following policy (replace `<your-bucket-name>` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<your-bucket-name>/*"
    }
  ]
}
```

4. Click **Save changes**

---

## Part 2: Build the Frontend (30 min)

Create three files on your computer: `index.html`, `style.css`, and `app.js`.

### Step 2.1: Create index.html

Create a file called `index.html` with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Singapore Carpark Availability Finder</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Singapore Carpark Availability Finder</h1>
        <p>Search for real-time HDB carpark availability by postal code</p>
    </header>

    <main>
        <section>
            <form id="search-form">
                <label for="postal-code-input">Postal Code</label>
                <div class="search-bar">
                    <input
                        type="text"
                        id="postal-code-input"
                        placeholder="Enter postal code (e.g. 821271)"
                        maxlength="6"
                        inputmode="numeric"
                    >
                    <button type="submit" id="search-btn">Search</button>
                </div>
            </form>
        </section>

        <div id="loading" class="loading" hidden>
            <p>Searching for carparks...</p>
        </div>

        <div id="error-message" class="error-message" hidden></div>

        <section id="results"></section>
    </main>

    <script src="app.js"></script>
</body>
</html>
```

### Step 2.2: Create style.css

Create a file called `style.css` with the following content:

### Step 2.2: Create style.css

Create a file called `style.css` with the following content:

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');

:root {
    --primary: #E01E26; /* HDB Red */
    --accent: #2D3E50;
    --bg: #F8F9FB;
    --card: #FFFFFF;
    --text: #1A1A1A;
    --available: #27AE60;
    --low: #F39C12;
    --full: #E74C3C;
}

body {
    font-family: 'Outfit', sans-serif;
    background-color: var(--bg);
    color: var(--text);
    margin: 0;
    line-height: 1.6;
}

header {
    background: linear-gradient(135deg, var(--primary), #BF191F);
    color: white;
    padding: 3rem 1rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

header h1 {
    margin: 0;
    font-weight: 600;
    font-size: 2.2rem;
}

header p {
    opacity: 0.9;
    font-weight: 300;
}

main {
    max-width: 600px;
    margin: -2rem auto 2rem;
    padding: 2rem;
    background: var(--card);
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.05);
}

.search-bar {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

input {
    flex: 1;
    padding: 1rem;
    border: 2px solid #EEE;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

input:focus {
    outline: none;
    border-color: var(--primary);
}

button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, background 0.3s;
}

button:hover {
    background: #BF191F;
    transform: translateY(-2px);
}

.loading {
    text-align: center;
    margin: 2rem 0;
}

.error-message {
    background: #FFEBEB;
    color: var(--full);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    text-align: center;
}

.carpark-card {
    border: 1px solid #EEE;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: border-color 0.3s;
}

.carpark-card:hover {
    border-color: var(--primary);
}

.carpark-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.carpark-number {
    font-weight: 600;
    color: var(--accent);
    background: #F0F2F5;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
}

.availability {
    font-size: 1.5rem;
    font-weight: 600;
}

.available { color: var(--available); }
.low { color: var(--low); }
.full { color: var(--full); }

.details {
    font-size: 0.9rem;
    color: #666;
}
```

### Step 2.3: Create app.js

Create a file called `app.js` with the following content:

```javascript
const LAMBDA_URL = 'https://hwmxq5o73asklggjupi6vohbhq0itsap.lambda-url.ap-southeast-1.on.aws/';

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const postalCode = document.getElementById('postal-code-input').value.trim();
    const resultsContainer = document.getElementById('results');
    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('error-message');

    if (!/^\d{6}$/.test(postalCode)) {
        showError("Please enter a valid 6-digit postal code.");
        return;
    }

    // Reset UI
    resultsContainer.innerHTML = '';
    errorMsg.hidden = true;
    loading.hidden = false;

    try {
        const response = await fetch(`${LAMBDA_URL}?postal_code=${postalCode}`);
        const data = await response.json();

        if (data.error) {
            showError(data.error);
        } else if (data.carparks && data.carparks.length > 0) {
            renderResults(data.carparks);
        } else {
            showError("No carparks found for this location.");
        }
    } catch (err) {
        showError("Failed to connect to the cloud. Check your internet connection.");
        console.error(err);
    } finally {
        loading.hidden = true;
    }
});

function showError(msg) {
    const errorMsg = document.getElementById('error-message');
    errorMsg.textContent = msg;
    errorMsg.hidden = false;
    document.getElementById('loading').hidden = true;
}

function renderResults(carparks) {
    const container = document.getElementById('results');
    
    carparks.forEach(cp => {
        const carLots = cp.availability.find(a => a.lot_type === 'C') || cp.availability[0];
        const statusClass = carLots.lots_available > 10 ? 'available' : carLots.lots_available > 0 ? 'low' : 'full';
        
        const card = document.createElement('div');
        card.className = 'carpark-card';
        card.innerHTML = `
            <div class="carpark-header">
                <div>
                    <span class="carpark-number">${cp.carpark_number}</span>
                    <p class="details">${cp.address}</p>
                </div>
                <div class="availability ${statusClass}">
                    ${carLots.lots_available}
                </div>
            </div>
            <div class="details">
                Lots Available / Total: ${carLots.lots_available} of ${carLots.total_lots}
            </div>
        `;
        container.appendChild(card);
    });
}
```

---

## Part 3: Test and Verify

1. Open your `index.html` file in a browser.
2. Enter a Singapore postal code (e.g., `821271` for Punggol).
3. Verify that the availability data loads correctly.
4. **Final Step:** Drag and drop your `index.html`, `style.css`, and `app.js` into your S3 bucket in the AWS Console.
5. Visit your **Bucket Website Endpoint** to see your live cloud application!
