import React from "react";
import {withRouter} from 'react-router-dom'
import axios from "axios";
import {AddIcon} from "@chakra-ui/icons";
import {
    IconButton, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, Button, Textarea, Flex, Heading, Spinner,
} from "@chakra-ui/react";
import PostCard from "./PostCard";
import ProfileCard from "./ProfileCard";
import {useDispatch, useSelector} from "react-redux";
import {getSuggestions, setPosts} from "../redux/actions";
import AuthenticatedPageWrapper from "./AuthenticatedPageWrapper";

function Feeds(props) {
    let [postLoading, setPostLoading] = React.useState(false)
    let [suggestionLoading, setSuggestionLoading] = React.useState(false)
    let feeds = useSelector(state => state.user.feeds)
    let suggestions = useSelector(state => state.user.suggestions)
    let dispatch = useDispatch()
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        setPostLoading(true)
        dispatch(setPosts()).finally(() => {
            setPostLoading(false)
        })
        setSuggestionLoading(true)
        dispatch(getSuggestions()).finally(() => {
            setSuggestionLoading(false)
        })
    }, [dispatch])
    const createPost = async (data) => {
        let dataObj = {content: data}
        await axios.post('/posts', dataObj)
        dataObj.like = []
        dataObj.liked = false
        dispatch(setPosts())
    }

    return (

        <AuthenticatedPageWrapper>
            <Flex
                height={'100%'}
            >
                <Flex direction={'column'}
                      alignItems={'center'}
                      grow={1}
                    //   justifyContent={'space-evenly'}
                >
                    <Heading variant={'h5'} mb={3}>Feeds</Heading>
                    {postLoading ? <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    /> : feeds.map((f, i) => <PostCard key={f._id}
                                                       {...f}
                    />)}

                </Flex>

                <Flex direction={'column'} backgroundColor={'blackAlpha.50'} overflowY={'scroll'} padding={'.6rem'}
                      flexBasis={'35%'}
                      alignItems={'center'} height={'max-content'}>
                    <Heading variant={'h5'} mb={3}>Suggestions</Heading>
                    <Flex flexWrap={'wrap'} justifyContent={'space-evenly'} width={'100%'}>
                        {suggestionLoading ? <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        /> : suggestions.map(s => <ProfileCard key={s.username} {...s}/>)}
                    </Flex>
                </Flex>
                <IconButton flexGrow={0} aria-label="Create Post"
                            style={{position: 'sticky', alignSelf: 'flex-end', bottom: '0'}}
                            icon={<AddIcon/>} onClick={() => setIsOpen(true)} colorScheme={'blue'}/>
            </Flex>

            <AlertDialogExample open={isOpen} setOpen={setIsOpen} createPost={createPost}/>
        </AuthenticatedPageWrapper>

    )
}


function AlertDialogExample({open, setOpen, createPost}) {
    const onClose = () => setOpen(false)
    const cancelRef = React.useRef()
    const textAreaRef = React.useRef()
    const onCreate = async () => {
        let content = textAreaRef.current.value
        if (content)
            await createPost(content)
        onClose()
    }


    return (
        <>

            <AlertDialog
                isOpen={open}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Create New Post
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Textarea ref={textAreaRef}>

                            </Textarea>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" onClick={onCreate} ml={3}>
                                Create
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default withRouter(Feeds)