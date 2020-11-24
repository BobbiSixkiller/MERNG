import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Image } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

function PostCard(props) {
    const { user } = React.useContext(AuthContext);
    const { body, createdAt, id, username, likesCount, likes, commentsCount } = props.post;

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
            <LikeButton user={user} post={{ id, likesCount, likes }} />
            <Button
                onClick={() => console.log("KOMENTUJ")}
                basic
                color='blue'
                icon='comments'
                label={{ basic: true, color: 'blue', pointing: 'left', content: `${commentsCount}` }}
                as={Link}
                to={`/posts/${id}`}
            />
            {user && user.username === username && (<DeleteButton postId={id} />)}
        </Card.Content>
        </Card>
    );
}

export default PostCard;