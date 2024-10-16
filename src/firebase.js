import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAsgi3Gt5EmV_6zErlGnOXYJ2k-nXBHnRc",
    authDomain: "my-portfolio-2cd4d.firebaseapp.com",
    projectId: "my-portfolio-2cd4d",
    databaseURL : "https://my-portfolio-2cd4d-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "my-portfolio-2cd4d.appspot.com",
    messagingSenderId: "255161309712",
    appId: "1:255161309712:web:6c755af18c3e7387f80895",
    measurementId: "G-2G4TF4L273"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

