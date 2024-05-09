import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase/config";

const useFetchDocument=(collectionName,id)=>{

    const [selectedData,setSelectedData]=useState({});
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');
    useEffect(()=>{
        const getData=async()=>{
            const docRef=doc(db,collectionName,id);
            const docSnap=await getDoc(docRef);
            if(docSnap.exists()){
                setSelectedData(docSnap.data());
                setLoading(false);
                setError('');
            }
            else{
                setSelectedData({});
                setLoading(false);
                setError('No Such Data Found');
            }
        }
        getData();
    },[collectionName,id]);

    return {selectedData,loading,error};
}

export default useFetchDocument;