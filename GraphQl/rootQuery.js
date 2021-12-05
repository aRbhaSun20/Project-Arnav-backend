const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const Users = require("../models/Users");
const { userType } = require("./UserQuery");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    user: {
      type: userType,
      description: "login user",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return Users.findOne({ _id: args._id });
      },
    },
    users: {
      type: GraphQLList(userType),
      description: "list of users",
      resolve: async () => {
        return await Users.find();
      },
    },
  }),
});

module.exports = RootQueryType;
