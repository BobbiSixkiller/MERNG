const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const User = require('../../models/User');
const checkAuth = require('../../util/checkAuth');

module.exports = {
    Query: {
        async getPosts() {
            console.log("VSETKY")
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) { 
                throw new Error(err);
            }
        },
        async getPost(undefined, { postId }) {
            console.log("JEDEN")
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found!');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(undefined, { body }, context) {
            const user = checkAuth(context);

            if (body.trim() === '') throw new UserInputError('Body is empty!');

            const newPost = new Post({ 
                body, 
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString() 
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            });

            return post;
        },
        async deletePost(undefined, { postId }, context) {
            const { username } = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (username === post.username) {
                    await post.remove();
                    return "Post deleted successfully";
                } else {
                    throw new AuthenticationError('Action now allowed!')
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async likePost(undefined, { postId }, context) {
            const { username } = checkAuth(context);

            try {
                const post = await Post.findOne({_id: postId});
                if (post) {
                    const like = post.likes.find(like => like.username === username);
                    if (like) {
                        await like.remove();
                    } else {
                        post.likes.push({
                            username,
                            createdAt: new Date().toISOString()
                        });
                    }
                    await post.save();
                    return post;
                } else throw new UserInputError('Post now found!');
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
}