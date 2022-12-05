import React, { useEffect, useState } from 'react'
import { onAuthStateChanged,onA } from "firebase/auth";

import { auth } from "../firebase.config";

import { toast } from "react-toastify";
const useAuth = () => {
    const [currentUser,setCurrentUser]=useState({})
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        });
    })
    return {
      currentUser,
  }
}

export default useAuth