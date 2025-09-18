# Firebase Setup Guide for DEV@Deakin

## Prerequisites
- Google account
- Node.js and npm installed
- React development environment set up

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `dev-deakin` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Set up Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database (choose closest to your users)
5. Click "Done"

## Step 4: Get Firebase Configuration

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname (e.g., "dev-deakin-web")
5. Copy the Firebase configuration object

## Step 5: Configure Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add the following environment variables:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id

# SendGrid Configuration (existing)
SENDGRID_API_KEY=your-sendgrid-api-key
```

3. Replace the placeholder values with your actual Firebase configuration values

## Step 6: Update Firebase Configuration File

The `src/firebase/config.js` file is already set up to use these environment variables. No changes needed unless you want to modify the configuration.

## Step 7: Test the Setup

1. Start your React application: `npm start`
2. Start your backend server: `npm run server`
3. Navigate to `http://localhost:3000`
4. Try to register a new account
5. Check the Firebase Console to verify:
   - User appears in Authentication > Users
   - User data appears in Firestore Database

## Security Rules (Important for Production)

### Firestore Security Rules
Update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read posts
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### Authentication Security
- Enable email verification in Authentication > Settings
- Set up password reset functionality
- Consider implementing rate limiting

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key is correct in the `.env` file
   - Ensure the `.env` file is in the project root
   - Restart your development server after changing environment variables

2. **"Firebase: Error (auth/network-request-failed)"**
   - Check your internet connection
   - Verify Firebase project is active
   - Check if your domain is authorized in Firebase Console

3. **"Firebase: Error (auth/too-many-requests)"**
   - This is a rate limiting error
   - Wait a few minutes before trying again
   - Consider implementing exponential backoff

4. **Database permission denied**
   - Check Firestore security rules
   - Ensure user is authenticated
   - Verify user has proper permissions

### Development vs Production

- **Development**: Use test mode for Firestore (allows all reads/writes)
- **Production**: Implement proper security rules
- **Environment Variables**: Use different Firebase projects for dev/prod
- **API Keys**: Restrict API keys to specific domains in production

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks) (optional)

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify Firebase configuration
3. Check network connectivity
4. Review Firebase Console for any service issues
