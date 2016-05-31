import env from './utils/env';
import express from 'express';
import mongoose from 'mongoose';
import configs from '../../configs/project/server';
import clientConfigs from '../../configs/project/client';
import middlewares from './middlewares';
import routes from './routes';

const appPromise = new Promise((resolve, reject) => {
  const app = express();
  app.set('env', env);

  // initialize firebase
  if (configs.firebase && clientConfigs.firebase) {
    let firebase = require('firebase');
    firebase.initializeApp({
      serviceAccount: configs.firebase,
      databaseURL: clientConfigs.firebase.databaseURL,
    });
    console.log('[Service] [Firebase]\tenabled');
  } else {
    console.log('[Service] [Firebase]\tdisabled');
  }

  // connect to mongolab
  if (configs.mongo) {
    mongoose.connect(configs.mongo[env], (err) => {
      if (err) {
        throw err;
      }
      console.log('[Service] [Mongo]\tenabled');
      middlewares({ app });
      routes({ app });
      return resolve(app);
    });
  } else {
    console.log('[Service] [Mongo]\tdisabled');
    return reject(new Error('MongoDB URI is required'));
  }
});

export default appPromise;
