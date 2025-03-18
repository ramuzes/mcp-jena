#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import JenaClient from "./utils/jena-client.js";

const server = new Server(
  {
    name: "mcp-jena",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Get Jena connection details from environment variables
const jenaUrl = process.env.JENA_FUSEKI_URL || "http://localhost:3030";
const defaultDataset = process.env.DEFAULT_DATASET || "ds";

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "execute_sparql_query",
        description: "Execute a SPARQL query against an Apache Jena dataset",
        inputSchema: {
          type: "object",
          properties: {
            query: { 
              type: "string",
              description: "The SPARQL query to execute",
            },
            dataset: { 
              type: "string",
              description: "Dataset name. If not provided, uses the default dataset.",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "execute_sparql_update",
        description: "Execute a SPARQL update query against an Apache Jena dataset",
        inputSchema: {
          type: "object",
          properties: {
            update: { 
              type: "string",
              description: "The SPARQL update query to execute",
            },
            dataset: { 
              type: "string",
              description: "Dataset name. If not provided, uses the default dataset.",
            },
          },
          required: ["update"],
        },
      },
      {
        name: "list_graphs",
        description: "List all available named graphs in an Apache Jena dataset",
        inputSchema: {
          type: "object",
          properties: {
            dataset: { 
              type: "string",
              description: "Dataset name. If not provided, uses the default dataset.",
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "execute_sparql_query") {
    const query = request.params.arguments?.query as string;
    const dataset = request.params.arguments?.dataset as string | undefined;
    
    try {
      const client = new JenaClient(dataset);
      const result = await client.executeQuery(query);
      
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        isError: false,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: errorMessage }],
        isError: true,
      };
    }
  } 
  else if (request.params.name === "execute_sparql_update") {
    const update = request.params.arguments?.update as string;
    const dataset = request.params.arguments?.dataset as string | undefined;
    
    try {
      const client = new JenaClient(dataset);
      const result = await client.executeUpdate(update);
      
      return {
        content: [{ type: "text", text: result }],
        isError: false,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: errorMessage }],
        isError: true,
      };
    }
  }
  else if (request.params.name === "list_graphs") {
    const dataset = request.params.arguments?.dataset as string | undefined;
    
    try {
      const client = new JenaClient(dataset);
      const graphs = await client.listGraphs();
      
      return {
        content: [{ type: "text", text: JSON.stringify(graphs, null, 2) }],
        isError: false,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: errorMessage }],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error); 