import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { Button, Icon, Label } from 'semantic-ui-react';

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

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: id
        },

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
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='red' pointing='left'>
                {likesCount}
            </Label>
        </Button>
    );
}

export default LikeButton;