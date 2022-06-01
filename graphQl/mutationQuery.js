const { GraphQLObjectType } = require("graphql");
const { locationMutation } = require("./Mutation/locationMutation");
const { messageMutation } = require("./Mutation/messageMutation");
const { nodesMutation } = require("./Mutation/nodesMutation");
const { parentMutation } = require("./Mutation/parentMutation");

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
    ...messageMutation,
    ...nodesMutation,
    ...parentMutation
  }),
});

module.exports = RootMutationType;
