import {Box, Text} from "@chakra-ui/react";

const NavItem = ({message, onClick}: Props) => {
    return (
        <Box cursor={'pointer'} _hover={{bgColor: "blackAlpha.100"}} p={"0.5"} borderRadius={'md'} overflowWrap={'break-word'} onClick={onClick}>
            <Text fontWeight={'normal'} overflowWrap={'break-word'} textColor={"blackAlpha.900"}>{message}</Text>
        </Box>
    );
}


interface Props {
    chap: string;
    message: string;
    onClick: () => void;
}

export default NavItem