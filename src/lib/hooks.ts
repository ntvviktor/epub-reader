import {doc, onSnapshot} from "firebase/firestore";
import {auth, firestore} from "../lib/firebase";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            const userRef = doc(firestore, "users", user.uid);
            unsubscribe = onSnapshot(userRef, (doc) => {
                setUsername(doc.data()?.username);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);
    return {user, username};
}
