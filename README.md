# DEV@Deakin - Firebase Authentication Implementation

A modern React application with Firebase authentication, featuring user registration, login, and protected routes.

## 🚀 Features

- **User Authentication**: Complete registration and login system
- **Firebase Integration**: Secure authentication with Firestore database
- **Protected Routes**: Access control for authenticated users
- **Real-time State Management**: React Context for authentication state
- **Responsive Design**: Modern UI with Semantic UI components
- **Form Validation**: Comprehensive client-side validation
- **Error Handling**: Robust error handling and user feedback

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Styling**: CSS3, Semantic UI React
- **Backend**: Express.js (for email subscription)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Task-2.1P-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup

#### Option A: Automated Setup Helper
```bash
npm run setup-firebase
```

#### Option B: Manual Setup
1. Follow the detailed instructions in [FIREBASE_SETUP_INSTRUCTIONS.md](./FIREBASE_SETUP_INSTRUCTIONS.md)
2. Create a `.env` file in the project root with your Firebase credentials

### 4. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🔐 Firebase Configuration

### Required Environment Variables
Create a `.env` file in the project root:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### Firebase Services Setup
1. **Authentication**: Enable Email/Password provider
2. **Firestore Database**: Create database in test mode
3. **Security Rules**: Configure appropriate access rules

## 🧪 Testing

Run the comprehensive test plan:
```bash
# Follow the test cases in AUTHENTICATION_TEST_PLAN.md
```

### Quick Test Checklist
- [ ] User registration works
- [ ] User login works
- [ ] Protected routes require authentication
- [ ] Logout functionality works
- [ ] Form validation works
- [ ] Error handling works

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Navigation with auth state
│   ├── Login.js        # Login form
│   ├── SignUp.js       # Registration form
│   ├── NewPost.js      # Protected route example
│   └── ...
├── contexts/           # React Context providers
│   └── AuthContext.js  # Authentication state management
├── firebase/           # Firebase configuration and functions
│   ├── config.js       # Firebase initialization
│   └── auth.js         # Authentication functions
└── App.js             # Main application component
```

## 🔒 Security Features

- **Password Hashing**: SHA-256 hashing for additional security
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Secure error messages without sensitive data
- **Protected Routes**: Authentication-based access control
- **Environment Variables**: Secure credential management

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📚 Documentation

- [Firebase Setup Instructions](./FIREBASE_SETUP_INSTRUCTIONS.md)
- [Authentication Test Plan](./AUTHENTICATION_TEST_PLAN.md)
- [Firebase Documentation](https://firebase.google.com/docs)

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Configuration Errors**
   - Check `.env` file exists and contains correct values
   - Verify all environment variables are prefixed with `REACT_APP_`
   - Restart development server after creating `.env` file

2. **Authentication Not Working**
   - Check Firebase Console > Authentication > Sign-in method
   - Verify Email/Password provider is enabled
   - Check browser console for error messages

3. **Firestore Permission Errors**
   - Verify Firestore security rules are properly configured
   - Check that rules allow authenticated users to read/write their own data

### Getting Help
- Check the browser console for error messages
- Review Firebase Console for configuration issues
- Follow the troubleshooting guide in the test plan

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Firebase for authentication services
- React team for the amazing framework
- Semantic UI for the component library
