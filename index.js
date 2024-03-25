class Graph {
  constructor() {
    this.adjacency = {}

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let node = [i, j]

        this.checkIfPossible(node, 1, 2)
        this.checkIfPossible(node, 1, -2)
        this.checkIfPossible(node, -1, 2)
        this.checkIfPossible(node, -1, -2)
        this.checkIfPossible(node, 2, 1)
        this.checkIfPossible(node, 2, -1)
        this.checkIfPossible(node, -2, 1)
        this.checkIfPossible(node, -2, -1)
      }
    }
  }

  checkIfPossible(node, x, y) {
    let newNode = [node[0] + x, node[1] + y]
    if (newNode[0] < 8 && newNode[0] >= 0 && newNode[1] < 8 && newNode[1] >= 0) {
      this.addEdge(node, newNode)
    }
  }

  addEdge(node, edge) {
    if (!this.adjacency.hasOwnProperty(node)) {
      this.adjacency[node] = []
    }

    this.adjacency[node].push(edge)
  }

  bfs(s, dist, par) {
    let q = []
    let visited = {}

    for (let i of Object.keys(this.adjacency)) {
      visited[i] = false
    }

    q.push(s)
    dist[s] = 0
    par[s] = s
    visited[s] = true

    while (q.length > 0) {
      let node = q.shift()

      for (let i of this.adjacency[node]) {
        if (!visited[i]) {
          par[i] = node
          dist[i] = dist[node] + 1
          visited[i] = true

          q.push(i)
        }
      }
    }
  }

  printShortest(source, distination) {
    let dist = {}
    let par = {}

    this.bfs(source, dist, par)

    let node = distination
    let path = []

    while (node != source) {
      path.unshift(node)
      node = par[node]
    }

    path.unshift(source)
    console.log("Shortest path: " + path.join(" -> "))
  }
}


function knightMoves(g, start, end) {
  g.printShortest(start, end)
}

let g = new Graph()
knightMoves(g, [3, 3], [4, 4])
knightMoves(g, [3, 3], [4, 3])
knightMoves(g, [0, 0], [7, 7])

