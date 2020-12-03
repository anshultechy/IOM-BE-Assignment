const express = require('express');
const router = express.Router();
const client = require('../app/controllers/public/client');
const siteWorker = require('../app/controllers/public/siteWorker');
const worker = require('../app/controllers/public/worker');

router.post('/save-client', [], client.addUpdateClient);
router.post('/save-client-site', [], client.addUpdateClientSite);
router.post('/save-worker', [], worker.addUpdateWorker);
router.post('/save-site-worker-data', [], siteWorker.addUpdateSiteWorkerData);
router.get('/get-site-worker-data-by-site-id', [], siteWorker.getSiteWorkerDataBySiteId);
module.exports = router;
