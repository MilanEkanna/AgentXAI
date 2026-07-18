import { cert, initializeApp } from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" with {type:'json'};

export const app = initializeApp({
  credential: cert(serviceAccount) //cert() converts your service account JSON into a credential Firebase understands.
});

// initializeApp() initializes the Firebase Admin SDK in the backend. The serviceAccountKey.json file contains the service account credentials for the Firebase project. The cert() function converts those credentials into a format the Admin SDK can use, allowing the backend to securely authenticate and perform administrative operations such as verifying users, accessing Firestore, sending push notifications, and managing Firebase resources.