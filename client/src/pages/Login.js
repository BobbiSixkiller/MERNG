import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import { useForm } from '../util/hooks';

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
            }
        ) {
            id email username createdAt token
        }
    }
`;

function Login(props) {
    const initialState = {
        username: "",
        password: ""
    };

    const { handleChange, handleSubmit, values } = useForm(login, initialState)

    const [errors, setErrors] = React.useState({});

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            console.log(result);
            props.history.push("/");
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function login() {
        loginUser();
    }

    return(
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
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
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                />
                <Button 
                    primary
                    type="submit"
                    content="Login"
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

export default Login;