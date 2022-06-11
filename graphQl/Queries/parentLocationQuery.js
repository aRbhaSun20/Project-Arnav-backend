const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Location = require("../../models/Location");
const Parent = require("../../models/Parent");
const { LocationType } = require("../Schemas/LocationSchema");
const { parentLocationType } = require("../Schemas/parentLocationSchema");

const parentLocationQuery = {
  parent: {
    type: parentLocationType,
    description: "single parent location ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        return cacheManagement.get(args._id);
      } else {
        const data = awaitParent.findById(args._id);
        cacheManagement.set(args._id, data);
        return data;
      }
    },
  },
  parents: {
    type: GraphQLList(parentLocationType),
    description: "list of parent locations",
    resolve: async () => {
      if (cacheManagement.has("parentAll")) {
        const data = cacheManagement.get("parentAll");
        if (data) return JSON.parse(data);
      }
      const datas = await Parent.find();
      saveMultiple(datas, "parentAll");
      return datas;
    },
  },
};

module.exports = { parentLocationQuery };
