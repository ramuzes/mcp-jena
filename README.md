# MCP Server for Apache Jena

A Model Context Protocol (MCP) server that connects AI agents to Apache Jena for SPARQL query capabilities.

## Overview

This project implements an MCP server that allows AI agents (such as Cursor, Claude for Cline, or Claude Desktop) to access and query RDF data stored in Apache Jena. The server provides tools for executing SPARQL queries and updates against a Jena Fuseki server.

## Features

- Execute SPARQL queries against a Jena Fuseki server
- Execute SPARQL updates to modify RDF data
- List available named graphs in the dataset
- HTTP Basic authentication support for Jena Fuseki
- Compatible with the Model Context Protocol

## Prerequisites

- Node.js (v16 or later)
- Apache Jena Fuseki server running with your RDF data loaded
- An AI agent that supports the Model Context Protocol (e.g., Cursor, Claude for Cline)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/ramuzes/mcp-jena.git
   cd mcp-jena
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the TypeScript code:
   ```
   npm run build
   ```

## Usage

Run the server with default settings (localhost:3030 for Jena, 'ds' for dataset):

```
npm start
```

Or specify custom Jena endpoint, dataset, and authentication credentials:

```
npm start -- --endpoint http://your-jena-server:3030 --dataset your_dataset --username your_username --password your_password
```

You can also use short flags:

```
npm start -- -e http://your-jena-server:3030 -d your_dataset -u your_username -p your_password
```

For development mode with automatic transpilation:

```
npm run dev:transpile -- -e http://your-jena-server:3030 -d your_dataset -u your_username -p your_password
```

## Docker

You can run the MCP Jena server using Docker:

### Building the Docker image

```bash
docker build -t mcp-jena .
```

### Running with Docker

```bash
docker run -e JENA_FUSEKI_URL=http://your-jena-server:3030 -e DEFAULT_DATASET=your_dataset mcp-jena
```

## Available Tools

This MCP server provides the following tools:

1. `execute_sparql_query` - Execute a SPARQL query against the Jena dataset
2. `execute_sparql_update` - Execute a SPARQL update query to modify the dataset
3. `list_graphs` - List all available named graphs in the dataset

## Environment Variables

You can also configure the server using environment variables:

- `JENA_FUSEKI_URL`: URL of your Jena Fuseki server (default: http://localhost:3030)
- `DEFAULT_DATASET`: Default dataset name (default: ds)
- `JENA_USERNAME`: Username for HTTP Basic authentication to Jena Fuseki
- `JENA_PASSWORD`: Password for HTTP Basic authentication to Jena Fuseki
- `PORT`: Port for the MCP server (for HTTP transport, default: 8080)
- `API_KEY`: API key for MCP server authentication

## Example SPARQL Queries

### Basic SELECT query:

```sparql
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object
}
LIMIT 10
```

### Insert data with UPDATE:

```sparql
PREFIX ex: <http://example.org/>
INSERT DATA {
  ex:subject1 ex:predicate1 "object1" .
  ex:subject2 ex:predicate2 42 .
}
```

### Query a specific named graph:

```sparql
SELECT ?subject ?predicate ?object
FROM NAMED <http://example.org/graph1>
WHERE {
  GRAPH <http://example.org/graph1> {
    ?subject ?predicate ?object
  }
}
LIMIT 10
```

## Resources

- [Apache Jena](https://jena.apache.org/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [SPARQL Query Language](https://www.w3.org/TR/sparql11-query/) 