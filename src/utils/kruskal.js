export const kruskal = (nodes, edges) => {
  const parent = {};
  const rank = {};

  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  const union = (node1, node2) => {
    const root1 = find(node1);
    const root2 = find(node2);
    if (root1 !== root2) {
      if (rank[root1] > rank[root2]) {
        parent[root2] = root1;
      } else if (rank[root1] < rank[root2]) {
        parent[root1] = root2;
      } else {
        parent[root2] = root1;
        rank[root1]++;
      }
    }
  };

  nodes.forEach((node) => {
    parent[node] = node;
    rank[node] = 0;
  });

  edges.sort((a, b) => a.weight - b.weight);
  const result = [];
  edges.forEach((edge) => {
    const { source, target } = edge;
    if (find(source) !== find(target)) {
      result.push(edge);
      union(source, target);
    }
  });

  return result;
};
