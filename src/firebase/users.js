import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "./config";

export const addUser = async (user) => {
  try {
    const usersCollection = collection(db, "users");
    const doc = await addDoc(usersCollection, user);

    const result = await getDoc(doc);
    return result.data();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
