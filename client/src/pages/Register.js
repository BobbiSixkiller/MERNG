import React from 'react';
import { useMutation, gql } from '@apollo/client';

import { Form, Button } from 'semantic-ui-react';

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`;

function Register() {
    const [values, setValues] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function handleChange(e) {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables: values
    })

    function handleSubmit(e) {
        e.preventDefault();
        addUser();
    }

    return(
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                    onChange={handleChange} 
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                />
                <Form.Input 
                    onChange={handleChange}
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    value={values.email}
                />
                <Form.Input 
                    onChange={handleChange}
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                />
                <Form.Input 
                    onChange={handleChange}  
                    type="password" 
                    label="Confirm Password"
                    placeholder="Repeat password..."
                    name="confirmPassword"
                    value={values.confirmPassword}
                />
                <Button 
                    primary
                    type="submit"
                    content="Register"
                />
            </Form>
        </div>
    );
}

export default Register;