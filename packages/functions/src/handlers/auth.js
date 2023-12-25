import {contentSecurityPolicy, shopifyAuth} from '@avada/shopify-auth';
import appConfig from '@functions/config/app';
import shopifyConfig from '@functions/config/shopify';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import 'isomorphic-fetch';
import App from 'koa';
import render from 'koa-ejs';
import path from 'path';
import * as installationServices from '../services/installationServices';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterInstall: installationServices.afterInstall,
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    }
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;

// "firstName": "Adolf",
// "city": "Port Austynview",
// "productName": "Refined Frozen Table",
// "country": "Sierra Leone",
// "productId": "d011e005-7ec3-439a-9278-53f01e8f449a",
// "timestamp": "2023-01-06T20:10:51.762Z",
// "productImage": "https://loremflickr.com/640/480?lock=2187133854941184"
