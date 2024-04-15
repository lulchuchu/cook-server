import app from './app';
import 'dotenv/config';
import config from './configs/config';

const PORT = config.app.port || 3056;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Stopping server');
    server.close();
    process.exit();
});
