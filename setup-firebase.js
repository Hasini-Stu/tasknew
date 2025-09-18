#!/usr/bin/env node

/**
 * Firebase Setup Helper Script
 * This script helps validate Firebase configuration and provides setup guidance
 */

const fs = require('fs');
const path = require('path');

console.log('🔥 Firebase Setup Helper\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('\n📝 Creating .env.example file...');
  
  const envExampleContent = `# Firebase Configuration
# Copy this file to .env and replace these values with your actual Firebase project credentials
# Get these from Firebase Console > Project Settings > General > Your apps

REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id

# Optional: Firebase Measurement ID (for Analytics)
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX`;

  try {
    fs.writeFileSync(envExamplePath, envExampleContent);
    console.log('✅ .env.example file created successfully!');
  } catch (error) {
    console.error('❌ Failed to create .env.example file:', error.message);
  }
  
  console.log('\n📋 Next steps:');
  console.log('1. Copy .env.example to .env');
  console.log('2. Replace placeholder values with your actual Firebase credentials');
  console.log('3. Follow the instructions in FIREBASE_SETUP_INSTRUCTIONS.md');
  console.log('4. Run "npm start" to test your setup');
  
} else {
  console.log('✅ .env file found!');
  
  // Read and validate .env file
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    const requiredVars = [
      'REACT_APP_FIREBASE_API_KEY',
      'REACT_APP_FIREBASE_AUTH_DOMAIN',
      'REACT_APP_FIREBASE_PROJECT_ID',
      'REACT_APP_FIREBASE_STORAGE_BUCKET',
      'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
      'REACT_APP_FIREBASE_APP_ID'
    ];
    
    const missingVars = [];
    const placeholderVars = [];
    
    requiredVars.forEach(varName => {
      const line = lines.find(l => l.startsWith(varName));
      if (!line) {
        missingVars.push(varName);
      } else {
        const value = line.split('=')[1];
        if (value && (value.includes('your-') || value.includes('123456789'))) {
          placeholderVars.push(varName);
        }
      }
    });
    
    if (missingVars.length > 0) {
      console.log('❌ Missing environment variables:');
      missingVars.forEach(varName => console.log(`   - ${varName}`));
    }
    
    if (placeholderVars.length > 0) {
      console.log('⚠️  Environment variables with placeholder values:');
      placeholderVars.forEach(varName => console.log(`   - ${varName}`));
    }
    
    if (missingVars.length === 0 && placeholderVars.length === 0) {
      console.log('✅ All Firebase environment variables are configured!');
      console.log('\n🚀 You can now run "npm start" to test your Firebase setup.');
    } else {
      console.log('\n📋 Please update your .env file with actual Firebase credentials.');
      console.log('   See FIREBASE_SETUP_INSTRUCTIONS.md for detailed setup instructions.');
    }
    
  } catch (error) {
    console.error('❌ Error reading .env file:', error.message);
  }
}

console.log('\n📚 Additional Resources:');
console.log('- Firebase Console: https://console.firebase.google.com');
console.log('- Firebase Documentation: https://firebase.google.com/docs');
console.log('- Setup Instructions: FIREBASE_SETUP_INSTRUCTIONS.md');
console.log('- Test Plan: AUTHENTICATION_TEST_PLAN.md');
