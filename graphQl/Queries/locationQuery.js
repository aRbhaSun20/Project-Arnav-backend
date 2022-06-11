const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const { cacheManagement } = require("../../middlewares/CacheModule");
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
        return cacheManagement.get(args._id);
      } else {
        const data = await Location.findById(args._id);
        cacheManagement.set(args._id, data);
        return data;
      }
    },
  },
  locations: {
    type: GraphQLList(LocationType),
    description: "list of locations",
    resolve: async () => {
      const datas = await Location.find();
      datas.forEach((ele) => {
        cacheManagement.set(ele._id, ele);
      });
      return datas;
    },
  },
};

module.exports = { locationQuery };
