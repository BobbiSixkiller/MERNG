import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

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

function Register(props) {
    const context = React.useContext(AuthContext);
    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const { handleSubmit, handleChange, values } = useForm(register, initialState);

    const [errors, setErrors] = React.useState({});

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result.data.register);
            context.login(result.data.register);
            props.history.push("/");
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function register() {
        addUser();
    }

    return(
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    onChange={handleChange} 
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false}
                />
                <Form.Input 
                    onChange={handleChange}
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false}
                />
                <Form.Input 
                    onChange={handleChange}
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                />
                <Form.Input 
                    onChange={handleChange}  
                    type="password" 
                    label="Confirm Password"
                    placeholder="Repeat password..."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                />
                <Button 
                    primary
                    type="submit"
                    content="Register"
                />
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Register;