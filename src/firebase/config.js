import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBr8PvyMsSvK5QRfAYcijDV8qLO3cNW9WU",
  authDomain: "your-auth-domain-b1234.firebaseapp.com",
  databaseURL: "https://your-database-name.firebaseio.com",
  projectId: "blood-share-5ec57",
  storageBucket: "blood-share-5ec57.appspot.com",
  messagingSenderId: "137964771597",
  appId: "1:137964771597:android:09b66a23043975079d3844",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
