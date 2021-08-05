import React from "react";
import AuthWrapper from "./AuthWrapper";
import {Link} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import {Avatar, InputLeftElement, LinkBox, Text} from "@chakra-ui/react";
import {LockIcon} from "@chakra-ui/icons";
import CustomInputField from "./CustomInputField";

const validationSchema = yup.object({
    username: yup
        .string('Username')
        .required('username is required!'),
    password: yup
        .string('Password')
        .required('password required!'),

})
const initialValues = {
    username: '',
    password: '',
}
export default function Login({login}) {
    let [error, setError] = React.useState('')
    let [success, setSuccess] = React.useState(false)
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async values => {
            setError('')
            setSuccess(false)
            try {
                let res = await fetch('http://localhost:3131/users/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                let resJson = await res.json()
                if (!resJson.success) setError(resJson.message)
                else {
                    setSuccess(true)
                    localStorage.setItem('programming-pair-refreshToken', resJson.refreshToken)
                    localStorage.setItem('programming-pair-accessToken', resJson.accessToken)
                    // dispatch(setUsername(resJson.username))
                    login(resJson.username)
                }
            } catch (e) {
                setError('Server not found')
            }


        }
    })
    return (
        <AuthWrapper
            header={'Login'}
            Footer={<Text>Don't have a account? <LinkBox as={Link} color={'teal.500'}
                                                         to={'/sign_up'}>SignUp</LinkBox></Text>}
            error={error}
            formik={formik}
            setError={setError}
            success={success}
            setSuccess={setSuccess}
            formName={'login'}
        >
            <CustomInputField type={'text'} handleChange={formik.handleChange}
                              startElem={<InputLeftElement
                                  children={<Avatar src={"https://bit.ly/broken-link"} h={'5'} w={'5'}/>}/>}
                              touched={formik.touched.username} name={'username'} placeholder={'Username'}
                              error={formik.errors.username}
                              value={formik.values.username}
            />
            <CustomInputField type={'password'} handleChange={formik.handleChange}
                              startElem={<InputLeftElement
                                  children={<LockIcon/>}/>}
                              touched={formik.touched.password} name={'password'} placeholder={'Password'}
                              error={formik.errors.password}
                              value={formik.values.password}
            />
        </AuthWrapper>
    )
}