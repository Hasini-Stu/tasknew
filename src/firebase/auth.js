import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from './config';

const simpleHash = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const hashPassword = async (password) => {
  try {
    return await simpleHash(password);
  } catch (error) {
    console.error('Password hashing error:', error);
    return btoa(password).replace(/[^a-zA-Z0-9]/g, '');
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const hashedInput = await simpleHash(password);
    return hashedInput === hashedPassword;
  } catch (error) {
    console.error('Password verification error:', error);
    const fallbackHash = btoa(password).replace(/[^a-zA-Z0-9]/g, '');
    return fallbackHash === hashedPassword;
  }
};

export const registerUser = async (userData) => {
  try {
    const { firstName, lastName, email, password } = userData;
    
    console.log('Starting user registration for:', email);
    
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.log('User already exists in Firestore:', email);
      return { success: false, error: 'An account with this email already exists' };
    }
    
    const hashedPassword = await hashPassword(password);
    console.log('Password hashed successfully');
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Firebase user created:', user.uid);
    
    const userDocData = {
      firstName,
      lastName,
      email,
      hashedPassword,
      createdAt: new Date(),
      uid: user.uid,
      lastLoginAt: null,
      isActive: true
    };
    
    await setDoc(doc(db, 'users', user.uid), userDocData);
    console.log('User data stored in Firestore:', user.uid);
    
    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      return { success: false, error: 'An account with this email already exists' };
    } else if (error.code === 'auth/invalid-email') {
      return { success: false, error: 'Invalid email format' };
    } else if (error.code === 'auth/weak-password') {
      return { success: false, error: 'Password should be at least 6 characters' };
    } else if (error.code === 'auth/operation-not-allowed') {
      return { success: false, error: 'Email/password authentication is not enabled' };
    } else if (error.code === 'auth/network-request-failed') {
      return { success: false, error: 'Network error. Please check your connection.' };
    }
    
    return { success: false, error: 'Registration failed. Please try again.' };
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log('Starting login for:', email);
    
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('User not found in Firestore:', email);
      return { success: false, error: 'Invalid email or password' };
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    const isPasswordValid = await verifyPassword(password, userData.hashedPassword);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return { success: false, error: 'Invalid email or password' };
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in successfully:', user.uid);
    
    try {
      await setDoc(doc(db, 'users', user.uid), {
        lastLoginAt: new Date()
      }, { merge: true });
      console.log('Last login time updated');
    } catch (updateError) {
      console.warn('Failed to update last login time:', updateError);
    }
    
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.code === 'auth/user-not-found') {
      return { success: false, error: 'Invalid email or password' };
    } else if (error.code === 'auth/wrong-password') {
      return { success: false, error: 'Invalid email or password' };
    } else if (error.code === 'auth/invalid-email') {
      return { success: false, error: 'Invalid email format' };
    } else if (error.code === 'auth/too-many-requests') {
      return { success: false, error: 'Too many failed attempts. Please try again later.' };
    } else if (error.code === 'auth/user-disabled') {
      return { success: false, error: 'This account has been disabled.' };
    } else if (error.code === 'auth/network-request-failed') {
      return { success: false, error: 'Network error. Please check your connection.' };
    }
    
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

export const logoutUser = async () => { //here3
  try {
    console.log('Logging out user');
    await signOut(auth);
    console.log('User logged out successfully');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'User profile not found' };
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: 'Failed to fetch user profile' };
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
