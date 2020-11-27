import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Card, Grid, Loader, Icon, Image, Form, Button, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

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

const CREATE_COMMENT = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id body createdAt username
            }
            commentsCount
        }
    }
`;

function PostPage(props) {
    const postId = props.match.params.id;
    const { user } = React.useContext(AuthContext);
    const commentInputRef = React.useRef(null);

    const [comment, setComment] = React.useState("");
    
    const { data, loading } = useQuery(FETCH_POST_QUERY, {
        variables: { postId }
    });

    function deletePostCallback() {
        props.history.push('/');
    }

    const [addComment] = useMutation(CREATE_COMMENT, {
        update() {
            setComment("");
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        },
        onError(err) {
            console.log(err);
        }
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
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{new Date(createdAt).toLocaleDateString()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, comments, commentsCount, likes, likesCount }} />
                                <MyPopup content="Number of comments">
                                    <Button 
                                        as="div"
                                        labelPosition="right"
                                        onClick={() => console.log("KOMENTUJ!")}
                                    >
                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label basic color="blue" pointing="left">
                                            {commentsCount}
                                        </Label>
                                    </Button>
                                </MyPopup>
                                {user && user.username === username && (<DeleteButton postId={id} callback={deletePostCallback} />)}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment!</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input  
                                                type="text"
                                                placeholder="Comment.."
                                                name="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <Button type="submit" className="ui " disabled={comment.trim() === ""} onClick={addComment}>Submit</Button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (<DeleteButton postId={id} commentId={comment.id} />)}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{new Date(comment.createdAt).toLocaleDateString()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))} 
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