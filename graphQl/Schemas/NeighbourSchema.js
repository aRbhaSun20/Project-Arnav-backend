const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInputObjectType,
} = require("graphql");

const DirectionEnums = new GraphQLEnumType({
  name: "neighbourDirections",
  values: {
    FRONT: {
      value: "FRONT",
    },
    RIGHT: {
      value: "RIGHT",
    },
    LEFT: {
      value: "LEFT",
    },
  },
});

const NeighbourSchema = {
  direction: {
    type: DirectionEnums,
    description: "Associated User Created",
  },
  destinationId: {
    type: GraphQLString,
    description: "Location destination id",
  },
  videoUrl: {
    type: GraphQLString,
    description: "Location destination id",
  },
};

const NeighbourInputType = new GraphQLInputObjectType({
  name: "neighbourInputs",
  fields: () => ({
    direction: {
      type: DirectionEnums,
    },
    destinationId: {
      type: GraphQLString,
    },
    videoUrl: {
      type: GraphQLString,
      description: "Location destination id",
    },
  }),
});

const NeighbourType = new GraphQLObjectType({
  name: "Neighbours",
  description: "Neighbours",
  fields: () => ({ ...NeighbourSchema }),
});

module.exports = { NeighbourType, NeighbourSchema, NeighbourInputType };
