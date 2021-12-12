const { GraphQLObjectType } = require("graphql");
const { locationMutation } = require("./Mutation/locationMutation");

const { userMutation } = require("./Mutation/userMutation");
require("dotenv").config();

const RootMutationType = new GraphQLObjectType({
  name: "Mutations",
  description: "Root Mutations",
  fields: () => ({
    ...userMutation,
    ...locationMutation,
  }),
});

module.exports = RootMutationType;
