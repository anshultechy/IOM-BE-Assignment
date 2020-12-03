const { Client } = require('../../../database/models');

module.exports = {

    async addUpdateClient(req, res) {
        const { body } = req;

        try {
            const clientCheck = await Client.findOne({
                where: {
                    name: body.name, email: body.email
                },
            });
            if (clientCheck == null) {
                var client = await Client.create({
                    name: body.name,
                    email: body.email
                });
                return res.status(200).json(client);
            } else {
                var client = await Client.update(
                    {
                        name: body.name, email: body.email
                    },
                    {
                        where: {
                            id: clientCheck.id,
                        },
                    }
                );
                return res.status(200).json(client);
            }

            return res.status(404).json();
        } catch (err) {
            console.log(err);
            return res.status(500).json();
        }
    },
    async addUpdateClientSite(req, res) {
        const { body } = req;

        try {
            const clientSitesCheck = await ClientSites.findOne({
                where: {
                    name: body.name, clientId: body.clientId
                },
            });
            if (clientSitesCheck == null) {
                var clientSite = await ClientSites.create({
                    clientId: body.clientId,
                    name: body.name
                });
                return res.status(200).json(clientSite);
            } else {
                var clientSite = await ClientSites.update(
                    {
                        name: body.name 
                    },
                    {
                        where: {
                            id: clientSitesCheck.id,
                        },
                    }
                );
                return res.status(200).json(clientSite);
            }

            return res.status(404).json();
        } catch (err) {
            console.log(err);
            return res.status(500).json();
        }
    },
};
