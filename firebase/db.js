import { getFirestore, collection, addDoc, doc, setDoc, getDocs, query, where } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
import app from "./firebase-config";

const db = getFirestore(app);

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

export async function firebaseGetCuisines(county) {
  const collectionRef = collection(db, "recipesByCountry")

  const qData = []

  const q = query(collectionRef, where("country", "==", county))

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    let data = {
      "id": doc.id,
      "data": doc.data()
    }
    qData.push(data)
  });

  return qData
}