import { Router } from 'express';

import {
  index
} from '../controllers/api/Main';

import {
  getNotify
} from '../controllers/api/Notification';

const apiRouter = Router();

/**
 * Mockup html file with socket.io-client
 */
apiRouter.get('/', index);

/**
 *
 */
apiRouter.post('/notify', getNotify);


module.exports = apiRouter;
