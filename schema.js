const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');
const axios = require('axios');

const itemsHost = 'http://localhost:4100';
const spacexHost = 'http://api.spacexdata.com/v3';

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
    }),
})

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType },
    }),
});

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        item: {
            type: ItemType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, { id }) {
                return axios.get(`${itemsHost}/items/${id}`)
                    .then(({ data }) => data);
            }
        },
        items: {
            type: new GraphQLList(ItemType),
            resolve(parentValue, args) {
                return axios.get(`${itemsHost}/items`)
                    .then(({ data }) => data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parentValue, { flight_number }) {
                return axios.get(`${spacexHost}/launches/${flight_number}`)
                    .then(({ data }) => data);
            }
        },
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parentValue, args) {
                return axios.get(`${spacexHost}/launches`)
                    .then(({ data }) => data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                rocket_id: { type: GraphQLString }
            },
            resolve(parentValue, { rocket_id }) {
                return axios.get(`${spacexHost}/rockets/${rocket_id}`)
                    .then(({ data }) => data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parentValue, args) {
                return axios.get(`${spacexHost}/rockets`)
                    .then(({ data }) => data);
            }
        }
    },
})

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addItem: {
            type: ItemType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                stock: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue, { name, price, stock }) {
                return axios.post(`${itemsHost}/items`, { name, price, stock })
                    .then(res => res.data);
            }
        },
        editItem: {
            type: ItemType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                price: { type: GraphQLFloat },
                stock: { type: GraphQLInt },
            },
            resolve(parentValue, args) {
                return axios.patch(`${itemsHost}/items/${args.id}`, args)
                    .then(({ data }) => data);
            }
        },
        deleteItem: {
            type: ItemType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { id }) {
                return axios.delete(`${itemsHost}/items/${id}`)
                    .then(({ data }) => data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
