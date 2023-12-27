import Router from 'koa-router';
import * as clientApiController from '../controllers/clientApiController';

export default function webhookRouter() {
  const router = new Router({prefix: '/clientApi'});

  router.get('/notifications', clientApiController.clientApiData);

  return router;
}
