// netlify/functions/gemini-proxy.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { query } = JSON.parse(event.body);
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Build the prompt for movie details
    const prompt = `Provide details about the movie or TV show: "${query}". 
    Include the following information if available:
    - Title
    - Release year
    - Director
    - Main cast
    - Genre
    - Brief plot summary
    - Rating (IMDB or Rotten Tomatoes)
    Format the response as a JSON object.`;

    // Make request to Google Gemini API
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

    // Extract the text from Gemini's response
    const responseText = response.data.candidates[0].content.parts[0].text;
    
    // Parse the response as JSON if possible
    let movieData;
    try {
      // Sometimes the API returns markdown-formatted JSON, so try to extract it
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                         responseText.match(/```\n([\s\S]*?)\n```/);
      
      if (jsonMatch && jsonMatch[1]) {
        movieData = JSON.parse(jsonMatch[1]);
      } else {
        // If not in markdown code block, try to parse the whole response
        movieData = JSON.parse(responseText);
      }
    } catch (error) {
      // If we can't parse as JSON, return the raw text
      movieData = { rawResponse: responseText };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // For CORS
      },
      body: JSON.stringify(movieData)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};