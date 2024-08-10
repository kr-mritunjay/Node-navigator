# Node Navigator

Node Navigator is a dynamic web application for visualizing graph algorithms. This project currently supports **Dijkstra's algorithm** for finding the shortest path between nodes. More algorithms will be added in future updates.

## Features

- **Graph Visualization:** Create custom graphs by inputting adjacency lists.
- **Dijkstra's Algorithm:** Find the shortest path between a source and destination node.
- **Dynamic Animations:** View real-time animations as Dijkstra's algorithm processes the graph.
- **Customizable Graph:** Adjust graph parameters and visualize different scenarios.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/node-navigator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd node-navigator
   ```
3. Install the necessary dependencies:
   ```bash
    npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Create a Graph: Enter the adjacency list in the input box on the left. The format should be a 2D array. For example:
   ```bash
     [[1, 2, 3], [2, 3, 1], [1, 3, 5]]
   ```
2. Run Dijkstra's Algorithm: Enter the source and destination nodes, then click "Dijkstra" to calculate the shortest path.

3. View Results: The shortest path and distance will be displayed on the right, along with a visualization of the path on the graph.

## Future Updates

- Additional algorithms like BFS, DFS, Floyd-Warshall, and Minimum Spanning Tree.
- Enhanced visualization options.
- Improved user interface and graph customization.

## Screenshots

![image](https://github.com/user-attachments/assets/1bd1eb2c-baa8-4ae6-baaa-ca920c442ef8)

After running Dijkstra algo:

![image](https://github.com/user-attachments/assets/78e23ee1-054b-4e36-ab11-3ddf7dcb85f4)
