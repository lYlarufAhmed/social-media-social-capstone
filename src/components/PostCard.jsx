import React from 'react'
import {Flex, Heading, IconButton, Text} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {setError} from "../redux/actions";
import axios from "axios";
import {TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";

export default function PostCard({
                                     content, _id, like, liked, author, createdAt
                                     // , handleLike, handleDislike
                                 }) {
    const [fav, setFav] = React.useState(liked)
    const [favCount, setFavCount] = React.useState(like.length)
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const handleClick = async () => {
        setLoading(true)
        try {
            let response = await axios.patch('/posts/' + _id, {action: fav ? 'dislike' : 'like'})
            console.log(response.data)
            if (response.data.success) {
                setFav(prevState => !prevState)
                setFavCount(prevState => fav ? prevState - 1 : prevState + 1)
            }
        } catch (e) {
            dispatch(setError(e.message))
        }
        setLoading(false)
    }
    return (
        <Flex direction={'column'} height={'min-content'} p={4} border={'1px solid grey'} mb={2} width={'15rem'}>
            <Link to={`/profile/${author.username}`}>

                <Text color={"blue"}>@{author.username}</Text>
            </Link>
            <Heading variant={'h5'} fontSize={'sm'} mb={4}>{content}</Heading>
            <Text colorScheme={"grey"} fontSize={'xs'}>Posted
                on: {new Date(createdAt).toLocaleDateString()}, {new Date(createdAt).toLocaleTimeString()}</Text>
            <Text fontSize={'xs'} mb={2}>Likes: {favCount}</Text>
            <IconButton variant={fav ? 'solid' : 'ghost'} size={'xs'} isActive={fav} colorScheme={'teal'}
                        icon={fav ?
                            <TriangleDownIcon/> : <TriangleUpIcon/>} isLoading={loading}
                        onClick={handleClick} aria-label={fav ? 'like-button' : 'dislike-button'}/>

        </Flex>
    )
}