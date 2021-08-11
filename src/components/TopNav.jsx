import {Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import logOut from "../redux/actions";
import {Link} from "react-router-dom";
import axios from "axios";

export default function TopNav(props) {
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.username)
    const logout = async () => {

        const res = await axios.post('/users/logout', {username: username})
        console.log(res.status)
        dispatch(logOut())

    }
    return (
        <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}
              height={'min-content'}>
            <Heading variant={'h4'} fontSize={'lg'} paddingY={4} mb={3}>
                <Link to={'/feeds'}>Programming Pair</Link></Heading>
            <Flex width={'20%'}>
                <Link to={`/profile/${username}`}>
                    <Button p={4} colorScheme={'blue'}>Profile</Button>
                </Link>
                <Spacer/>
                <Button p={4} colorScheme={'red'} onClick={logout}>Logout</Button>
            </Flex>
        </Flex>
    )
}