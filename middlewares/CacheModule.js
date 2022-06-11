const NodeCache = require("node-cache");

const cacheManagement = new NodeCache();

const setKey = (data) => JSON.stringify(data);

const saveMultiple = async (data, key, saveNormal = true) => {
  cacheManagement.set(key, JSON.stringify(data));
  if (Array.isArray(data)) {
    data.forEach((ele) => {
      if (saveNormal) cacheManagement.set(setKey(ele._id), ele);
      else cacheManagement.set(setKey(ele._id), JSON.stringify(ele));
    });
  }
};

module.exports = { cacheManagement, setKey, saveMultiple };
