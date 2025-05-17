// // netlify/functions/geminiProxy.js
// const axios = require('axios');

// exports.handler = async function(event, context) {
//   // Only allow POST requests
//   if (event.httpMethod !== 'POST') {
//     return { statusCode: 405, body: 'Method Not Allowed' };
//   }

//   try {
//     const { prompt } = JSON.parse(event.body);
    
//     // Using Google Gemini API with API Key
//     // The API key is stored as an environment variable in Netlify
//     const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
//     if (!GEMINI_API_KEY) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: 'API key not configured' })
//       };
//     }

//     // Make the request to Google Gemini API
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         contents: [{
//           parts: [{
//             text: prompt
//           }]
//         }]
//       }
//     );

//     // Extract the text from the response
//     const responseText = response.data.candidates[0].content.parts[0].text;
    
//     // Return the text in the format your application expects
//     return {
//       statusCode: 200,
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*' // For CORS
//       },
//       body: JSON.stringify({ 
//         text: responseText // This matches the 'text' property your code is looking for
//       })
//     };
//   } catch (error) {
//     console.error('Error:', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message || 'Unknown error' })
//     };
//   }
// };

// netlify/functions/geminiProxy.js

// netlify/functions/geminiProxy.js

// netlify/functions/geminiProxy.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Log incoming request for debugging
    console.log('Request body:', event.body);
    
    // Parse the incoming request
    let requestData;
    try {
      requestData = JSON.parse(event.body);
      console.log('Parsed request data:', requestData);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'Invalid JSON in request body',
          details: parseError.message 
        })
      };
    }

    // Extract prompt from request
    const prompt = requestData.prompt;
    if (!prompt) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing prompt parameter in request' })
      };
    }
    
    // Log the API key (masked for security)
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key available:', !!apiKey);
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing GEMINI_API_KEY environment variable' })
      };
    }

    // Construct the API URL - make sure this is correct
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    console.log('API URL (without key):', apiUrl.replace(apiKey, 'REDACTED'));
    
    // Construct the request payload according to Gemini API requirements
    const payload = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };
    console.log('Sending payload:', JSON.stringify(payload, null, 2));

    // Make the request to Gemini API
    const response = await axios.post(apiUrl, payload);
    console.log('Gemini API response status:', response.status);
    
    // Extract the response data
    const responseData = response.data;
    console.log('Response data structure:', JSON.stringify(Object.keys(responseData), null, 2));
    
    // Return the successful response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseData)
    };
    
  } catch (error) {
    console.error('Error in geminiProxy function:');
    console.error('- Message:', error.message);
    console.error('- Stack:', error.stack);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('- Response status:', error.response.status);
      console.error('- Response headers:', error.response.headers);
      console.error('- Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('- No response received. Request details:', error.request);
    }
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Error calling Gemini API',
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : 'No response from API'
      })
    };
  }
};