const { GraphQLObjectType } = require("graphql");
const { locationMutation } = require("./Mutation/locationMutation");

const { userMutation } = require("./Mutation/userMutation");
const { videoMutation } = require("./Mutation/videoMutation");
require("dotenv").config();

const RootMutationType = new GraphQLObjectType({
  name: "Mutations",
  description: "Root Mutations",
  fields: () => ({
    ...userMutation,
    ...locationMutation,
    ...videoMutation,
  }),
});

module.exports = RootMutationType;
