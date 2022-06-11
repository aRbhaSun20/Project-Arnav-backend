const {
  LocationType,
  locationOptionalSchema,
} = require("../Schemas/LocationSchema");
const Location = require("../../models/Location");
const { GraphQLNonNull, GraphQLString } = require("graphql");
const { cacheManagement } = require("../../middlewares/CacheModule");
require("dotenv").config();

const locationMutation = {
  addLocation: {
    type: LocationType,
    description: "Add New Location",
    args: {
      ...locationOptionalSchema,
    },
    resolve: async (parent, args) => {
      const { neighborData, ...remaining } = args;
      const requiredNeighborData = JSON.parse(neighborData);
      const neighborObj = Object.keys(requiredNeighborData);
      const resultantArr = neighborObj.map((neighKey) => {
        const { direction, videoUrl } = requiredNeighborData[neighKey];
        return {
          destinationId: neighKey,
          direction,
          videoUrl,
        };
      });
      const location = await new Location({
        ...remaining,
        neighborIds: resultantArr,
      }).save();
      console.log(resultantArr, remaining);
      cacheManagement.set(location._id, location);
      return location;
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
      const data = await Location.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      cacheManagement.set(data._id, data);
      return data;
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
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      return await Location.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { locationMutation };
