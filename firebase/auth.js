import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth"
import app from "./firebase-config";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export async function firebaseSignUp(values) {
  try {
    let userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
      return userCredential.user.uid   
  } catch (error) {
    console.log(error)
    return null
  }
  //   let 
  //     .then((userCredential) => {
  //         uid = userCredential.user.uid;
  //     })
  //     .catch((error) => {
  //       // const errorCode = error.code;
  //       // const errorMessage = error.message;
  //       uid = null;
  //     })
}

export async function firebaseLogIn(values) {
  try {
    let user = await signInWithEmailAndPassword(auth, values.email, values.password)
    console.log(typeof(user.user.uid))
    return user.user.uid
  } catch (error) {
    return error
  }
}

export default auth


