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
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Method Not Allowed' 
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    
    // Using Google Gemini API with API Key
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Make the request to Google Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    // Extract the text from the response
    const responseText = response.data.candidates[0].content.parts[0].text;
    
    // Return the text in the format your application expects
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        text: responseText
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message || 'Unknown error' })
    };
  }
};