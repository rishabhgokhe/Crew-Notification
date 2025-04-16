import { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function fetchData(collectionName) {
  const [firebaseData, setFirebaseData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFirebaseData(data);
    } catch (error) {
      console.error("Error fetching Firebase data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { firebaseData, loading };
}