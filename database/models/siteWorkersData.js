'use strict';

const Sequelize = require('sequelize');

module.exports = (DataTypes, DataTypes) => {


    const SiteWorkerData = sequelize.define(
        'SiteWorkerData',
        {
            siteId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'ClientSites',
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            workerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'Workers',
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                },
            },
            timezone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            startinghour: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            endinghour: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            latethreshold: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            totalInactivehours: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );

    return require('./repositories/SiteWorkerData')(SiteWorkerData, sequelize);
};
