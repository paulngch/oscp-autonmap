#!/usr/bin/env node

/**
 * URL Validation Pattern Test Suite
 * 
 * This script tests the regex pattern:
 * /^http:\/\/(?:localhost|\d{1,3}(\.\d{1,3}){3}):\d+\/?#?\//
 * 
 * Run with: node url-validation-test.js
 */

// The regex pattern from the problem statement
const URL_PATTERN = /^http:\/\/(?:localhost|\d{1,3}(\.\d{1,3}){3}):\d+\/?#?\//;

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

/**
 * Test the URL pattern against a given URL
 * @param {string} url - The URL to test
 * @returns {boolean} - True if the URL matches the pattern
 */
function testUrlPattern(url) {
    return URL_PATTERN.test(url);
}

/**
 * Print a colored message
 */
function print(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Run all test cases
 */
function runTests() {
    print('\n==============================================', 'cyan');
    print('  URL Validation Pattern Test Suite', 'cyan');
    print('==============================================\n', 'cyan');
    
    print('Pattern:', 'blue');
    print('/^http:\\/\\/(?:localhost|\\d{1,3}(\\.\\d{1,3}){3}):\\d+\\/?#?\\//\n', 'yellow');
    
    const testCases = [
        // Expected to MATCH
        {
            category: 'Should MATCH ✅',
            tests: [
                { url: 'http://localhost:8080/#/', description: 'localhost with port and hash route' },
                { url: 'http://localhost:3000/#/', description: 'localhost with different port' },
                { url: 'http://127.0.0.1:8080/#/', description: 'loopback IP with hash route' },
                { url: 'http://192.168.1.100:3000/#/', description: 'private IP with hash route' },
                { url: 'http://10.0.0.1:8080/', description: 'IP with single trailing slash' },
                { url: 'http://localhost:8080//', description: 'localhost with double slash' },
                { url: 'http://172.16.0.1:9000/#/', description: 'another private IP range' },
                { url: 'http://999.999.999.999:8080/#/', description: 'invalid IP (but matches pattern!)' },
            ]
        },
        // Expected NOT to match
        {
            category: 'Should NOT match ❌',
            tests: [
                { url: 'https://localhost:8080/#/', description: 'HTTPS instead of HTTP' },
                { url: 'http://localhost:8080', description: 'no trailing slash' },
                { url: 'http://localhost/#/', description: 'missing port number' },
                { url: 'http://example.com:8080/#/', description: 'domain name instead of localhost/IP' },
                { url: 'http://localhost:8080/home', description: 'path without required slash pattern' },
                { url: 'http://localhost:8080#/', description: 'missing slash before hash' },
                { url: 'http://localhost:8080/api/v1', description: 'API path' },
                { url: 'http://[::1]:8080/#/', description: 'IPv6 address' },
                { url: 'ftp://localhost:8080/#/', description: 'FTP protocol' },
                { url: 'http://localhost.local:8080/#/', description: 'localhost with domain suffix' },
            ]
        }
    ];

    let totalTests = 0;
    let passedTests = 0;

    testCases.forEach(category => {
        print(`\n${category.category}`, 'cyan');
        print('─'.repeat(60), 'cyan');
        
        category.tests.forEach(test => {
            totalTests++;
            const result = testUrlPattern(test.url);
            const shouldMatch = category.category.includes('MATCH');
            const passed = result === shouldMatch;
            
            if (passed) {
                passedTests++;
                print(`✓ ${test.description}`, 'green');
            } else {
                print(`✗ ${test.description}`, 'red');
            }
            
            print(`  URL: ${test.url}`, 'reset');
            print(`  Result: ${result ? 'MATCHED' : 'DID NOT MATCH'}`, result ? 'green' : 'red');
            
            if (!passed) {
                print(`  ⚠️  Expected: ${shouldMatch ? 'MATCH' : 'NO MATCH'}`, 'yellow');
            }
            console.log();
        });
    });

    // Summary
    print('\n==============================================', 'cyan');
    print('  Test Summary', 'cyan');
    print('==============================================', 'cyan');
    print(`Total tests: ${totalTests}`, 'blue');
    print(`Passed: ${passedTests}`, 'green');
    print(`Failed: ${totalTests - passedTests}`, totalTests === passedTests ? 'green' : 'red');
    print(`Success rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 
          totalTests === passedTests ? 'green' : 'yellow');
    print('==============================================\n', 'cyan');

    // Additional explanations
    print('Key Observations:', 'blue');
    print('─'.repeat(60), 'blue');
    print('1. The pattern only matches HTTP (not HTTPS)', 'reset');
    print('2. Port number is required', 'reset');
    print('3. Host must be "localhost" or an IP address pattern', 'reset');
    print('4. The ending pattern (\\/?#?\\/) allows: /, //, or /#/', 'reset');
    print('5. IP validation is weak - it allows invalid octets like 999', 'reset');
    print('\nFor detailed explanation, see URL_VALIDATION_PATTERN.md\n', 'yellow');
}

// Run the tests
runTests();
