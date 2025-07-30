import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';

// Initialize Firebase Admin SDK with improved error handling
let app;
let db: any;

try {
  if (!getApps().length) {
    // Support both local development and production deployment
    let credential;
    
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Production: Use environment variable (for Vercel)
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      credential = cert(serviceAccount);
    } else {
      // Development: Use local service account file
      const serviceAccountPath = path.join(process.cwd(), 'credentials/serviceAccountKey.json');
      credential = cert(serviceAccountPath);
    }
    
    app = initializeApp({
      credential,
      projectId: process.env.FIREBASE_PROJECT_ID || 'drakorid-3195c'
    });
    
    // Get Firestore instance and configure settings only on first initialization
    db = getFirestore(app);
    db.settings({
      ignoreUndefinedProperties: true,
    });
    
    console.log('Firebase Admin SDK initialized successfully');
  } else {
    app = getApp();
    db = getFirestore(app);
  }
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  throw new Error('Failed to initialize Firebase Admin SDK');
}

// Export the Firestore instance
export { db };

// Export types from schema
export * from './schema';