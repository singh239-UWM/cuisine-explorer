import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();

export async function firebaseStoreNewUser(values, uid) {
  // console.log(data)
  // collection('users').doc(user).set(data)
  //   .then((result) => {
  //     console.log("done adding")
  // //   })
  // const collectionRef = collection(db, 'users')

  // const path = "/users/" + uid

  console.log(uid)
  const data = {
    UID: uid,
    name: values.firstName + " " + values.lastName,
    DOB: values.day + "/" + values.month + "/" + values.year
  }
  try {
    const userDocRef = collection(db, "/users")
    await addDoc(userDocRef, data)
  } catch (e) {
    console.log("Error adding document: ", e);
  }
}