
const express = require('express');
const { createClient } = require('redis');

const app = express();
const client = createClient(); // Connects to localhost:6379

(async () => {
    client.on('error', (err) => console.log('Redis Error', err));
    await client.connect();
    console.log('Connected to Redis!');
})();

app.get('/hello', async (req, res) => {
    const cacheKey = 'simple_message';

    //Cache Hit
    const cachedValue = await client.get(cacheKey);

    if (cachedValue) {
        return res.send(`FROM CACHE: ${cachedValue}`);
    }

    //Cache Miss
    const staticMsg = "Hello, I am cached!";

    // Set the value in Redis with an expiration time of 10 seconds
    await client.setEx(cacheKey, 10, staticMsg);

    res.send(`FROM SOURCE: ${staticMsg}`);
});

app.listen(3000, () => console.log('Server at http://localhost:3000/hello'));
