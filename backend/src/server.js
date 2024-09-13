const Hapi = require('@hapi/hapi');
const routes = require('./routes'); 

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],  // allow request from any origin (CORS configuration)
            },
        },
    });

    // mendaftarkan routes
    server.route(routes);

    // menjalankan server
    await server.start();
    console.log('Server berjalan di', server.info.uri);
};

init();
