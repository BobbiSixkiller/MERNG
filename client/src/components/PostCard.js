import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Image } from 'semantic-ui-react';

function PostCard(props) {
    const { body, createdAt, id, username, likesCount, commentsCount, likes } = props.post;

    function likePost() {
        console.log('LAJKUJ !');
    }

    function commentPost() {
        console.log('KOMENTUJ !');
    }

    return(
        <Card fluid>
        <Card.Content>
            <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>{new Date(createdAt).toLocaleDateString()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button
                onClick={likePost}
                basic
                color='red'
                // content='Like'
                icon='heart'
                label={{ basic: true, color: 'red', pointing: 'left', content: `${likesCount}` }}
            />
            <Button
                onClick={commentPost}
                basic
                color='blue'
                // content='Like'
                icon='comments'
                label={{ basic: true, color: 'blue', pointing: 'left', content: `${commentsCount}` }}
            />
        </Card.Content>
        </Card>
    );
}

export default PostCard;