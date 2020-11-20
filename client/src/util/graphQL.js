import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
{
    getPosts {
        id body createdAt username likesCount
        likes {
            id username
        }
        commentsCount
        comments {
            id username createdAt body
        }
    }
}
`;