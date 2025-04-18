// netlify/functions/tmdbProxy.js

// Use node-fetch to make requests
const fetch = require('node-fetch');

// Securely get the API key from Netlify environment variables
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Netlify Function handler
exports.handler = async (event, context) => {
  // --- CORS Headers ---
  // These are essential for allowing your Firebase-hosted
  // site to call this Netlify function.

  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allow GET and OPTIONS requests
  };

  console.log("Attempting to use TMDB API Key from env:", TMDB_API_KEY);

  if (TMDB_API_KEY) {
    console.log("API Key starts with:", TMDB_API_KEY.substring(0, 5)); // Log first 5 chars
    console.log("API Key length:", TMDB_API_KEY.length); // Log length
} else {
    console.log("TMDB_API_KEY is undefined or empty!");
}

  // Handle OPTIONS request (pre-flight request for CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204, // No Content
      headers,
      body: '',
    };
  }

  // --- Check API Key ---
  if (!TMDB_API_KEY) {
    console.error("TMDB API key not found in environment variables.");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "API key configuration error on the server." }),
    };
  }

  // --- Get TMDB Path ---
  // Get the path from the query string parameter `path`
  const tmdbPath = event.queryStringParameters?.path; // Use optional chaining

  if (!tmdbPath || typeof tmdbPath !== 'string' || !tmdbPath.startsWith('/')) {
    console.error("Invalid or missing 'path' query parameter:", tmdbPath);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Bad Request: Missing or invalid 'path' query parameter. It must start with '/'." }),
    };
  }

  // --- Make Request to TMDB ---
  const targetUrl = `${TMDB_BASE_URL}${tmdbPath}?api_key=${TMDB_API_KEY}`;
  console.log(`Proxying request for path '${tmdbPath}' to URL: ${targetUrl}`);

  try {
    const tmdbResponse = await fetch(targetUrl, {
        method: "GET", // Assuming GET requests for TMDB read API
        headers: { 'Accept': 'application/json' }
    });

    // Get response body as text first
    const responseBody = await tmdbResponse.text();

    // Forward TMDB's status code
    const statusCode = tmdbResponse.status;

    // Add Content-Type to headers before sending back
    headers['Content-Type'] = tmdbResponse.headers.get('content-type') || 'application/json';

    return {
      statusCode: statusCode,
      headers: headers, // Send back CORS headers
      body: responseBody, // Send back the raw response body from TMDB
    };

  } catch (error) {
    console.error(`Error proxying TMDB request for path '${tmdbPath}':`, error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Proxy Server Error: ${error.message}` }),
    };
  }
};