import React, { useState } from "react";
import { Graph } from "react-d3-graph";
import { motion } from "framer-motion/dist/framer-motion";
import { dijkstra } from "../utils/dijkstra";
import "../style/Graphs.css";
import CustomNodeSVG from "../assets/custom-node.svg";

const GraphComponent = () => {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [shortestPath, setShortestPath] = useState([]);
  const [distance, setDistance] = useState(null);
  const [adjacencyListInput, setAdjacencyListInput] = useState("");
  const [animatePath, setAnimatePath] = useState(false);

  const handleSourceChange = (e) => setSource(e.target.value);
  const handleDestinationChange = (e) => setDestination(e.target.value);
  const handleAdjacencyListChange = (e) =>
    setAdjacencyListInput(e.target.value);

  const handleGenerateGraph = () => {
    try {
      const adjacencyArray = JSON.parse(adjacencyListInput);
      const nodesSet = new Set();
      const links = adjacencyArray.map((edge) => {
        const [source, target, weight] = edge;
        nodesSet.add(source);
        nodesSet.add(target);
        return { source, target, weight: weight || 1 };
      });
      const nodes = Array.from(nodesSet).map((id) => ({ id }));
      setData({ nodes, links });
      setShortestPath([]);
      setDistance(null);
      setAnimatePath(false);
    } catch (error) {
      alert(
        "Invalid adjacency list format. Please provide a valid 2D array format."
      );
    }
  };

  const handleDijkstra = () => {
    if (!source || !destination) {
      alert("Please enter both source and destination");
      return;
    }

    const graph = data.nodes.reduce((acc, node) => {
      acc[node.id] = [];
      return acc;
    }, {});

    data.links.forEach((link) => {
      graph[link.source].push({ node: link.target, weight: link.weight || 1 });
      graph[link.target] = graph[link.target] || [];
    });

    const result = dijkstra(graph, source);
    const pathDijkstra = [];
    let stepDijkstra = destination;
    while (stepDijkstra) {
      pathDijkstra.push(stepDijkstra);
      stepDijkstra = result.previous[stepDijkstra];
    }
    setShortestPath(pathDijkstra.reverse());
    setDistance(result.distances[destination]);
    setAnimatePath(true);
  };

  const highlightPath = (data) => {
    const nodes = data.nodes.map((node) => {
      if (shortestPath.includes(node.id)) {
        return {
          ...node,
          color: "#ff6347",
          size: 500,
          svg: CustomNodeSVG,
        };
      }
      return node;
    });

    const links = data.links.map((link) => {
      if (
        shortestPath.includes(link.source) &&
        shortestPath.includes(link.target)
      ) {
        return {
          ...link,
          color: "#ff6347",
          strokeWidth: 5,
          strokeDasharray: "5,5",
        };
      }
      return {
        ...link,
        strokeWidth: 3,
      };
    });

    return { nodes, links };
  };

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: "red",
      size: 800,
      highlightStrokeColor: "red",
      highlightColor: "red",
      fontSize: 20,
      labelProperty: "id",
      labelPosition: "center",
      renderLabel: true,
    },
    link: {
      highlightColor: "red",
      renderLabel: true,
      labelProperty: "weight",
      fontSize: 20,
      strokeWidth: 8,
    },
    directed: true,
    height: 600,
    width: 650,
    d3: {
      gravity: -400,
    },
  };

  return (
    <div className="graph-container">
      <div className="graph-left">
        <h2>Graph Creation</h2>
        <textarea
          placeholder="Enter adjacency list as 2D array"
          rows="10"
          cols="50"
          value={adjacencyListInput}
          onChange={handleAdjacencyListChange}
        />
        <button style={{ background: "grey" }} onClick={handleGenerateGraph}>
          Generate Graph
        </button>
        <br />
        <br />
        <br />
        <div>
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={handleSourceChange}
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={handleDestinationChange}
          />
          <button style={{ background: "grey" }} onClick={handleDijkstra}>
            Dijkstra
          </button>
        </div>
      </div>
      <div className="graph-right">
        {distance !== null && (
          <motion.div
            className="graph-details"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Shortest Path Details</h3>
            <p>
              <strong>Shortest Path:</strong> {shortestPath.join(" -> ")}
            </p>
            <p>
              <strong>Distance:</strong> {distance}
            </p>
          </motion.div>
        )}
        <div className="graph-border">
          {animatePath ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delayChildren: 0.3,
                staggerChildren: 0.3,
              }}
            >
              <Graph id="graph-id" data={highlightPath(data)} config={config} />
            </motion.div>
          ) : (
            <Graph id="graph-id" data={highlightPath(data)} config={config} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
