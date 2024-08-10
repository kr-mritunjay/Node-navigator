export const floydWarshall = (edges) => {
  const dist = {};
  const next = {};

  edges.forEach(({ source, target, weight }) => {
    if (!dist[source]) dist[source] = {};
    if (!dist[target]) dist[target] = {};
    dist[source][target] = weight;
    dist[target][source] = weight;
    next[source] = next[source] || {};
    next[target] = next[target] || {};
  });

  Object.keys(dist).forEach((k) => {
    Object.keys(dist).forEach((i) => {
      Object.keys(dist).forEach((j) => {
        if (dist[i][j] > (dist[i][k] || Infinity) + (dist[k][j] || Infinity)) {
          dist[i][j] = (dist[i][k] || Infinity) + (dist[k][j] || Infinity);
          next[i][j] = k;
        }
      });
    });
  });

  return { dist, next };
};
