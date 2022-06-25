const express = require('express');
require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, path: '/truly' });

    app.use((req, res) => {
        res.send("Hello from Express Apollo Server")
    })

    try {
        await mongoose.connect(String(process.env['MONGODB_URL']), {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (ex) {
        console.log('___ ex', ex);
    }

    console.log('Mongoose Connected ...');

    app.listen(4001, () => console.log('SERVER RUNNING ON PORT 4001'))
}

startServer();