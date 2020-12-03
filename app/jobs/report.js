const cron = require("node-cron");
const { SiteWorkerData, Workers, ClientSites } = require('../../../database/models');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
    }
});


module.exports = {
    startJob() {
        cron.schedule("00 00 * * *", function () {
            var clients = await Client.findAll();
            for (var clientCount = 0; clientCount < clients.length; c++) {
                var clientSites = await ClientSites.findAll({
                    where: {
                        clientId: clients[clientCount].id
                    }
                })

                var date = new Date();
                var workers = await Workers.findAll(
                );
                var siteIdsForClient = Array.prototype.map.call(clientSites, function (item) { return item.siteId; }).join(",");
                var siteWorkerData = await SiteWorkerData.findAll({
                    where: {
                        createdDate: date,
                        siteId: siteIdsForClient
                    },
                });

                var absentWorkers = workers.filter(_worker => siteWorkerData.some(_siteWorkerData => _worker.id !== _siteWorkerData.workerId));///Show a summary of absent workers
                var lateWorkers = workers.filter(_worker => siteWorkerData.some(_siteWorkerData =>
                    _worker.id === _siteWorkerData.workerId &&
                    ((+_siteWorkerData.endinghour) - (+_siteWorkerData.startinghour)) > +_siteWorkerData.latethreshold));///Show a summary of late workers
                var workersRecorForActiveAndInactiveHours = [];
                for (var j = 0; j < workers.length; j++) {
                    var workerRecord = { 'name': workers[j].name, 'total activeHours': 0, 'total inactiveHours': 0 };
                    if (siteWorkerData.filter(x => x.workerId == workers[j].id).length > 0) {
                        for (var i = 0; i < siteWorkerData.length; i++) {
                            workerRecord["total activeHours"] = workerRecord["total activeHours"] +
                                ((+siteWorkerData[i].endinghour) - (+siteWorkerData[i].startinghour));///Show a summary of active workers
                            workerRecord["total inactiveHours"] = workerRecord["total inactiveHours"] +
                                (+siteWorkerData[i].totalInactivehours);///Show a summary of inactive workers

                        }
                        workersRecorForActiveAndInactiveHours.push(workerRecord);
                    }
                }

                var mailOptions = {
                    from: 'youremail@gmail.com',
                    to: clients[clientCount].email,
                    subject: 'IOM BE Daily report in JSON Format',
                    text: 'Hi, ' + clients[clientCount].name + '<br> ' + 'absent workers :' + JSON.stringify(absentWorkers) + '\n' +
                        'lateWorkers:' + JSON.stringify(lateWorkers) + 'workers with active and inavtive hours' +
                        JSON.stringify(workersRecorForActiveAndInactiveHours)
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        });
    }
}