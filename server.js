const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let playerPoints = 5000;

// Endpoint to roll dice
app.post('/roll-dice', (req, res) => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;

    const { betAmount, betType } = req.body;

    let result = 'lose';
    let multiplier = 0;

    if ((betType === '7 down' && total < 7) || (betType === '7 up' && total > 7)) {
        result = 'win';
        multiplier = 2;
    } else if (betType === '7' && total === 7) {
        result = 'win';
        multiplier = 5;
    }

    if (result === 'win') {
        playerPoints += betAmount * multiplier;
    } else {
        playerPoints -= betAmount;
    }

    res.json({ dice1, dice2, total, result, playerPoints });
});

// Endpoint to get player points
app.get('/player-points', (req, res) => {
    res.json({ playerPoints });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
