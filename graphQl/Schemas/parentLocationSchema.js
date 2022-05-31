const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");
const { userType } = require("./UserSchema");

const parentLocationSchema = {
  _pid: {
    type: GraphQLNonNull(GraphQLString),
  },
  parentName: {
    type: GraphQLNonNull(GraphQLString),
    description: "Name of parent location",
  },
  coordinates: {
    type: GraphQLNonNull(GraphQLList(GraphQLFloat)),
    description: "Coordinates of location",
  },
  image: {
    type: GraphQLString,
    description: "image of parent location",
  },
  childLocations: {
    type: GraphQLNonNull(GraphQLList(GraphQLFloat)),
    description: "All child nodes in a parent location",
  },
};

const parentLocationType = new GraphQLObjectType({
  name: "parentLocation",
  description: "Parent Locations",
  fields: () => ({ ...parentLocationSchema }),
});

module.exports = { parentLocationType, parentLocationSchema };
