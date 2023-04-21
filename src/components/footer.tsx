import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Center, Flex, Icon, Spacer, Square, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";

const Footer = ({ title, onPageMove }: Props) => {
  const bookTitle = useSelector<RootState, String>(
    (state) => state.book.book.title
  );

  return (
    <Flex
      bottom={"0.5rem"}
      position={"fixed"}
      left={"50%"}
      transform={"translateX(-50%)"}
      alignItems={"center"}
      mt={4}
      zIndex={10}
    >
      <Spacer />
      <Flex
        bgColor={"#DBC29E"}
        border={"1px"}
        borderColor={"gray.500"}
        borderRadius={"xl"}
      >
        <Center
          as={"button"}
          _hover={{ bgColor: "blackAlpha.20" }}
          borderLeftRadius={"xl"}
          w={24}
          h={"16"}
          onClick={() => onPageMove("PREV")}
        >
          <Square p={[2, 3, 4]}>
            <Icon boxSize={"1.5rem"} as={FaArrowLeft} />
          </Square>
        </Center>
        <Spacer />
        <Center maxW={"xl"} h={"16"}>
          <Text noOfLines={[1, 2]} align={"center"}  fontSize={"lg"}>{title || bookTitle}</Text>
        </Center>
        <Spacer />
        <Center
          as={"button"}
          _hover={{ bgColor: "blackAlpha.200" }}
          borderRightRadius={"xl"}
          w={24}
          h={"16"}
          onClick={() => onPageMove("NEXT")}
        >
          <Square p={[2, 3, 4]}>
            <Icon boxSize={"1.5rem"} as={FaArrowRight} />
          </Square>
        </Center>
      </Flex>
      <Spacer />
    </Flex>
  );
};

interface Props {
  title: string;
  nowPage?: number | null;
  totalPage?: number | null;
  onPageMove: (type: "PREV" | "NEXT") => void;
}

export default Footer;
