const bfs = (sid, target, data={}, memo = {}) => {
  if (sid in memo) return memo[sid];
  if (sid === target) {
    memo[sid] = data[sid];
    return [data[sid]];
  }
  if (!data[sid]) return null;
  const neigh = data[sid].neighbors;
  if (neigh && Array.isArray(neigh))
    for (let n of neigh) {
      const ret = bfs(n, target, data, memo);
      if (Array.isArray(ret)) {
        {
          memo[sid] = data[sid];
          ret.push(data[sid]);
          return ret;
        }
      }
    }
  return null;
};

module.exports = { bfs };

// {
//   "1":{
//     _id:"1",
//     neighbors:["2","3"]
//   }
// }
