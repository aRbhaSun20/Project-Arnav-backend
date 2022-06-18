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

const saveSingle = async (data, key, saveNormal = true) => {
  if (Array.isArray(data)) {
    const rData = JSON.stringify(data);
    console.log(rData, key);
    cacheManagement.set(key, rData);
  }
  cacheManagement.set(key, data);
};

module.exports = { cacheManagement, setKey, saveMultiple, saveSingle };
