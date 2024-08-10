// src/utils/bellmanFord.js

export const bellmanFord = (graph, source) => {
  const nodes = Object.keys(graph);
  const distance = {};
  const predecessor = {};

  // Initialize distances and predecessors
  nodes.forEach((node) => {
    distance[node] = Infinity;
    predecessor[node] = null;
  });
  distance[source] = 0;

  // Relax edges up to (nodes - 1) times
  nodes.forEach(() => {
    graph.links.forEach((link) => {
      if (distance[link.source] + (link.weight || 1) < distance[link.target]) {
        distance[link.target] = distance[link.source] + (link.weight || 1);
        predecessor[link.target] = link.source;
      }
    });
  });

  // Check for negative-weight cycles
  let hasNegativeCycle = false;
  graph.links.forEach((link) => {
    if (distance[link.source] + (link.weight || 1) < distance[link.target]) {
      hasNegativeCycle = true;
    }
  });

  return {
    distance,
    predecessor,
    hasNegativeCycle,
  };
};
