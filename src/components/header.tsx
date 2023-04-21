import {TfiMenuAlt} from "react-icons/tfi";
import {Button, Icon} from "@chakra-ui/react";

const Header = ({onNavToggle}: Props) => {
    return (
        <Button
            ml={[5, 6, 16]}
            // mt={"3"}
            mb={4}
            zIndex={2}
            position={"absolute"}
            variant={"ghost"}
            onClick={() => onNavToggle()}
            _hover={{bgColor: "blackAlpha.300"}}
        >
            <Icon boxSize={6} as={TfiMenuAlt}/>
        </Button>
    );
};

interface Props {
    onNavToggle: (value?: boolean) => void;
}

export default Header;
