// src/utils/dijkstra.js

export const dijkstra = (graph, startNode) => {
  const distances = {};
  const previous = {};
  const nodes = new Set(Object.keys(graph));

  nodes.forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[startNode] = 0;

  while (nodes.size) {
    const currentNode = Array.from(nodes).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );
    nodes.delete(currentNode);

    if (distances[currentNode] === Infinity) break;

    graph[currentNode].forEach(({ node, weight }) => {
      const alternative = distances[currentNode] + weight;
      if (alternative < distances[node]) {
        distances[node] = alternative;
        previous[node] = currentNode;
      }
    });
  }

  return { distances, previous };
};
