var httpProxy   = require('http-proxy');

var httpProxyMiddleware = function (context, opts) {

    var proxyOptions = opts || {};
    var proxy = httpProxy.createProxyServer(proxyOptions);

    console.log('[http-proxy-middleware] Proxy created:', context, proxyOptions.target);

    proxy.on('proxyReq', proxyReqHost);

    return fnProxyMiddleWare;

    function fnProxyMiddleWare (req, res, next) {
       if (hasContextInUrl(context, req.url)) {
           proxy.web(req, res);
       } else {
           next();
       }
    }

    function hasContextInUrl (context, url) {
        return url.indexOf(context) > -1;
    }

    function proxyReqHost (proxyReq, req, res, options) {
        var host = options.target.host;
        if (host) {
            proxyReq.setHeader('host', host);
        }
    }

};


module.exports = httpProxyMiddleware;
