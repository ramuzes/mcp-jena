# MCP Server for Apache Jena

A Model Context Protocol (MCP) server that connects AI agents to Apache Jena for SPARQL query capabilities.

## Overview

This project implements an MCP server that allows AI agents (such as Cursor, Cline, or Claude Desktop) to access and query RDF data stored in Apache Jena. The server provides tools for executing SPARQL queries and updates against a Jena Fuseki server.

## Features

- Execute SPARQL queries against a Jena Fuseki server
- Execute SPARQL updates to modify RDF data
- List available named graphs in the dataset
- API key authentication for secure access
- Compatible with the Model Context Protocol

## Prerequisites

- Node.js (v14 or later)
- Apache Jena Fuseki server running with your RDF data loaded
- An AI agent that supports the Model Context Protocol (e.g., Cursor, Cline)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/mcp-jena.git
   cd mcp-jena
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```
   # Apache Jena Fuseki server URL
   JENA_FUSEKI_URL=http://localhost:3030
   
   # Default dataset to query
   DEFAULT_DATASET=ds
   
   # Port for MCP server
   PORT=8080
   
   # API key for authentication (you should change this in production)
   API_KEY=your-api-key-here
   ```

4. Build the TypeScript code:
   ```
   npm run build
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will be available at `http://localhost:8080` (or your specified port)

3. Configure your MCP-compatible AI agent (like Cursor or Cline) to connect to this server.

### Configuring Cursor

1. Open Cursor
2. Go to Settings > MCP Servers
3. Add a new MCP server with:
   - Name: Jena SPARQL
   - Type: sse
   - URL: http://localhost:8080/api
   - API Key: (the API key you set in your .env file)

### Configuring Cline

1. Edit the `cline_mcp_settings.json` file
2. Add a new server configuration:
   ```json
   {
     "servers": [
       {
         "name": "Jena SPARQL",
         "url": "http://localhost:8080/api",
         "api_key": "your-api-key-here"
       }
     ]
   }
   ```

## Available Tools

This MCP server provides the following tools:

1. `execute_sparql_query` - Execute a SPARQL query against the Jena dataset
2. `execute_sparql_update` - Execute a SPARQL update query to modify the dataset
3. `list_graphs` - List all available named graphs in the dataset

## Development

- Run the server in development mode with auto-reload:
  ```
  npm run dev
  ```

- Build the TypeScript code:
  ```
  npm run build
  ```

## License

ISC

## Resources

- [Apache Jena](https://jena.apache.org/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [SPARQL Query Language](https://www.w3.org/TR/sparql11-query/) 