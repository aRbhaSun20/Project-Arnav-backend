const {
  LocationType,
  locationOptionalSchema,
} = require("../Schemas/LocationSchema");
const Location = require("../../models/Location");
const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  NeighbourType,
  NeighbourInputType,
} = require("../Schemas/NeighbourSchema");
require("dotenv").config();

const locationMutation = {
  addLocation: {
    type: LocationType,
    description: "Add New Location",
    args: {
      ...locationOptionalSchema,
    },
    resolve: async (parent, args) => {
      const location = new Location({ ...args });
      console.log(location,args)
      return await location.save();
    },
  },
  editLocation: {
    type: LocationType,
    description: "Edit Location",
    args: {
      ...locationOptionalSchema,
    },
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      return await Location.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
    },
  },
  deleteLocation: {
    type: LocationType,
    description: "Delete Location",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      return await Location.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { locationMutation };
