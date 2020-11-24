import React from 'react';
import { useQuery } from '@apollo/client';

import { Grid, Transition, Loader } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphQL';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

function Home() {
    const { user } = React.useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    //specialny syntax ES6 object destructuring - pridanie aliasu extrahovanej object property a jej default value, v pripade ze je prazdna
    //const { loading, data: { getPosts: posts } = { posts: "No posts" }} = useQuery(FETCH_POSTS_QUERY);

    return(
        <Grid columns={3}>
            <a href="mailto:name@email.com, name2@email.sk">emaily</a>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column style={{ marginBottom: 20 }}>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <Loader active/>
                ) : (
                    <Transition.Group>
                        {data.getPosts && data.getPosts.map(post => (
                        //posts && posts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Home;