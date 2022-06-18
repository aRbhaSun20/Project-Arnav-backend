const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const { bfs } = require("../../bfs/bfs");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Location = require("../../models/Location");
const Message = require("../../models/Message");
const Node = require("../../models/Node");
const { PathType } = require("../Schemas/PathSchema");

const pathQuery = {
  path: {
    type: PathType,
    description: "paths connecting nodes",
    args: {
      sourceId: { type: GraphQLNonNull(GraphQLString) },
      targetId: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const data = await formatData();
      const res = await bfs(args.sourceId, args.targetId, data);
      console.log(data, res);
      // ?logic to find path
      // const data = await Message.find({
      //   senderUserId: { $eq: args.senderUserId },
      //   receiverUserId: { $eq: args.receiverUserId },
      // });
      // return data;
      return await Node.find({ parentId: args.parentId });
    },
  },
};
const cacheCheck = async () => {
  if (cacheManagement.has("locationAll")) {
    const data = cacheManagement.get("locationAll");
    console.log("cache from");
    if (data) return JSON.parse(data);
  }
  const datas = await Location.find();
  saveMultiple(datas, "locationAll", false);
  return datas;
};

const formatData = async () => {
  const data = await cacheCheck();
  if (Array.isArray(data)) {
    const returnOBJ = {};
    data.forEach((elel) => {
      returnOBJ[elel.sourceId] = {
        _id: elel.sourceId,
        neighbors: [
          ...arrayCheck(returnOBJ(elel.sourceId)),
          ...elel.neighborIds.map((ele) => {
            const elementId = ele.destinationId;
            // if(elm in returnOBJ){
            //   _id: elel.sourceId,
            //    neighbors:[]
            // }
            return elementId;
          }),
        ],
      };
    });
    return returnOBJ;
  }

  return [];
};

const arrayCheck = (data) => (Array.isArray(data.neighbors) ? data.neighbors : []);

module.exports = { pathQuery };
// const data = {
//   1: {
//     _id: "1",
//     neighbors: ["2"],
//   },
//   2: {
//     _id: "2",
//     neighbors: ["3", "5"],
//   },
//   3: {
//     _id: "3",
//     neighbors: [],
//   },
// };
