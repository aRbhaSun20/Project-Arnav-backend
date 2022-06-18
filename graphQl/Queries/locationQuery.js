const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Location = require("../../models/Location");
const { LocationType } = require("../Schemas/LocationSchema");

const locationQuery = {
  location: {
    type: LocationType,
    description: "single location ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        const data = cacheManagement.get(args._id);
        if (data) return JSON.parse(data);
      } else {
        const data = await Location.findById(args._id);
        cacheManagement.set(args._id, JSON.stringify(data));
        return data;
      }
    },
  },
  locations: {
    type: GraphQLList(LocationType),
    description: "list of locations",
    resolve: async () => {
      return await getAllLocations();
    },
  },
};

const getAllLocations = async () => {
  if (cacheManagement.has("locationAll")) {
    const data = cacheManagement.get("locationAll");
    console.log("cache from");
    if (data) return JSON.parse(data);
  }
  const datas = await Location.find();
  saveMultiple(datas, "locationAll", false);
  return datas;
};

module.exports = { locationQuery, getAllLocations };
