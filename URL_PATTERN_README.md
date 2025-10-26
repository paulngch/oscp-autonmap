# URL Validation Pattern Analysis

## Quick Answer

The regex pattern:
```javascript
/^http:\/\/(?:localhost|\d{1,3}(\.\d{1,3}){3}):\d+\/?#?\//.test(window.location.href)
```

**Tests if a URL starts with:**
- `http://` protocol (not https)
- `localhost` OR an IP address (like `192.168.1.1`)
- A colon and port number (like `:8080`)
- A required forward slash (with optional slash and hash before it)

**Common use case:** Detecting if a web application is running on a local development server.

## What This Repository Contains

This repository now includes comprehensive documentation about the URL validation regex pattern:

### 📄 Files

1. **URL_VALIDATION_PATTERN.md** - Detailed explanation
   - Complete breakdown of each regex component
   - Examples of matching and non-matching URLs
   - Important notes about limitations and issues
   - Better alternatives for URL validation

2. **url-validation-test.js** - Executable test suite
   - Run with: `node url-validation-test.js`
   - 18 test cases with colored terminal output
   - Demonstrates which URLs match and which don't
   - Shows the pattern's limitations

3. **url-validation-example.html** - Interactive browser demo
   - Open in a browser to test the pattern visually
   - Tests the pattern against your current URL
   - Shows multiple test cases with visual feedback
   - Great for understanding the pattern in action

## Quick Start

### Run the Tests
```bash
node url-validation-test.js
```

### View the HTML Demo
Open `url-validation-example.html` in your browser and navigate to different URLs like:
- `http://localhost:8080/#/`
- `http://127.0.0.1:3000/#/`
- etc.

### Read the Documentation
See `URL_VALIDATION_PATTERN.md` for complete details.

## Key Findings

✅ **The pattern matches:**
- `http://localhost:8080/#/`
- `http://192.168.1.1:3000/`
- `http://127.0.0.1:8080/any/path` (no end anchor!)

❌ **The pattern does NOT match:**
- `https://localhost:8080/#/` (HTTPS)
- `http://localhost/#/` (no port)
- `http://example.com:8080/#/` (domain name)

⚠️ **Important limitations:**
1. No end anchor - matches URLs with any path after the required slash
2. Weak IP validation - accepts invalid IPs like `999.999.999.999`
3. HTTP only - doesn't match HTTPS URLs
4. Requires a port number

## About the Original Repository

This repository contains bash scripts for OSCP (Offensive Security Certified Professional) automation with nmap:
- `autonmap-nc.sh` - TCP scanning automation
- `autonmap-UDP.sh` - UDP scanning automation

The URL validation pattern documentation has been added to explain the regex pattern from the problem statement.
