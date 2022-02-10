const { GraphQLObjectType } = require("graphql");
const { locationQuery } = require("./Queries/locationQuery");
const { messageQuery } = require("./Queries/messageQuery");
const { userQuery } = require("./Queries/userQuery");
const { videoQuery } = require("./Queries/videoQuery");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    ...userQuery,
    ...locationQuery,
    ...videoQuery,
    ...messageQuery,
  }),
});

module.exports = RootQueryType;
