import React from 'react'
import {CloseButton, Flex, Slide, Text, VStack} from '@chakra-ui/react'

const SideMenu = ({title, show, onClose, children}: Props, ref: any) => {
    return (
        <Slide direction='left' in={show} style={{zIndex: 20}}>
            <VStack position={"absolute"}
                    overflow={'scroll'}
                    top={16}
                    pb={10}
                    h={"full"}
                    bgColor={'#AEDFEE'}
                    px={4}
                    ref={ref}
                    align={"flex-start"}
                    maxW={"md"}
            >
                <Flex my={3} px={3} w={"full"} justifyContent={"end"}>
                    <CloseButton onClick={onClose}/>
                </Flex>
                <Flex w={"full"} justifyContent={"center"}>
                    <Text>{title}</Text>
                </Flex>
                {children}
            </VStack>
        </Slide>
    )
}

interface Props {
    title: string;
    show: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export default React.forwardRef(SideMenu)