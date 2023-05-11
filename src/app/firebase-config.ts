import firebase from "firebase/app";
import "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "auth-domain",
  projectId: "project-id",
  // Add other necessary config properties
};

// Initialize Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firestore instance
export const db = firebase.firestore();
