import React from "react";
import AuthenticatedPageWrapper from "./AuthenticatedPageWrapper";
import {useParams} from 'react-router-dom'
import axios from "axios";
import {Avatar, Button, Flex, Heading, Text} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {setError} from "../redux/actions";
import PostCard from "./PostCard";

export default function Profile(props) {
    let [userData, setUserData] = React.useState({posts: [], followings: []})
    let [loading, setLoading] = React.useState(false)
    let [following, setFollowing] = React.useState(false)
    let [followersCount, setFollowersCount] = React.useState(0)
    let {username} = useParams()
    let currUsername = useSelector(state => state.user.username)
    React.useEffect(() => {
        const getProfile = async () => {
            let response = await axios.get('/users/profile/' + username)
            if (response.data.success) {
                setUserData(response.data.result)
                setFollowing(response.data.result.isFollowing)
                setFollowersCount(response.data.result.followers.length)
            }
        }
        getProfile()
    }, [username])
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
        <AuthenticatedPageWrapper>
            <Flex marginTop={2} marginX={4} p={4} direction={'column'}>
                <Flex alignItems={'center'} p={4} border={'1px solid rgba(0,0,0,0.2)'}>
                    <Avatar mr={4} size={'lg'}
                        src={userData.profileImage && 'http://localhost:3131/uploads/auth/' + userData.profileImage}/>
                    <Flex direction={'column'}>
                        <Heading variant={'h5'} fontSize={'lg'} mb={2}>{userData.fullName}</Heading>
                        <Flex alignItems={'center'}
                        ><Text fontSize={'sm'} fontWeight={'bolder'}>@{username}</Text>
                            {currUsername !== username &&
                            <Button
                                aria-label={'follow-button'} isLoading={loading} colorScheme={'blue'}
                                varant={following ? 'ghost' : 'solid'} size={'xs'}
                                m={3} onClick={handleFollow}>{following ? 'Unfollow' : 'Follow'}</Button>}</Flex>
                        <Text>{followersCount} followers {userData.followings.length} following</Text>
                    </Flex>
                </Flex>

                <Flex direction={'column'} mt={4} alignItems={'center'}>

                    <Heading variant={'h5'} fontSize={'lg'} mb={2}>@{userData.username}'s posts</Heading>
                    <Flex direction={'column'}>
                        {userData.posts.map((f) => <PostCard key={f._id}
                                                             {...f}/>)}
                    </Flex>
                </Flex>
            </Flex>
        </AuthenticatedPageWrapper>
    )
}