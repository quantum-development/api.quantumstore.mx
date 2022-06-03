const mysql = require('sails-mysql');
const staticsVariables = require('./staticsVariables.js');
module.exports = {
    port: process.env.PORT || 8080,
    datastores: {
        default: {
            adapter: mysql,
            url: `mysql://b7716e3c871961:4f305fbd@us-cdbr-east-02.cleardb.com/heroku_19e0561be9d14e2?reconnect=true`
        }
    },
    models: {
        migrate: 'safe'
        // cascadeOnDestroy: false,
    },

    blueprints: {
        shortcuts: false
    },
    security: {
        cors: {
            allRoutes: true,
            allowOrigins: '*',
            allowCredentials: false,
            allowRequestMethods: 'GET, POST, PATCH, DELETE, OPTIONS, HEAD',
            allowRequestHeaders: 'Content-Type,Authorization,User-Agent,Referer'
        }
    },
    session: {
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    },
    sockets: {
        onlyAllowOrigins: ['https://www.lanzatealmundial.com']
    },
    log: {
        level: 'info'
    },
    http: {
        cache: 365.25 * 24 * 60 * 60 * 1000
    },
    custom: {
        openpay: {
            id: 'mftbtfod5nqirdntcwix',
            privateKey: 'pk_6a57e633105f42b190d71dea1107c768',
            production: true
        },
        app_info: {
            web: 'https://www.lanzatealmundial.com/'
        },
        reward_provider: {
            client_slug: 'quantumstore',
            url: 'https://api.qrewards.mx/',
            demo: 1
        },
        ike_provider: {
            authUrl: 'http://52.13.68.191:9090/oauth/token',
            url: 'http://ikewrapperdev.ikeasistencia.com:9079/Ike-Api/Mx/M/1/Load/Single/',
            authBearer: 'Basic SUtFX1FVQU5UVU06OXhuNGRVaWwoeW1zcjRqcg=='
        },
        email_provider: {
            url: 'https://api.qrewards.mx/store/notifications/'
        },
        jwtSecret: 'd90bf91f9ec052a63849041f899e05e57a3b865a503cd6ef5732f4e51c216e09',
        jwtKey: 'qgZTCIb7CgriyMKms9HhHNiWFVWr7djo',
        ...staticsVariables
    }
};