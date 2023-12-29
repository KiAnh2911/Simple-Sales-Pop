import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import * as settingsController from '@functions/controllers/settingsController';
import * as notificationsController from '@functions/controllers/notificationsController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/samples', sampleController.exampleAction);
  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);
  router.get('/settings', settingsController.getSettings);
  router.put('/settings', settingsController.updateSettings);
  router.get('/notifications', notificationsController.getListNotification);
  router.delete('/notifications', notificationsController.deleteNotificatons);

  return router;
}
