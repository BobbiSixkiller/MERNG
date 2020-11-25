import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphQL';
import MyPopup from '../util/MyPopup';

const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id 
            comments {
                id username createdAt body
            }
            commentsCount
        }
    }
`;

function DeleteButton({ postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST
    
    const [deleteResource, {loading, error}] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                console.log(data);
                
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: data.getPosts.filter(post => post.id !== postId)
                    }
                });
            }

            if(callback) callback();
        },
        onError(err) {
            console.log(err);
        },
        variables: { postId, commentId }
    });



    return(
        <>  
            <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
                <Button 
                    icon="trash" 
                    color="red" 
                    floated="right" 
                    onClick={() => setConfirmOpen(true)}
                />
            </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => deleteResource()}
            />
        </>
    );
}

export default DeleteButton;