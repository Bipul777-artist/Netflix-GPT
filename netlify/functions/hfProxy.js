
// // netlify/functions/hfProxy.js
// const fetch = require('node-fetch'); // Ensure node-fetch is installed

// // Get Hugging Face Token from Netlify environment variables
// const HF_TOKEN = process.env.HF_TOKEN;
// // const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;
// // *** REPLACE THIS WITH YOUR CHOSEN MODEL ID ***
const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2"; // Example: Mistral Instruct
// // *** --------------------------------------- ***
// const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;

// exports.handler = async (event, context) => {
//   // CORS Headers (same as before)
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'POST, OPTIONS',
//   };

//   // Handle OPTIONS request
//   if (event.httpMethod === 'OPTIONS') {
//     return { statusCode: 204, headers, body: '' };
//   }

//   // Allow only POST requests
//   if (event.httpMethod !== 'POST') {
//     return { statusCode: 405, headers, body: 'Method Not Allowed' };
//   }

//   // Check for Hugging Face Token
//   if (!HF_TOKEN) {
//     console.error("Hugging Face Token (HF_TOKEN) not found in environment variables.");
//     return { statusCode: 500, headers, body: JSON.stringify({ error: "API token configuration error." }) };
//   }

//   try {
//     // Get the prompt from the request body
//     const { prompt } = JSON.parse(event.body);
//     if (!prompt) {
//       return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing 'prompt' in request body." }) };
//     }

//     console.log(`Sending prompt to Hugging Face model ${MODEL_ID}:`, prompt);
//     console.log(`Here is the id ${HF_TOKEN}`);

//     // Call the Hugging Face Inference API
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${HF_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       // Body format depends slightly on model - {inputs: ...} is common
//       // Check model card on Hugging Face if needed
//       body: JSON.stringify({ inputs: prompt }),
//     });

//     if (!response.ok) {
//        // Handle errors from Hugging Face API
//        const errorBody = await response.text();
//        console.error(`Hugging Face API Error (${response.status}):`, errorBody);
//        throw new Error(`Hugging Face API Error: ${response.status} - ${errorBody}`);
//     }

//     const result = await response.json();
//     console.log("Received result from Hugging Face:", result);

//     // Extract the generated text - format might vary slightly!
//     // Often it's in result[0].generated_text
//     // Check the console log above or model card examples if needed
//     const generatedText = result[0]?.generated_text || JSON.stringify(result); // Provide fallback

//     // Return the generated text
//     return {
//       statusCode: 200,
//       headers,
//       // Send result back in a consistent format
//       body: JSON.stringify({ result: generatedText }),
//     };

//   } catch (error) {
//     console.error("Error in Hugging Face proxy function:", error);
//     return {
//       statusCode: 500,
//       headers,
//       body: JSON.stringify({ error: `HF Proxy Error: ${error.message}` }),
//     };
//   }
// };

// netlify/functions/hfProxy.js
const fetch = require('node-fetch'); // Using node-fetch

exports.handler = async function (event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { prompt } = JSON.parse(event.body); // Get prompt from request body

        if (!prompt) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Prompt is required' }) };
        }

        // --- THIS IS THE CRITICAL PART ---
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${MODEL_ID}`, // Using flan-t5-large
            {
                headers: { Authorization: `Bearer ${process.env.REACT_APP_HF_KEY}` }, // Using your HF Token
                method: "POST",
                body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } }), // Sending the prompt correctly, waiting for model is good!
            }
        );
        // --- END CRITICAL PART ---


        if (!response.ok) {
            // Attempt to read error body from Hugging Face
            const errorBody = await response.text(); // Read as text first
            console.error("Hugging Face API Error:", response.status, errorBody);
            // Try to parse JSON, but handle cases where it's not JSON
            let errorMessage = `Hugging Face API Error: Status ${response.status}`;
            try {
                const errorJson = JSON.parse(errorBody);
                errorMessage = errorJson.error || errorMessage;
                if (errorJson.estimated_time) {
                     errorMessage += ` (Model might be loading, estimated time: ${errorJson.estimated_time}s)`;
                }
            } catch (e) {
                 errorMessage += ` (Response: ${errorBody})`; // Include raw text if not JSON
            }
            return { statusCode: response.status, body: JSON.stringify({ error: errorMessage }) };
        }

        const result = await response.json();

        // --- PARSING THE RESULT ---
        // Check the structure HF *actually* returns for this model.
        // It's usually [{ "generated_text": "..." }]
        let generatedText = '';
        if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
            generatedText = result[0].generated_text;
        } else {
            // Fallback or handle unexpected format
            console.warn("Unexpected response format from HF:", JSON.stringify(result));
            // If you previously expected { result: "..." }, you might handle that here,
            // but standard HF text gen is usually generated_text.
            // For now, let's return an error if the expected format isn't found.
             return { statusCode: 500, body: JSON.stringify({ error: 'Unexpected response format from Hugging Face model.' }) };
        }
        // --- END PARSING ---


        // Return the extracted text in the format your frontend expects ({ result: ... })
        // *** CHANGING THIS to match your frontend expectation ***
        return {
            statusCode: 200,
            // body: JSON.stringify(result), // Don't send the raw HF result back
            body: JSON.stringify({ result: generatedText }), // Send back in { result: "..." } format
        };

    } catch (error) {
        console.error('Error in hfProxy function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};
