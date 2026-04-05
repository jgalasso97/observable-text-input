const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 3000;

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 20, // Limit each IP to 20 requests per 1 minute.
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

const cors = require('cors');

// CRITICAL: Allow cross-origin requests and W3C trace headers
app.use(cors({
  origin: 'http://localhost:5173',
//   allowedHeaders: ['traceparent', 'tracestate', 'Content-Type'] 
}));

// Middleware to parse incoming JSON payloads
app.use(express.json());

/**
 * 1. Post /length
 * Accepts a JSON body with "text" as the key and a string value { "text": "example string here" }
 * Returns: { "length": number }
 */
app.post('/length', (req, res) => {
    const text = req.body.text;

    // Validation: ensure text is provided and is a string
    if (typeof text !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid "text" string in the JSON body.' });
    }

    res.send({ length: text.length });
});

/**
 * 2. POST /num_vowels
 * Accepts a JSON body with "text" as the key and a string value { "text": "example string here" }
 * Returns: { "vowel_count": number }
 */
app.post('/num_vowels', (req, res) => {
    const text = req.body.text;

    // Validation: ensure text is provided and is a string
    if (typeof text !== 'string') {
        return res.status(400).json({ error: 'Please provide a valid "text" string in the JSON body.' });
    }

    res.json({ vowel_count: countVowels(text) });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function countVowels(string) {
    const vowelSet = new Set(['a','e','i','o','u','A','E','I','O','U']);
    let vowelCount = 0;

    for (const char of string) {
        if (vowelSet.has(char)) {
            vowelCount++;
        }
    }

    return vowelCount;
}