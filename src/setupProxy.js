/*
*	reac后台管理系统
*	setupProxy.js
*	@author: mryyg
*	2020-03-09 11:45:36
*/

// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  /* app.use(proxy('/api', {
    target: "http://localhost:5000",
    pathRewrite: {'^/api': ''},
    changeOrigin: true
})); */
    app.use('/api', createProxyMiddleware({ 
        target: 'http://localhost:5000', 
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
    }));
};