import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase/config";

const useFetchCollection=(collectionName)=>{
    const [data,setData]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [isError,setIsError]=useState('');
    const getCollection=()=>{
        setIsError('');
        setIsLoading(true);
        try{
            const docRef=collection(db,collectionName);
            const q=query(docRef,orderBy('createdAt','desc'));
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
    useEffect(()=>{
        getCollection()
    },[])

    return {data,isLoading,isError}
}

export default useFetchCollection;