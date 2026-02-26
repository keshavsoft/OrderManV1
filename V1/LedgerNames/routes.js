import express from 'express';

const router = express.Router();

import { router as routerFromRead } from "./Read/routes.js"
import { router as routerFromInsert } from "./Insert/routes.js"

router.use("/Read", routerFromRead);
router.use("/Insert", routerFromInsert);

export { router };