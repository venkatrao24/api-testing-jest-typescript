const API_KEY = process.env.API_KEY || 'DEMO_KEY';

const BEFORE_ALL_TIMEOUT = Number(process.env.HTTP_TIMEOUT) || 60000; // 60 sec

const HOST = process.env.HOST || 'https://api.nasa.gov';

export { API_KEY, BEFORE_ALL_TIMEOUT, HOST };
