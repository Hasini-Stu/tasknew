# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter project name: `dev-deakin-auth` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Choose Analytics account or create new one
6. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Click on "Email/Password"
5. Enable "Email/Password" provider
6. Click "Save"

## Step 3: Create Firestore Database

1. Click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location closest to your users
5. Click "Done"

## Step 4: Configure Firestore Security Rules

Replace the default rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read all user documents (for login verification)
    match /users/{userId} {
      allow read: if request.auth != null;
    }
  }
}
```

## Step 5: Add Web App

1. Click on the gear icon (Project Settings) in the left sidebar
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Enter app nickname: `DEV@Deakin Web`
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 6: Create Environment Variables

Create a `.env` file in your project root with the following content:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

Replace the placeholder values with your actual Firebase configuration values.

## Step 7: Test the Setup

1. Run `npm start` to start your development server
2. Navigate to `/signup` to test user registration
3. Navigate to `/login` to test user login
4. Check Firebase Console to verify users are created

## Troubleshooting

- Make sure your `.env` file is in the project root
- Restart your development server after creating the `.env` file
- Check browser console for any Firebase configuration errors
- Verify that all environment variables are prefixed with `REACT_APP_`
