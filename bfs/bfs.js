const bfs = (sid, target, memo = {}) => {
    if (sid in memo) return memo[sid];
    if (sid === target) {
      memo[sid] = data[sid];
      return [data[sid]];
    }
    if (!data[sid]) return null;
    const neigh = data[sid].neighbors;
    if (neigh && Array.isArray(neigh))
      for (let n of neigh) {
        const ret = bfs(n, target, memo);
        if (ret !== null) {
          {
            memo[sid] = data[sid];
            ret.push(data[sid]);
            return ret;
          }
        }
      }
    return null;
  };