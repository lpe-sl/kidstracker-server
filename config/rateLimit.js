const MAX_REQUESTS = 10; // Maximum number of requests allowed within the time frame
const TIME_FRAME_MS = 60000; // Time frame for rate limiting in milliseconds (1 minute)

const buckets = new Map();

const rateLimit = (socket) => {
  const { remoteAddress } = socket;

  if (!buckets.has(remoteAddress)) {
    buckets.set(remoteAddress, {
      tokens: MAX_REQUESTS,
      lastRefill: Date.now(),
    });
  }

  socket.on("data", () => {
    const bucket = buckets.get(remoteAddress);
    const now = Date.now();

    // Refill tokens if needed
    if (now - bucket.lastRefill >= TIME_FRAME_MS) {
      bucket.tokens = MAX_REQUESTS;
      bucket.lastRefill = now;
    }

    // Check if the client has enough tokens
    if (bucket.tokens > 0) {
      bucket.tokens--;
    } else {
      // Disconnect the client if it exceeds the rate limit
      console.log(
        `Client ${remoteAddress} exceeded rate limit. Disconnecting.`
      );
      socket.end();
    }
  });
};

module.exports = rateLimit;
