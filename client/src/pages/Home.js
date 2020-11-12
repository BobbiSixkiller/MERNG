import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';

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

function Home() {
    const { user } = React.useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    //specialny syntax ES6 object destructuring - pridanie aliasu extrahovanej object property a jej default value, v pripade ze je prazdna
    //const { loading, data: { getPosts: posts } = { posts: "No posts" }} = useQuery(FETCH_POSTS_QUERY);

    return(
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>loading...</h1>
                ) : (
                    data.getPosts && data.getPosts.map(post => (
                    //posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Home;