import { collection, getDocs } from "firebase/firestore";
import {db} from './../firebase';

import supabase from "./../supabase"; // centralized client


async function getProjectsData() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  
  return querySnapshot;
}

export default getProjectsData();