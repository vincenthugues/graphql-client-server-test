const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');
const axios = require('axios');

const host = 'http://localhost:3000';

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        item: {
            type: ItemType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, { id }) {
                return axios.get(`${host}/items/${id}`)
                    .then(({ data }) => data);
            }
        },
        items: {
            type: new GraphQLList(ItemType),
            resolve(parentValue, args) {
                return axios.get(`${host}/items`)
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
                return axios.post(`${host}/items`, { name, price, stock })
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
                return axios.patch(`${host}/items/${args.id}`, args)
                    .then(({ data }) => data);
            }
        },
        deleteItem: {
            type: ItemType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { id }) {
                return axios.delete(`${host}/items/${id}`)
                    .then(({ data }) => data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
