const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
<<<<<<< HEAD
=======
const { bfs } = require("../../bfs/bfs");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Location = require("../../models/Location");
const Message = require("../../models/Message");
const Node = require("../../models/Node");
>>>>>>> 963eb5f74291097729718ecf90ee700779def727
const { PathType } = require("../Schemas/PathSchema");
const { getAllLocations } = require("./locationQuery");
const { bfs } = require("../../bfs/bfs");
const { getAllNodes } = require("./nodeQuery");

const pathQuery = {
  path: {
    type: GraphQLList(PathType),
    description: "paths connecting nodes",
    args: {
      sourceId: { type: GraphQLNonNull(GraphQLString) },
      destinationId: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      const data = await formatData();
      const res = await bfs(args.sourceId, args.targetId, data);
      console.log(data, res);
      // ?logic to find path
      const returnResult = await requiredFormatData(
        args.sourceId,
        args.destinationId
      );
      if (Array.isArray(returnResult)) {
        console.log(returnResult)
        return returnResult;
      }
      throw new Error(returnResult);
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

const getLocationsBySource = (sourceId, datas) => {
  // if (cacheManagement.has(`${sourceId}sId`)) {
  //   const data = cacheManagement.get(`${sourceId}sId`);
  //   if (data) return JSON.parse(data);
  // }

  const locationData = datas?.find((ele) => ele.sourceId === sourceId);

  // cacheManagement.set(`${sourceId}sId`, JSON.stringify(locationData));
  return locationData;
};

const getConnectedLocations = async (nodes, data) => {
  const requiredNode = {};

  nodes.forEach((ele) => {
    const connectedLocations = getLocationsBySource(ele?._id, data);
    const neighbors = connectedLocations
      ? connectedLocations.neighborIds.map((neigh) => neigh.destinationId)
      : [];
    requiredNode[ele._id] = {
      _id: ele?._id,
      neighbors,
    };
  });
  return requiredNode;
};

const requiredFormatData = async (sourceId, destinationId) => {
  try {
    const nodeDatas = await getAllNodes();
    if (Array.isArray(nodeDatas)) {
      // get all locations
      const locationData = await getAllLocations();
      if (locationData) {
        // get locations of sourceId
        const nodeConnectedLocations = getLocationsBySource(
          sourceId,
          locationData
        );
        if (nodeConnectedLocations) {
          // get location map for nodes
          const pathDatas = await getConnectedLocations(
            nodeDatas,
            locationData
          );
          const path = getArrayData(bfs(sourceId, destinationId, pathDatas));
          if (path) {
            return path;
          } else {
            return "no path exist for the locations";
          }
        }
      } else {
        return "no locations exist";
      }
    } else {
      return "no nodes exist";
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

const getArrayData = (data) => (Array.isArray(data) ? data.reverse() : null);
