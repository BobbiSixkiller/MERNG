const { UserInputError, AuthenticationError } = require('apollo-server')

const Post = require('../../models/Post');

const checkAuth = require('../../util/checkAuth');

module.exports = {
    Mutation: {
        createComment: async (undefined, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if (body.trim() === "") {
                throw new UserInputError('Empty comment', {
                    //posielam errors object ako payload koli frontendu
                    errors: {
                        body: "Comment body is empty!"
                    }
                });
            }

            const post = await Post.findOne({_id: postId});
            console.log(post);
            if (post) {
                post.comments.unshift({
                    body, 
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },
        async deleteComment(undefined, { postId, commentId }, context) {
            const { username } = checkAuth(context);

            const post = await Post.findOne({_id: postId});
            if (post) {
                const comment = await post.comments.id(commentId);
                if (comment) {
                    if (comment.username === username) {
                        await comment.remove();
                        await post.save();
                    return post;
                    } else throw new AuthenticationError('Action not allowed!');
                }  else  throw new UserInputError('Comment not found!');    
            } else throw new UserInputError('Post not found!');
        }
    }
}