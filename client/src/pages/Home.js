import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home() {
    const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);
    
    return(
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>loading...</h1>
                ) : (
                    posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
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

export default Home;