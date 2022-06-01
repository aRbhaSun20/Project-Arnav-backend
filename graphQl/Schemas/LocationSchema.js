const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const { userType } = require("./UserSchema");
const Users = require("../../models/Users");
const { NodeType } = require("./NodeSchema");
const Node = require("../../models/Node");
const { NeighbourType, NeighbourInputType } = require("./NeighbourSchema");
const Parent = require("../../models/Parent");
const { parentLocationType } = require("./parentLocationSchema");

const LocationSchema = {
  _id: {
    type: GraphQLString,
  },
  videoUrl: {
    type: GraphQLString,
  },
  userId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Associated User Created",
  },
  user: {
    type: new GraphQLNonNull(userType),
    description: "Associated User Created",
    resolve: (user) => {
      return Users.findById(user.userId);
    },
  },
  sourceId: {
    type: GraphQLString,
    description: "Location source id",
  },
  source: {
    type: new GraphQLNonNull(NodeType),
    description: "Location source",
    resolve: (location) => {
      return Node.findById(location.sourceId);
    },
  },
  neighborIds: {
    type: GraphQLList(NeighbourType),
    description: "neighbor ids for the node",
  },
  neighbors: {
    type: new GraphQLList(NodeType),
    description: "neighbors for the node",
    resolve: async (location) => {
      const data = await location.neighborIds.map((neigh) =>
        Node.findById(neigh.destinationId)
      );
      return data;
    },
  },
  parentId: {
    type: GraphQLString,
    description: "parent id for the node",
  },
  parent: {
    type: parentLocationType,
    description: "parent for the node",
    resolve: (location) => {
      return Parent.findById(location.parentId);
    },
  },
};

const locationOptionalSchema = {
  _id: {
    type: GraphQLString,
  },
  userId: {
    type: GraphQLString,
    description: "Associated User Created",
  },
  sourceId: {
    type: GraphQLString,
    description: "Location source id",
  },
  neighborIds: {
    type: new GraphQLList(NeighbourInputType),
    description: "neighbor ids for the node",
  },
  parentId: {
    type: GraphQLString,
    description: "parent id for the node",
  },
  videoUrl: {
    type: GraphQLString,
  },
};

const LocationType = new GraphQLObjectType({
  name: "Location",
  description: "Locations",
  fields: () => ({ ...LocationSchema }),
});

module.exports = { LocationType, LocationSchema, locationOptionalSchema };
