import JenaClient from '../utils/jena-client.js';

/**
 * MCP Tool to execute a SPARQL query against Apache Jena
 */
export const sparqlQueryTool = {
  name: 'execute_sparql_query',
  description: 'Execute a SPARQL query against an Apache Jena dataset',
  input_schema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The SPARQL query to execute',
      },
      dataset: {
        type: 'string',
        description: 'Dataset name. If not provided, uses the default dataset.',
      },
      endpoint: {
        type: 'string',
        description: 'Fuseki server endpoint. If not provided, uses the default endpoint.',
      },
    },
    required: ['query'],
  },
  handler: async (params: { query: string; dataset?: string; endpoint?: string }) => {
    const { query, dataset, endpoint } = params;
    
    try {
      const client = new JenaClient(endpoint, dataset);
      const result = await client.executeQuery(query);
      
      return {
        status: 'success',
        data: result
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        status: 'error',
        error: errorMessage
      };
    }
  }
};

/**
 * MCP Tool to execute a SPARQL update query against Apache Jena
 */
export const sparqlUpdateTool = {
  name: 'execute_sparql_update',
  description: 'Execute a SPARQL update query against an Apache Jena dataset',
  input_schema: {
    type: 'object',
    properties: {
      update: {
        type: 'string',
        description: 'The SPARQL update query to execute',
      },
      dataset: {
        type: 'string',
        description: 'Dataset name. If not provided, uses the default dataset.',
      },
      endpoint: {
        type: 'string',
        description: 'Fuseki server endpoint. If not provided, uses the default endpoint.',
      },
    },
    required: ['update'],
  },
  handler: async (params: { update: string; dataset?: string; endpoint?: string }) => {
    const { update, dataset, endpoint } = params;
    
    try {
      const client = new JenaClient(endpoint, dataset);
      const result = await client.executeUpdate(update);
      
      return {
        status: 'success',
        message: result
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        status: 'error',
        error: errorMessage
      };
    }
  }
};

/**
 * MCP Tool to list available graphs in an Apache Jena dataset
 */
export const listGraphsTool = {
  name: 'list_graphs',
  description: 'List all available named graphs in an Apache Jena dataset',
  input_schema: {
    type: 'object',
    properties: {
      dataset: {
        type: 'string',
        description: 'Dataset name. If not provided, uses the default dataset.',
      },
      endpoint: {
        type: 'string',
        description: 'Fuseki server endpoint. If not provided, uses the default endpoint.',
      },
    },
    required: [],
  },
  handler: async (params: { dataset?: string; endpoint?: string }) => {
    const { dataset, endpoint } = params;
    
    try {
      const client = new JenaClient(endpoint, dataset);
      const graphs = await client.listGraphs();
      
      return {
        status: 'success',
        graphs
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        status: 'error',
        error: errorMessage
      };
    }
  }
}; 