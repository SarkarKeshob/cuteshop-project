import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase/config";

const useFetchCollection=(collectionName)=>{
    const [data,setData]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [isError,setIsError]=useState('');
    
    useEffect(()=>{
        const getCollection=()=>{
            setIsError('');
            try{
                const docRef=collection(db,collectionName);
                const q= query(docRef,orderBy('createdAt','desc'));
                onSnapshot(q,(snapshot)=>{
                    const allData=snapshot.docs.map(doc=>({
                        id:doc.id,
                        ...doc.data()
                    }));
                    setData(allData);
                    setIsLoading(false);
                })
            }
            catch{
                setIsLoading(false);
                setIsError('Something went wrong!!!!');
            }
    
        }
        getCollection()
    },[collectionName])

    return {data,isLoading,isError}
}

export default useFetchCollection;