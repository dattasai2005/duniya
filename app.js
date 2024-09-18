const express = require('express');
const fs = require('fs');
const app = express();

// Serve static files like HTML, CSS, and JS
app.use(express.static('public'));

// Endpoint to get challenges based on language and difficulty
app.get('/challenges/:language/:difficulty', (req, res) => {
  const { language, difficulty } = req.params;
  
  // Load JSON file based on language (replace 'python' with appropriate file)
  fs.readFile(`./challenges-${language}.json`, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'File not found' });
    
    const challenges = JSON.parse(data);
    const filteredChallenges = challenges.filter(c => c.difficulty === difficulty);
    res.json(filteredChallenges);
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
