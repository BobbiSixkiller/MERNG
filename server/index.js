const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(process.env.DB_DEV_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected!");
        return server.listen({ port: process.env.PORT});
    })
    .then(res => {
        console.log(`Server is running at ${res.url}`);
    });
    

