import http from 'http';
import app from './app';
import env from './config/env';
import './cron-job/follow.cron';

// Create HTTP server
const server = http.createServer(app);

const PORT = env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});