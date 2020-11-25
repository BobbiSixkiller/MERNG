import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { Button, Icon, Label } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id username
            }
            likesCount
        }
    }
`;

function LikeButton({user, post: { id, likes, likesCount }}) {
    const [liked, setLiked] = React.useState(false);

    React.useEffect(() => {
        if (user && likes.find(like => user.username === like.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likePost, {error}] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: id
        },
        onError(err) {
            console.log(err);
        }
    });

    const likeButton = user ? (
        liked ? (
            <Button color='red'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button basic color='red'>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" basic color='red'>
            <Icon name='heart' />
        </Button>
    )

    return(
        <MyPopup content={liked ? "Unlike" : "Like"}>
            <Button as='div' labelPosition='right' onClick={likePost}>
                {likeButton}
                <Label basic color='red' pointing='left'>
                    {likesCount}
                </Label>
            </Button>
        </MyPopup>
    );
}

export default LikeButton;