export const prim = (nodes, edges) => {
  const result = [];
  const visited = new Set();
  const edgesMap = new Map();
  nodes.forEach((node) => {
    edgesMap.set(node, []);
  });

  edges.forEach(({ source, target, weight }) => {
    edgesMap.get(source).push({ target, weight });
    edgesMap.get(target).push({ source, weight });
  });

  const pq = [];
  const start = nodes[0];
  visited.add(start);
  edgesMap.get(start).forEach(({ target, weight }) => {
    pq.push({ target, weight, source: start });
  });

  while (pq.length) {
    pq.sort((a, b) => a.weight - b.weight);
    const { target, weight, source } = pq.shift();
    if (!visited.has(target)) {
      visited.add(target);
      result.push({ source, target, weight });
      edgesMap.get(target).forEach(({ target: next, weight }) => {
        if (!visited.has(next)) {
          pq.push({ target: next, weight, source: target });
        }
      });
    }
  }

  return result;
};
