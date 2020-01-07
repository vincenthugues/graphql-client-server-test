const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const PORT = 4000;

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
