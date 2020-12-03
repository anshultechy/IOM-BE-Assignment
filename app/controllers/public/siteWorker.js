const { SiteWorkerData } = require('../../../database/models');

module.exports = {

    async addUpdateSiteWorkerData(req, res) {
        const { body } = req;

        try {
            const siteWorkerDataCheck = await SiteWorkerData.findOne({
                where: {
                    siteId: body.siteId, workerId: body.workerId
                },
            });
            if (clientCheck == null) {
                var siteWorkerData = await SiteWorkerData.create({
                    timezone: body.timezone,
                    startinghour: body.startinghour,
                    endinghour: body.endinghour,
                    latethreshold: body.latethreshold,
                    totalInactivehours: body.totalInactivehours
                });
                return res.status(200).json(siteWorkerData);
            } else {
                var siteWorkerData = await SiteWorkerData.update(
                    {
                        timezone: body.timezone,
                        startinghour: body.startinghour,
                        endinghour: body.endinghour,
                        latethreshold: body.latethreshold,
                        totalInactivehours: body.totalInactivehours
                    },
                    {
                        where: {
                            id: siteWorkerDataCheck.id,
                        },
                    }
                );
                return res.status(200).json(siteWorkerData);
            }

            return res.status(404).json();
        } catch (err) {
            console.log(err);
            return res.status(500).json();
        }
    },
    async getSiteWorkerDataBySiteId(req, res) {
        const { q } = req.query;
        let siteId = JSON.parse(base64url.decode(q.siteId));
        const siteWorkerData = await SiteWorkerData.findAll({
            where: {
                siteId: siteId
            },
        });
        if (siteWorkerData != null) {
            return res.status(200).json(siteWorkerData);
        }
        console.log(err);
        return res.status(500).json();

    }
};
