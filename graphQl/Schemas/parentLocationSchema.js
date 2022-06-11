const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const { userType } = require("./UserSchema");
const Users = require("../../models/Users");
const { cacheManagement } = require("../../middlewares/CacheModule");

const parentLocationType = new GraphQLObjectType({
  name: "parentLocation",
  description: "Parent Locations",
  fields: () => ({ ...parentLocationSchema }),
});

const parentLocationSchema = {
  _id: {
    type: GraphQLString,
  },
  parentName: {
    type: GraphQLNonNull(GraphQLString),
    description: "Name of place",
  },
  userId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Associated User Created",
  },
  parentUser: {
    type: userType,
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
  parentImageUrl: {
    type: GraphQLString,
    description: "image of parent location",
  },
  fileName: {
    type: GraphQLString,
    description: "File Name",
  },
};

const parentOptionalSchema = {
  _id: {
    type: GraphQLString,
  },
  parentName: {
    type: GraphQLString,
    description: "Name of place",
  },
  userId: {
    type: GraphQLString,
    description: "Associated User Created",
  },
  parentImageUrl: {
    type: GraphQLString,
    description: "image of parent location",
  },
  fileName: {
    type: GraphQLString,
    description: "File Name",
  },
};

module.exports = {
  parentLocationType,
  parentLocationSchema,
  parentOptionalSchema,
};
