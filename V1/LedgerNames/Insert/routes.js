import express from 'express';
import bodyparser from "body-parser";

var router = express.Router();

import {
    postFilterDataFromBodyFunc
} from './controller.js';

import { StartFunc as middlewarespostFilterDataFromBodyFunc } from "./middleware.js";

router.use(bodyparser.json());

router.post('/', middlewarespostFilterDataFromBodyFunc, postFilterDataFromBodyFunc);

export { router };