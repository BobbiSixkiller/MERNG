import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Form, Message } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphQL';

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

    const [errors, setErrors] = React.useState(null);

    const { handleSubmit, handleChange, values } = useForm(addPost, INITIAL_STATE);

    const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
        update(proxy, result) {
            console.log(result);

            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            console.log(data);

            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
                getPosts: [result.data.createPost, ...data.getPosts]
            }});

            values.body = '';
        },
        onError(err) {
            console.log(err);
            setErrors(err.graphQLErrors[0].message);
        },
        variables: values
    });

    function addPost(params) {
        createPost();
    }
    return(
        <>
            <Form onSubmit={handleSubmit} noValidate className={loading ? "loading" : ""}>
                <h2>Add Post</h2>
                <Form.Input 
                    placeholder="Type your post here..."
                    name="body"
                    onChange={handleChange}
                    value={values.body}
                    error={error ? true : false}
                />
                <Button 
                    type="submit"
                    content="Add Post"
                    color="green"
                />
            </Form>
            {errors && (
                <Message negative>
                    {errors}
                </Message>
            )}
        </>
    );
}

export default PostForm;