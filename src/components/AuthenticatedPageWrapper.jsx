import {Divider, Flex} from "@chakra-ui/react";
import TopNav from "./TopNav";

export default function AuthenticatedPageWrapper(props) {
    return (
        <Flex direction={'column'} height={'100vw'} width={'100%'} paddingX={4}>
            <TopNav/>
            <Divider/>
            {props.children}
        </Flex>
    )
}