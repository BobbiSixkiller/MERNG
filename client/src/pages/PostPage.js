import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { Card, Grid, Loader, Image } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id body createdAt username likesCount
            likes {
                username
            }
            commentsCount
            comments {
                id username createdAt body
            }
        }
    }
`;

function PostPage(props) {
    const postId = props.match.params.id;
    const { user } = React.useContext(AuthContext);
    
    const { data, loading } = useQuery(FETCH_POST_QUERY, {
        variables: { postId }
    });

    let postPage;
    if (loading) {
        postPage = <Loader active />
    } else {
        const { id, body, createdAt, username, comments, commentsCount, likes, likesCount } = data.getPost;
        
        postPage = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated='right'
                            size='small'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{new Date(createdAt).toLocaleDateString()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton user={user} post={{ id, comments, commentsCount, likes, likesCount }} />
                        </Card.Content>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return(
        postPage
    );
}

export default PostPage;