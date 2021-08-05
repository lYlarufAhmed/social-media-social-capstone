import React from "react";
import {Flex, IconButton, Text} from "@chakra-ui/react";
import {NotAllowedIcon, PlusSquareIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import axios from "axios";
import {setError} from "../redux/actions";
import {Link} from "react-router-dom";

export default function ProfileCard({username, followers, isFollowing}) {
    const [loading, setLoading] = React.useState(false)
    const [followersCount, setFollowersCount] = React.useState(followers)
    const [following, setFollowing] = React.useState(isFollowing)
    const currUsername = useSelector(state => state.user.username)
    const handleFollow = async () => {
        setLoading(true)
        try {
            let res = await axios.patch('/users', {
                payload: {
                    followerUsername: currUsername,
                    followedUsername: username
                }, action: following ? 'unfollow' : 'follow'
            })
            if (res.data.success) {
                setFollowing(prevState => !prevState)
                setFollowersCount(prevState => following ? prevState - 1 : prevState + 1)
            }

        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <Flex direction={'column'} height={'min-content'} p={4} border={'1px solid'} flexBasis={'40%'}>
            <Link to={`/profile/${username}`}>
                <Text color={"blue"} fontSize={'lg'}>@{username}</Text>
            </Link>
            <Text fontSize={'sm'}>{followersCount} Followers</Text>
            <IconButton aria-label={'follow-button'} isLoading={loading} colorScheme={'blue'}
                        varant={following ? 'ghost' : 'solid'}
                        icon={following ? <NotAllowedIcon/> : <PlusSquareIcon/>} m={3} onClick={handleFollow}/>
        </Flex>
    )
}