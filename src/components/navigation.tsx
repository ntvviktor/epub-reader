import {useContext} from "react";
import {Box, Button, Flex, Stack, useColorMode, useColorModeValue,} from "@chakra-ui/react";
import Logo from "public/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import {UserContext} from "@/lib/context";
import {useRouter} from "next/router";
import {auth} from "@/lib/firebase";
import {signOut} from "firebase/auth";
import { SignOutButton } from "./enter";
export default function Navigation() {
    const {colorMode, toggleColorMode} = useColorMode();
    const {user} = useContext(UserContext);

    const router = useRouter();

    const logOut = () => {
        signOut(auth);
        router.reload();
    };

    return (
    <Box
        w={"full"}
        position={"fixed"}
        zIndex={3}
        top={0}
        bg={useColorModeValue("orange.50", "gray.900")}
        px={[6, 8, 14]}
        borderBottom={"2px"}
        borderBottomColor={"gray.600"}
    >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Link href="/">
                <Box>
                    <Image src={Logo} width={70} alt="HomePage"/>
                </Box>
            </Link>
            <Flex alignItems={"center"}>
                <Stack direction={"row"} spacing={7}>
                    {/* <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <FaMoon/> : <ImSun/>}
                    </Button> */}

                    {user && 
                      <SignOutButton/> }

                </Stack>
            </Flex>
        </Flex>
    </Box>
    );
}
