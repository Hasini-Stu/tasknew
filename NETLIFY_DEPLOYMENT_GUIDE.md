# Netlify Deployment Guide for Dev@Deakin App

## Prerequisites
1. A Netlify account (free at netlify.com)
2. Your Firebase project configured
3. Your app built and ready for deployment

## Step 1: Environment Variables Setup
Before deploying, you need to set up your Firebase environment variables in Netlify:

1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings > Environment variables
4. Add the following variables:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Step 2: Build Settings
The app is configured with:
- Build command: `npm run build`
- Publish directory: `build`
- Node version: 18

## Step 3: Deployment Methods

### Method 1: Drag and Drop (Recommended for first deployment)
1. Run `npm run build` locally
2. Drag the `build` folder to Netlify's deploy area

### Method 2: Git Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Netlify will automatically deploy on every push

## Step 4: Domain Configuration
1. Netlify will provide a random subdomain (e.g., `amazing-app-123456.netlify.app`)
2. You can customize this in Site settings > Site details
3. You can also add a custom domain if you have one

## Important Notes
- The `_redirects` file ensures React Router works properly
- Environment variables must be set in Netlify dashboard
- Firebase configuration is already set up to use environment variables
- The app includes sign-out functionality on the login page

## Troubleshooting
- If the app doesn't load, check that all environment variables are set
- If routing doesn't work, ensure the `_redirects` file is in the `public` folder
- Check the Netlify build logs for any errors
