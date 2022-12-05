import { async } from '@firebase/util'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'

const UserGetData = (collectionName) => {
    const [loading,setLoading]=useState(true)
    const [data, setData] = useState([])
    const collectionRef = collection(db, collectionName)
    useEffect(() => {
        const getData = async () => {
            //firebase realtime data update
            await onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setLoading(false);
           })
           
            }
        getData()
    },[])
  return{data}
}

export default UserGetData