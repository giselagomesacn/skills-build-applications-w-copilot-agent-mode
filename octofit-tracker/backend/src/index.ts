import { connectDatabase } from './config/database.js';
import app from './server.js';

const port = Number(process.env.PORT ?? 8000);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening on ${port} (${process.env.CODESPACE_NAME ? 'Codespaces' : 'local'})`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  }
}

void startServer();