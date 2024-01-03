import App from 'koa';
import cors from '@koa/cors';
import * as errorService from '@functions/services/errorService';
import createErrorHandler from '@functions/middleware/errorHandler';
import clientApiRouter from '../routes/clientApi';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

api.use(cors());
api.use(createErrorHandler());

const router = clientApiRouter();
api.use(router.routes());
api.use(router.allowedMethods());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
