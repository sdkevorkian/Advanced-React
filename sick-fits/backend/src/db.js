//connecting to prisma db
const {Prisma} = require('prisma-binding'); //no import in nodeJS at this point, server uses require

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: true
});

module.exports = db;