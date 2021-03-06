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
const { cacheManagement } = require("../../middlewares/CacheModule");

const LocationSchema = {
  _id: {
    type: GraphQLString,
  },
  imageUrl: {
    type: GraphQLString,
  },
  userId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Associated User Created",
  },
  user: {
    type: new GraphQLNonNull(userType),
    description: "Associated User Created",
    resolve: async (user) => {
      if (cacheManagement.has(user.userId)) {
        return cacheManagement.get(user.userId);
      } else {
        const data = await Users.findById(user.userId);
        cacheManagement.set(user.userId, data);
        return data;
      }
    },
  },
  sourceId: {
    type: GraphQLString,
    description: "Location source id",
  },
  source: {
    type: new GraphQLNonNull(NodeType),
    description: "Location source",
    resolve: async (location) => {
      if (cacheManagement.has(location.sourceId)) {
        return cacheManagement.get(location.sourceId);
      } else {
        const data = await Node.findById(location.sourceId);
        cacheManagement.set(location.sourceId, data);
        return data;
      }
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
      const data = await location.neighborIds.map(async (neigh) => {
        if (cacheManagement.has(neigh.destinationId)) {
          return cacheManagement.get(neigh.destinationId);
        } else {
          const data = await Node.findById(neigh.destinationId);
          cacheManagement.set(neigh.destinationId, data);
          return data;
        }
      });
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
    resolve: async (location) => {
      if (cacheManagement.has(location.parentId)) {
        return cacheManagement.get(location.parentId);
      } else {
        const data = await Parent.findById(location.parentId);
        cacheManagement.set(location.parentId, data);
        return data;
      }
    },
  },
  fileName: {
    type: GraphQLString,
    description: "File Name",
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
  neighborData: {
    type: GraphQLString,
    description: "neighbor ids data",
  },
  parentId: {
    type: GraphQLString,
    description: "parent id for the node",
  },
  imageUrl: {
    type: GraphQLString,
  },
  fileName: {
    type: GraphQLString,
    description: "File Name",
  },
};

const LocationType = new GraphQLObjectType({
  name: "Location",
  description: "Locations",
  fields: () => ({ ...LocationSchema }),
});

module.exports = { LocationType, LocationSchema, locationOptionalSchema };
