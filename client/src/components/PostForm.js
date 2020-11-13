import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Form, Message } from 'semantic-ui-react';

import { useForm } from '../util/hooks';

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id body createdAt username commentsCount likesCount 
            likes {
                id username createdAt
            } 
            comments {
                id body createdAt username
            }
        }
    }
`;

function PostForm() {
    const INITIAL_STATE = {
        body: "",
    }

    const [errors, setErrors] = React.useState({});

    const { handleSubmit, handleChange, values } = useForm(addPost, INITIAL_STATE);

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        update(proxy, result) {
            console.log(result);
            values.body = '';
        },
        onError(err) {
            console.log(err);
            setErrors(err);
        },
        variables: values
    });

    function addPost(params) {
        createPost();
    }
    return(
        <Form onSubmit={handleSubmit} noValidate className={loading ? "loading" : ""}>
            <h2>Add Post</h2>
            <Form.Input 
                placeholder="Type your post here..."
                name="body"
                onChange={handleChange}
                value={values.body}
            />
            <Button 
                type="submit"
                content="Add Post"
                color="green"
            />
            {Object.keys(errors).length > 0 && (
                <Message
                    color="red" 
                    compact
                    content={errors}
                />
            )}
        </Form>
    );
}

export default PostForm;