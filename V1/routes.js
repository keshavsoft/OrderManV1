import express from 'express';

const router = express.Router();

import { router as routerFromLedgerNames } from "./LedgerNames/routes.js";

router.use("/LedgerNames", routerFromLedgerNames);

export { router };