const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");
const { userType } = require("./UserSchema");
const Users = require("../../models/Users");

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
    resolve: (user) => {
      return Users.findById(user.userId);
    },
  },
  parentImageUrl: {
    type: GraphQLString,
    description: "image of parent location",
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
};

module.exports = {
  parentLocationType,
  parentLocationSchema,
  parentOptionalSchema,
};
