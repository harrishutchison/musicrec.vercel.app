import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDCYrzvV5sry0Pc_5aqSvkjLYLVbhy0Cuo',
  authDomain: 'music-recommendation-52657.firebaseapp.com',
  databaseURL: 'https://music-recommendation-52657.firebaseio.com',
  projectId: 'music-recommendation-52657',
  storageBucket: 'music-recommendation-52657.appspot.com',
  messagingSenderId: '990600744072',
  appId: '1:990600744072:web:d161548e64a5a19ce2a33d',
  measurementId: 'G-GPBHP6VSNJ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
