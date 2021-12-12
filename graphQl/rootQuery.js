const { GraphQLObjectType } = require("graphql");
const { locationQuery } = require("./Queries/locationQuery");
const { userQuery } = require("./Queries/userQuery");
const { videoQuery } = require("./Queries/videoQuery");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    ...userQuery,
    ...locationQuery,
    ...videoQuery,
  }),
});

module.exports = RootQueryType;
