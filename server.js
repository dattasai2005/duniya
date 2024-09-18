const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string (replace with your MongoDB URI)
const uri = 'mongodb://localhost:27017/SD'; // Ensure this is correct and matches your database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the schema for challenges
const challengeSchema = new mongoose.Schema({
  id: Number,
  difficulty: String,
  statement: String,
  explanation: String,
  output: String,
  // language: String (if you later decide to add this)
});

// Define the model for challenges
const Challenge = mongoose.model('Challenge', challengeSchema);

// Route to get challenges by difficulty (ignoring language for now)
app.get('/api/challenges/:language/:difficulty', async (req, res) => {
  const { difficulty } = req.params; // We're only using difficulty for the query
  console.log(`Fetching challenges for difficulty: ${difficulty}`);
  try {
    // Query only by difficulty (ignoring language for now)
    const challenges = await Challenge.find({ difficulty });
    console.log(`Found ${challenges.length} challenges`);
    res.json(challenges);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
