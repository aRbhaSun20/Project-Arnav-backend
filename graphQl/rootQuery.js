const { GraphQLObjectType } = require("graphql");
const { locationQuery } = require("./Queries/locationQuery");
const { messageQuery } = require("./Queries/messageQuery");
const { nodesQuery } = require("./Queries/nodeQuery");
const { parentLocationQuery } = require("./Queries/parentLocationQuery");
const { pathQuery } = require("./Queries/pathQuery");
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
    ...parentLocationQuery,
    ...nodesQuery,
    ...pathQuery,
  }),
});

module.exports = RootQueryType;
