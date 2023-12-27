import Router from 'koa-router';
import * as webhookController from '../controllers/webhookController';

export default function webhookRouter() {
  const router = new Router({prefix: '/webhook'});

  router.post('/order/new', webhookController.listenNewOrder);

  return router;
}
