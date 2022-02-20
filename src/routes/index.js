const adminRoutes = require('./adminRoutes');
const ROUTE_PREFIX = `/api/v1/`;

module.exports = function (app) {
    app.use(`${ROUTE_PREFIX}admin`, adminRoutes);
    app.use((err, req, res, next) => {
        console.log(err);
    });

}
