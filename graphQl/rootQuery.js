const { GraphQLObjectType } = require("graphql");
const { locationQuery } = require("./Queries/locationQuery");
const { userQuery } = require("./Queries/userQuery");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    ...userQuery,
    ...locationQuery,
  }),
});

module.exports = RootQueryType;
