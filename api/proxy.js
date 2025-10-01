const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing URL parameter.');
        return;
    }

    // Handle OPTIONS request (preflight), which browsers send before some cross-origin requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.writeHead(204);
        res.end();
        return;
    }

    try {
        const response = await fetch(targetUrl);

        if (!response.ok) {
            res.writeHead(response.status, { 'Content-Type': 'text/plain' });
            res.end(`Failed to fetch stream: ${response.statusText}. Status: ${response.status}`);
            return;
        }

        // Set CORS headers for the actual response
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        // Copy content type header
        const contentType = response.headers.get('content-type');
        if (contentType) {
            res.setHeader('Content-Type', contentType);
        }

        // Pipe the stream body back to the client
        response.body.pipe(res);

    } catch (error) {
        // Log the error for Vercel logs and return a 500 status
        console.error('Internal Proxy Error:', error.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Internal Proxy Error: ${error.message}`);
    }
};
