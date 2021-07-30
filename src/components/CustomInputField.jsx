import {Box, Input, InputGroup, Text} from "@chakra-ui/react";
import React from "react";

export default function CustomInputField({
                                             type,
                                             size,
                                             handleChange,
                                             startElem,
                                             touched,
                                             error,
                                             value,
                                             name,
                                             placeholder
                                         }) {

    return (
        <Box>
            <InputGroup>
                {startElem && startElem}
                {/*<InputLeftElement children={<Avatar src={"https://bit.ly/broken-link"} h={'5'} w={'5'}/>}/>*/}
                <Input
                    placeholder={placeholder}
                    id={name}
                    type={type || 'text'}
                    name={name}
                    variant={'outline'}
                    value={value}
                    onChange={handleChange}
                    isInvalid={touched && Boolean(error)}
                    errorBorderColor="crimson"
                    size={size || 'lg'}
                    // helperText={formik.touched.username && formik.errors.username}
                />

            </InputGroup>
            {touched && error &&
            <Text fontSize={'xs'}
                  color={'red'}>{error}</Text>}
        </Box>
    )
}