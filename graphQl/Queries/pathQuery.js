const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
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
      // ?logic to find path
      console.log(
        "-----------------------------------------------------------------"
      );
      const returnResult = await requiredFormatData(
        args.sourceId,
        args.destinationId
      );
      if (Array.isArray(returnResult)) {
        console.log(returnResult);
        return returnResult;
      }
      throw new Error(returnResult);
    },
  },
};

module.exports = { pathQuery };

const getLocationsBySource = (sourceId, datas) => {
  // console.log(datas, sourceId);
  // if (cacheManagement.has(sourceId)) {
  //   const data = cacheManagement.get(sourceId);
  //   if (data) return JSON.parse(data);
  // }

  const locationData = datas?.find((ele) => ele.sourceId === sourceId);
  // console.log(locationData);

  // cacheManagement.set(`${sourceId}sId`, JSON.stringify(locationData));
  return locationData;
};

const getConnectedLocations = (nodes, data) => {
  const requiredNode = {};

  nodes.forEach((ele) => {
    const connectedLocations = getLocationsBySource(ele?._id, data);
    // console.log(connectedLocations);
    const neighbors = connectedLocations
      ? connectedLocations.neighborIds.map((neigh) => neigh.destinationId)
      : [];
    requiredNode[ele._id] = {
      _id: ele?._id,
      neighbors,
    };
  });
  // console.log(requiredNode);
  return requiredNode;
};

const requiredFormatData = async (sourceId, destinationId) => {
  try {
    const nodeDatas = await getAllNodes();

    if (Array.isArray(nodeDatas)) {
      // get all locations
      const locationData = await getAllLocations();
      // console.log(nodeDatas.length, locationData.length);
      if (locationData) {
        // get locations of sourceId
        // const nodeConnectedLocations = getLocationsBySource(
        //   sourceId,
        //   locationData
        // );
        // if (nodeConnectedLocations) {
        // get location map for nodes
        nodeDatas.forEach((node) => {
          const data = locationData.filter((ele) => ele.sourceId === node?._id);
        });
        console.log(locationData);
        const pathDatas = getConnectedLocations(nodeDatas, locationData);
        // console.log(pathDatas);
        const path = getArrayData(bfs(sourceId, destinationId, pathDatas));
        if (path) {
          return path;
        } else {
          return "no path exist for the locations";
        }
        // }
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
