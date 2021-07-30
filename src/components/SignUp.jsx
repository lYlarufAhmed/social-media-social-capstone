import React from "react";
import {Link, useHistory} from "react-router-dom";
import AuthWrapper from "./AuthWrapper";
import {useFormik} from 'formik'
import * as yup from 'yup'
import {Box, Input, Text, Link as visualLink, LinkBox} from "@chakra-ui/react";
import CustomInputField from "./CustomInputField";


const validationSchema = yup.object({
    email: yup
        .string('Email')
        .email('Should be a valid email!')
        .required('Email is required'),
    fullName: yup
        .string('Full Name')
        .matches(/([A-Z.]+ ?){2,}/i, {excludeEmptyString: true, message: 'Not a valid Name'})
        .required('Full Name is required!'),
    username: yup
        .string('Username')
        .min(6)
        .max(20)
        .matches(/[\w\d]+/i)
        .required('username is required!'),
    password: yup
        .string('Password')
        .min(6)
        .required('password required!'),
    confirmPassword: yup
        .string('Confirm Password')
        .oneOf([yup.ref('password')], 'Passwords must match!')
        .required('Confirm Password is required!'),

})
const initialValues = {
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
}

export default function SingUp(props) {
    let [error, setError] = React.useState('')
    let [success, setSuccess] = React.useState(false)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialValues,
        onSubmit: async values => {
            setError('')
            setSuccess(false)
            let formData = new FormData()
            for (let [key, value] of Object.entries(values)) {
                formData.append(key, value)
            }
            try {
                let res = await fetch('http://localhost:3131/users/signup', {
                    method: "POST",
                    body: formData
                })
                let parsed = await res.json()
                console.log(parsed)
                if (!parsed.success) setError(parsed.message)
                else setSuccess(true)
            } catch (e) {
                setError('Server not Found!')
            }


        }
    })
    return (
        <AuthWrapper
            header={'Sign Up'}
            Footer={<Text>Already Sign Up?
                <LinkBox as={Link} color={'teal.500'}
                            to={'/login'}> Login</LinkBox></Text>}
            error={error}
            setError={setError}
            success={success}
            setSuccess={setSuccess}
            formik={formik}
            formName={'signUp'}
        >

            <CustomInputField
                placeholder={'Full Name'}
                id={'fullName'}
                name={'fullName'}
                value={formik.values.fullName}
                handleChange={formik.handleChange}
                error={formik.errors.fullName}
                touched={formik.touched.fullName}
                size={'sm'}
            />
            <CustomInputField
                placeholder={'Email'}
                id={'email'}
                name={'email'}
                value={formik.values.email}
                handleChange={formik.handleChange}
                error={formik.errors.email}
                touched={formik.touched.email}
                size={'sm'}
            />
            <CustomInputField
                placeholder={'Username'}
                id={'username'}
                name={'username'}
                value={formik.values.username}
                handleChange={formik.handleChange}
                error={formik.errors.username}
                touched={formik.touched.username}
                size={'sm'}
            /><CustomInputField
            placeholder={'Password'}
            id={'password'}
            name={'password'}
            type={'password'}
            value={formik.values.password}
            handleChange={formik.handleChange}
            error={formik.errors.password}
            touched={formik.touched.password}
            size={'sm'}
        /><CustomInputField
            placeholder={'Confirm Password'}
            id={'confirmPassword'}
            name={'confirmPassword'}
            type={'password'}
            value={formik.values.confirmPassword}
            handleChange={formik.handleChange}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            size={'sm'}
        />

            <Box>
                <Input
                    accept="image/*"
                    // className={classes.input}
                    // style={{display: 'none'}}
                    id={'avatar'}
                    onInput={(event) => {
                        formik.setFieldValue('avatar', event.target.files[0])
                    }}
                    variant={'filled'}
                    type="file"
                    name={'avatar'}
                />
            </Box>
        </AuthWrapper>
    )
}