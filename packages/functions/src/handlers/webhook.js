import App from 'koa';
import * as errorService from '@functions/services/errorService';
import createErrorHandler from '@functions/middleware/errorHandler';
import webhookRouter from '../routes/webhook';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;
api.use(createErrorHandler());

const router = webhookRouter();
api.use(router.routes());
api.use(router.allowedMethods());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
