import http from 'http';
import app from './app';

// Create HTTP server
const server = http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});