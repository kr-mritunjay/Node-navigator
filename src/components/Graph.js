import React, { useState, useEffect, useRef } from "react";
import { Graph } from "react-d3-graph";
import { dijkstra } from "../utils/dijkstra";
import "../style/Graphs.css";
import {
  FaNetworkWired,
  FaRandom,
  FaPlay,
  FaInfoCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const GraphComponent = () => {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [shortestPath, setShortestPath] = useState([]);
  const [distance, setDistance] = useState(null);
  const [adjacencyListInput, setAdjacencyListInput] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [graphSize, setGraphSize] = useState({ width: 700, height: 500 });
  const graphRef = useRef(null);

  useEffect(() => {
    const updateGraphSize = () => {
      if (graphRef.current) {
        const width = graphRef.current.offsetWidth;
        const height = Math.max(500, window.innerHeight - 400);
        setGraphSize({ width, height });
      }
    };

    window.addEventListener("resize", updateGraphSize);
    updateGraphSize();

    return () => window.removeEventListener("resize", updateGraphSize);
  }, []);

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
    } catch (error) {
      alert(
        "Invalid adjacency list format. Please provide a valid 2D array format."
      );
    }
  };

  const handleRandomGraph = () => {
    const nodeCount = Math.floor(Math.random() * 5) + 5;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: `${i + 1}`,
    }));
    const links = [];

    for (let i = 0; i < nodeCount; i++) {
      const edgeCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < edgeCount; j++) {
        const target = Math.floor(Math.random() * nodeCount);
        if (i !== target) {
          links.push({
            source: `${i + 1}`,
            target: `${target + 1}`,
            weight: Math.floor(Math.random() * 9) + 1,
          });
        }
      }
    }

    setData({ nodes, links });
    setShortestPath([]);
    setDistance(null);
    setAdjacencyListInput(
      JSON.stringify(links.map((l) => [l.source, l.target, l.weight]))
    );
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
  };

  const highlightPath = (data) => {
    const nodes = data.nodes.map((node) => ({
      ...node,
      color: shortestPath.includes(node.id)
        ? "#ff6347"
        : darkMode
        ? "#e0e0e0"
        : "#333333",
      size: shortestPath.includes(node.id) ? 800 : 600,
    }));

    const links = data.links.map((link) => ({
      ...link,
      color:
        shortestPath.includes(link.source) && shortestPath.includes(link.target)
          ? "#ff6347"
          : darkMode
          ? "#90caf9"
          : "#999999",
      strokeWidth:
        shortestPath.includes(link.source) && shortestPath.includes(link.target)
          ? 4
          : 2,
    }));

    return { nodes, links };
  };

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: darkMode ? "#e0e0e0" : "#333333",
      size: 600,
      highlightStrokeColor: "#ff6347",
      highlightColor: "#ff6347",
      fontSize: 16,
      fontWeight: "bold",
      labelProperty: "id",
      labelPosition: "center",
      renderLabel: true,
    },
    link: {
      highlightColor: "#ff6347",
      renderLabel: true,
      labelProperty: "weight",
      fontSize: 12,
      fontWeight: "bold",
    },
    directed: true,
    height: graphSize.height,
    width: graphSize.width,
    d3: {
      gravity: -300,
      linkLength: 100,
    },
  };

  return (
    <div className={`graph-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header"></div>
      <div className="content-wrapper">
        <div className="input-section">
          <h2>Interactive Graph Generator</h2>
          <div className="input-group">
            <textarea
              placeholder="Enter adjacency list as 2D array Ex - [[source,destination,weight]]"
              rows="5"
              value={adjacencyListInput}
              onChange={handleAdjacencyListChange}
            />
            <button
              className="info-button"
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <FaInfoCircle />
            </button>
          </div>
          {showTooltip && (
            <div className="tooltip">
              Enter the graph structure as a 2D array. Each inner array
              represents an edge: [source, target, weight].
            </div>
          )}
          <div className="button-group">
            <button onClick={handleGenerateGraph}>
              <FaNetworkWired /> Generate Graph
            </button>
            <button onClick={handleRandomGraph}>
              <FaRandom /> Random Graph
            </button>
          </div>
          <div className="input-group">
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
          </div>
          <button className="run-dijkstra" onClick={handleDijkstra}>
            <FaPlay /> Run Dijkstra
          </button>
        </div>
        <div className="graph-section" ref={graphRef}>
          {distance !== null && (
            <div className="graph-details">
              <h3>Shortest Path Details</h3>
              <p>
                <strong>Path:</strong> {shortestPath.join(" → ")}
              </p>
              <p>
                <strong>Distance:</strong> {distance}
              </p>
            </div>
          )}
          <div className="graph-border">
            <Graph id="graph-id" data={highlightPath(data)} config={config} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
