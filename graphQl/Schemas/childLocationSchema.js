const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");
const { userType } = require("./UserSchema");

const childLocationSchema = {
  _cid: {
    type: GraphQLNonNull(GraphQLString),
  },
  childName: {
    type: GraphQLNonNull(GraphQLString),
    description: "Name of child location",
  },
  coordinates: {
    type: GraphQLNonNull(GraphQLList(GraphQLFloat)),
    description: "Coordinates of location",
  },
  image: {
    type: GraphQLString,
    description: "image of child location",
  },
  Neighbours: {
    type: GraphQLNonNull(GraphQLList(GraphQLFloat)),
    description: "All neighbour nodes to a child node",
  },
};

const childLocationType = new GraphQLObjectType({
  name: "childLocation",
  description: "child Location",
  fields: () => ({ ...childLocationSchema }),
});

module.exports = { childLocationType, childLocationSchema };
