const { Workers } = require('../../../database/models');

module.exports = {

    async addUpdateWorker(req, res) {
        const { body } = req;

        try {
            const workerCheck = await Workers.findOne({
                where: {
                    name: body.name 
                },
            });
            if (workerCheck == null) {
                var worker = await Workers.create({
                    name: body.name,
                     
                });
                return res.status(200).json(worker);
            } else {
                var worker = await Workers.update(
                    {
                        name: body.name 
                    },
                    {
                        where: {
                            id: workerCheck.id,
                        },
                    }
                );
                return res.status(200).json(worker);
            }

            return res.status(404).json();
        } catch (err) {
            console.log(err);
            return res.status(500).json();
        }
    },
   
};
