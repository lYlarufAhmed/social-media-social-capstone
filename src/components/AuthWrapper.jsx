import React from "react";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button, CloseButton,
    Flex,
    Heading,
} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

export default function AuthWrapper({
                                        header,
                                        children,
                                        Footer,
                                        error,
                                        formik,
                                        setError,
                                        success,
                                        setSuccess,
                                        formName
                                    }) {
    const closeAlert = () => {
        setError('')
        setSuccess(false)
    }

    const history = useHistory()
    React.useEffect(() => {
        let timerId
        timerId = setTimeout(() => {
            setError('')
            setSuccess(false)
            if (success) {
                // if (formName === 'login') history.push('/')
                if (formName !== 'login') history.push('/login')
            }
        }, 1000)
        return () => clearTimeout(timerId)

    }, [formName, history, setError, setSuccess, success])
    return (
        <Flex direction={"column"} justifyContent={'center'} height={'100vh'} alignItems={'center'}>
            {(error || success) && (
                <Alert status={success ? 'success' : 'error'}>
                    <AlertIcon/>
                    <AlertTitle mr={2}>{formName === 'login' ? 'Login' : 'Sign Up'}</AlertTitle>
                    <AlertDescription>{error ? `Error: ${error}` : 'Success'} {formName === 'signUp' && success && 'Please log in!'}</AlertDescription>
                    <CloseButton onClick={closeAlert} position="absolute" right="8px" top="8px"/>
                </Alert>
            )}

            {/*{error}*/}
            <Heading mb={'1'}>Programming Pair</Heading>
            <form onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit()
            }}>

                <Flex direction={'column'} border={'1px'} padding={3} style={{gap: '.4rem'}} borderRadius={6}>
                    <Heading>
                        {header}
                    </Heading>
                    {children}
                    <Button colorScheme={'teal'}
                            type={'submit'}
                    >Submit</Button>
                </Flex>
            </form>
            <Box>
                {Footer}
            </Box>

        </Flex>
    )
}