
import * as firebase from "firebase";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCqAv_tSOockc7CrGSlTCNlO7pm-b6PFqw",
    authDomain: "labeljoyadmin.firebaseapp.com",
    databaseURL: "https://labeljoyadmin-default-rtdb.firebaseio.com",
    projectId: "labeljoyadmin",
    storageBucket: "labeljoyadmin.appspot.com",
    messagingSenderId: "1023788413319",
    appId: "1:1023788413319:web:a34db21cb90352ee6b6322",
    measurementId: "G-SX8S6F1JN4"
};

firebase.initializeApp(config);
// const db=firebase.database();
export const db = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const firebases =firebase;
//export const auth=firebase.auth();