const {createProxyMiddleware} = require("http-proxy-middleware");

//Set up a proxy when we need to access the backend data using front end 
module.exports = app => {
    app.use(
        ['/api','/auth/google'],
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};
