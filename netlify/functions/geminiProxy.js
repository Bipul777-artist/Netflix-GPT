// netlify/functions/geminiProxy.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get API key from Netlify Environment Variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Use a distinct name

// Initialize Gemini AI *inside the function handler*
// Avoid initializing globally if key might not be present during build
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

exports.handler = async (event, context) => {
  // CORS Headers (same as before)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS', // Gemini usually uses POST
  };

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Allow only POST requests (typical for sending prompts)
  if (event.httpMethod !== 'POST') {
       return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  // Check for API Key
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key not found in environment variables.");
    return { statusCode: 500, headers, body: JSON.stringify({ error: "API key configuration error." }) };
  }

  try {
    // Get the prompt from the request body sent by the frontend
    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
       return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing 'prompt' in request body."}) };
    }

    // Get the generative model (adjust model name if needed)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Return the generated text
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ result: text }), // Send result back as JSON
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Gemini Proxy Error: ${error.message}` }),
    };
  }
};