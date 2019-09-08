import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDRVfCJPU8orLbLrYP2B7EZvcXCHQJlWzg",
    authDomain: "crwn-db-15b3c.firebaseapp.com",
    databaseURL: "https://crwn-db-15b3c.firebaseio.com",
    projectId: "crwn-db-15b3c",
    storageBucket: "",
    messagingSenderId: "227817607458",
    appId: "1:227817607458:web:89ec7d8d5ecc3e2d"
  };

  export const createUserProfileDocument = async (userAuth, addAdditionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
          await userRef.set({
              displayName,
              email,
              createdAt,
              ...addAdditionalData
          })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;