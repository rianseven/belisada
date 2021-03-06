import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import 'localstorage-polyfill';

global['localStorage'] = localStorage;
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

// // These are important and needed before anything else
// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';

// import { enableProdMode } from '@angular/core';

// import * as express from 'express';
// import { join } from 'path';
// import 'localstorage-polyfill';

// global['localStorage'] = localStorage;
// (global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// // Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

// // Express server
// const app = express();

// const PORT = process.env.PORT || 4000;
// const DIST_FOLDER = join(process.cwd(), 'dist');

// // * NOTE :: leave this as require() since this file is built Dynamically from webpack
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main');

// // Express Engine
// import { ngExpressEngine } from '@nguniversal/express-engine';
// // Import module map for lazy loading
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));

// app.set('view engine', 'html');
// app.set('views', join(DIST_FOLDER, ''));

// // TODO: implement data requests securely
// app.get('https://api0.belisada.id/*', (req, res) => {
//   res.status(404).send('data requests are not supported');
// });

// // Server static files from /browser
// app.get('*.*', express.static(join(DIST_FOLDER, '')));

// // All regular routes use the Universal engine
// app.get('*', (req, res) => {
//   res.render('index', { req });
// });

// // Start up the Node server
// app.listen(PORT, () => {
// });
