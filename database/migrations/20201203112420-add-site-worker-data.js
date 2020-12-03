'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('SiteWorkerData', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            siteId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'ClientSites',
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            workerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Workers',
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            timezone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            startinghour: {
                type: Sequelize.STRING,
                allowNull: true,
            }, endinghour: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            latethreshold: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            totalInactivehours: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('SiteWorkerData');
    },
};
