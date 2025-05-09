// mock-proxy-server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true
}));

// Mock Gemini proxy endpoint
app.post('/.netlify/functions/geminiProxy', (req, res) => {
  console.log('[MOCK] Received request for geminiProxy');
  console.log('[MOCK] Request body:', req.body);
  
  // Mock response data
  const mockMovies = [
    {
      title: "Inception",
      year: 2010,
      overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
      title: "The Matrix",
      year: 1999,
      overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
      title: "Interstellar",
      year: 2014,
      overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
      title: "Blade Runner 2049",
      year: 2017,
      overview: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years."
    },
    {
      title: "The Prestige",
      year: 2006,
      overview: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other."
    }
  ];

  // Return mock data
  setTimeout(() => {
    res.json({
      movies: mockMovies,
      searchTerm: req.body.searchText || "Unknown search"
    });
  }, 500); // Add a slight delay to simulate network latency
});

// Parse JSON bodies
app.use(express.json());

// Start server
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
  console.log('This server simulates your Netlify functions for local testing');
});