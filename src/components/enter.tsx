import {signInWithPopup, signOut} from "firebase/auth";
import {auth, provider} from "../lib/firebase";
import {Button, Stack} from "@chakra-ui/react";
import {FcGoogle} from "react-icons/fc";
import {FaSignOutAlt} from "react-icons/fa";
import {useContext} from "react";
import {UserContext} from "@/lib/context";
import {useRouter} from "next/router";

export default function Enter(props: any) {
    const {user} = useContext(UserContext);

    return (
        <main>
            {user ? <SignOutButton/> : <SignInButton/>}
        </main>
    );
}

export function SignInButton() {
    const router = useRouter();
    provider.setCustomParameters({
        prompt: "select_account"
    })
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Stack
            direction="row"
            alignItems={"center"}
            alignContent={"center"}
            spacing={4}
        >
            <Button colorScheme="teal" variant={'outline'} leftIcon={<FcGoogle/>} onClick={signInWithGoogle}>
                Sign in with Google
            </Button>
        </Stack>
    );
}

export function SignOutButton() {
    return (
        <Stack
            direction="row"
            alignItems={"center"}
            alignContent={"center"}
            spacing={4}
        >
            <Button
                leftIcon={<FaSignOutAlt/>}
                colorScheme=""
                onClick={() => signOut(auth)}
            >
                Sign Out
            </Button>
            ;
        </Stack>
    );
}

