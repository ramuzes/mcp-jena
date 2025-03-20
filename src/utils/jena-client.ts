import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const FUSEKI_URL = process.env.JENA_FUSEKI_URL || 'http://localhost:3030';
const DEFAULT_DATASET = process.env.DEFAULT_DATASET || 'ds';

/**
 * Represents the result of a SPARQL query
 */
export interface SparqlResult {
  head: {
    vars: string[];
  };
  results: {
    bindings: Array<{
      [key: string]: {
        type: string;
        value: string;
        datatype?: string;
        "xml:lang"?: string;
      };
    }>;
  };
}

/**
 * Client for interacting with Apache Jena Fuseki SPARQL endpoint
 */
export class JenaClient {
  private baseUrl: string;
  private dataset: string;

  /**
   * Creates a new Jena client
   * @param baseUrl - Jena Fuseki server URL. Defaults to environment variable or 'http://localhost:3030'
   * @param dataset - Dataset name. Defaults to environment variable or 'ds'
   */
  constructor(baseUrl = FUSEKI_URL, dataset = DEFAULT_DATASET) {
    this.baseUrl = baseUrl;
    this.dataset = dataset;
  }

  /**
   * Executes a SPARQL query against the Jena dataset
   * @param sparqlQuery - The SPARQL query to execute
   * @returns Query results
   */
  async executeQuery(sparqlQuery: string): Promise<SparqlResult> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.dataset}/query`, {
        params: {
          query: sparqlQuery,
        },
        headers: {
          Accept: 'application/sparql-results+json',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`SPARQL query failed: ${error.message}. ${error.response?.data?.message || ''}`);
      }
      throw error;
    }
  }

  /**
   * Executes a SPARQL update query against the Jena dataset
   * @param sparqlUpdate - The SPARQL update query to execute
   * @returns Success message
   */
  async executeUpdate(sparqlUpdate: string): Promise<string> {
    try {
      await axios.post(
        `${this.baseUrl}/${this.dataset}/update`,
        new URLSearchParams({ update: sparqlUpdate }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return 'Update successful';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`SPARQL update failed: ${error.message}. ${error.response?.data?.message || ''}`);
      }
      throw error;
    }
  }

  /**
   * Lists all available graphs in the dataset
   * @returns Array of graph URIs
   */
  async listGraphs(): Promise<string[]> {
    const query = `
      SELECT DISTINCT ?g
      WHERE {
        GRAPH ?g { ?s ?p ?o }
      }
    `;

    const result = await this.executeQuery(query);
    return result.results.bindings.map(binding => binding.g.value);
  }
}

export default JenaClient; 