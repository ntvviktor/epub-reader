import Head from "next/head";
import {useContext, useEffect} from "react";
import {UserContext} from "@/lib/context";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import Upload from "@/components/upload";
import Enter from "@/components/enter";
import Logo from 'public/icons/logo.svg'
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const {user} = useContext(UserContext);
    useEffect(() => {
      try{

        var computedStyle = window.getComputedStyle 
        if (computedStyle == null){
          throw(computedStyle);
        }
      }catch(error){
        console.log(error);
      }
      // window.onpopstate = () =>{
      //   router.reload();  
      // }
    }, []);

    return (
        <>
            <Head>
                <title>WillRead</title>
                <meta name="description" content="Epub Reader"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel='icon' href='/icon.png?v=2'/>
            </Head>
            <main>
                <Box
          display={"flex"}
          gap={["2rem","1.5rem"]}
          flexDirection={"column"}
          w={"100%"}
          h={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box w={100} marginBottom={"-10"}>
            <Image src={Logo}  alt="HomePage" />
          </Box>
          <Text lineHeight={["9", "normal"]} noOfLines={2} align={"center"} fontSize={["3xl", "4xl"]}>
             Welcome to WillRead</Text>
          <Text mt={"-7"} fontSize={['md', 'xl']}>An Epub Reader App</Text>
          {user && <Upload/>}
          {!user && <Enter/>}
        </Box>

            </main>
        </>
    );
}
