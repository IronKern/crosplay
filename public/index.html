<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CORS HLS Player Proxy</title>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    <style>
        body { font-family: sans-serif; margin: 20px; background-color: #f4f4f4; }
        .container { max-width: 800px; margin: auto; background-color: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px; }
        #video-element { width: 100%; background-color: #000; }
        label, button { display: block; margin-bottom: 10px; }
        #media-url { width: 100%; padding: 10px; margin-bottom: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 10px 15px; background-color: #28a745; color: white; border: none; cursor: pointer; border-radius: 4px; }
        button:hover { background-color: #1e7e34; }
        .info { color: gray; font-size: 0.9em; margin-top: 10px; }
    </style>
</head>
<body>

<div class="container">
    <h1>CORS-Proxy Player (Vercel)</h1>

    <label for="media-url">Insert Media Link (HLS m3u8, MP4, etc.):</label>
    <input type="text" id="media-url" placeholder="e.g. http://155.117.252.25:8080/stream/...m3u8?token=..." value="">
    
    <button onclick="loadMedia()">Load and Play via Proxy</button>

    <div id="video-container">
        <video id="video-element" controls></video>
    </div>

    <p id="message" style="color: red;"></p>
    <p class="info">The HLS link will be routed through the Vercel Serverless Function to bypass CORS restrictions.</p>
</div>

<script>
    const video = document.getElementById('video-element');
    const urlInput = document.getElementById('media-url');
    const message = document.getElementById('message');
    let hls = null;

    function loadMedia() {
        const sourceUrl = urlInput.value.trim();
        message.textContent = '';

        if (!sourceUrl) {
            message.textContent = 'Please enter a media link.';
            return;
        }

        if (hls) {
            hls.destroy();
        }
        
        video.pause();
        video.removeAttribute('src');
        video.load();

        const encodedUrl = encodeURIComponent(sourceUrl);
        const proxyUrl = `/api/proxy?url=${encodedUrl}`;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(proxyUrl);
            hls.attachMedia(video);
            
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play().catch(e => {
                    message.textContent = 'Autoplay blocked. Please click "Play" on the player.';
                });
            });

            hls.on(Hls.Events.ERROR, function(event, data) {
                if (data.fatal) {
                    message.textContent = `Fatal streaming error: ${data.details}. Is the stream token still valid?`;
                }
            });

        } else {
            video.src = proxyUrl;
            video.load();
            video.play().catch(e => {
                message.textContent = 'Autoplay blocked. Click Play.';
            });
            
            video.onerror = function() {
                message.textContent = 'Error loading media. Check the URL and token.';
                video.onerror = null;
            };
        }
    }
</script>

</body>
</html>
