
// netlify/functions/hfProxy.js
const fetch = require('node-fetch'); // Ensure node-fetch is installed

// Get Hugging Face Token from Netlify environment variables
const HF_TOKEN = process.env.HF_TOKEN;
// const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;
// *** REPLACE THIS WITH YOUR CHOSEN MODEL ID ***
const MODEL_ID = "google/flan-t5-large"; // Example: Mistral Instruct
// *** --------------------------------------- ***
const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;

exports.handler = async (event, context) => {
  // CORS Headers (same as before)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Allow only POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  // Check for Hugging Face Token
  if (!HF_TOKEN) {
    console.error("Hugging Face Token (HF_TOKEN) not found in environment variables.");
    return { statusCode: 500, headers, body: JSON.stringify({ error: "API token configuration error." }) };
  }

  try {
    // Get the prompt from the request body
    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing 'prompt' in request body." }) };
    }

    console.log(`Sending prompt to Hugging Face model ${MODEL_ID}:`, prompt);
    console.log(`Here is the id ${HF_TOKEN}`);

    // Call the Hugging Face Inference API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // Body format depends slightly on model - {inputs: ...} is common
      // Check model card on Hugging Face if needed
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
       // Handle errors from Hugging Face API
       const errorBody = await response.text();
       console.error(`Hugging Face API Error (${response.status}):`, errorBody);
       throw new Error(`Hugging Face API Error: ${response.status} - ${errorBody}`);
    }

    const result = await response.json();
    console.log("Received result from Hugging Face:", result);

    // Extract the generated text - format might vary slightly!
    // Often it's in result[0].generated_text
    // Check the console log above or model card examples if needed
    const generatedText = result[0]?.generated_text || JSON.stringify(result); // Provide fallback

    // Return the generated text
    return {
      statusCode: 200,
      headers,
      // Send result back in a consistent format
      body: JSON.stringify({ result: generatedText }),
    };

  } catch (error) {
    console.error("Error in Hugging Face proxy function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `HF Proxy Error: ${error.message}` }),
    };
  }
};
