import { collection, getDocs } from "firebase/firestore";
import {db} from './../firebase';

import supabase from "./../supabase"; // centralized client


async function getProjectsData() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const { data, error } = await supabase.storage
  .from("projects-images")
  .list();
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    console.log(data, '=>', data);
  });
}

export default getProjectsData();