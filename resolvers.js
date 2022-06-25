const Post = require('./models/Post.model');

const resolvers = {
    Query: {
        hello: () => {
            return "Hello World";
        },
        getAllPosts: async () => {
            try {
                const posts = await Post.find({});
                return posts;
            } catch (ex) {
                console.log('___ ex', ex);
            }
        },

        getPost: async (_parent, args, _context, _info) => {
            const { id } = args;
            return await Post.findById(id)
        }
    },

    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post;
            const post = new Post({ title, description });
            await post.save();
            return post;
        },
        deletePost: async (parent, args, context, info) => {
            const { id } = args;
            await Post.findByIdAndDelete(id);
            return "Post has been deleted Successfully"
        },
        updatePost: async (parent, args, context, info) => {
            const { id } = args;
            const { title, description } = args.post;
            const updates = {};
            if(title !== undefined){
                updates.title = title;
            }
            if(description !== undefined){
                updates.description = description;
            }
            const post = await Post.findByIdAndUpdate(id, updates, { new: true })
            return post;
        }
    }
}

module.exports = {
    resolvers
}