import express from 'express';

var router = express.Router();

import {
    GetFunc
} from './controller.js';

router.get('/', GetFunc);

export { router };