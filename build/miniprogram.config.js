/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */

module.exports = {
    origin: 'https://e.ednet.cn',
    // origin: 'https://test.miniprogram.com',
    entry: '/',
    router: {
        index: [
            '/(Guide|index)?',
            '/index.html',
            '/zh-CN/Guide',

            '/zh-CN/(Home|index)',
            '/zh-CN/Personal',
            '/zh-CN/ShareNet',
            '/zh-CN/ShareNet/:id',
            '/zh-CN/MiniApp',
            '/zh-CN/MiniApp/:id',
            '/zh-CN/IpLogin',
            '/zh-CN/BusinessMail',
            '/zh-CN/Host',
            '/zh-CN/App',
            '/zh-CN/Contact',
            '/zh-CN/Recruit',
            '/zh-CN/Recruit/:id',
        ],
        // home: [
        // ],
    },
    redirect: {
        notFound: 'home',
        accessDenied: 'home',
    },
    generate: {
        autoBuildNpm: 'npm',
    },
    app: {
        // backgroundTextStyle: 'dark',
        // navigationBarTextStyle: 'white',
        // navigationBarTitleText: 'kbone',

        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#ffffff",
        "navigationBarTextStyle": "black"
    },
	appExtraConfig: {
        sitemapLocation: 'sitemap.json',
	},
    global: {
        share: true,
        windowScroll: false,
        backgroundColor: '#fff',
    },
    pages: {
        index: {
            extra: {
                backgroundTextStyle: "light",
                navigationBarBackgroundColor: "#ffffff",
                navigationBarTextStyle: "black",
                disableScroll: true,
            }
        },
        home: {
            extra: {
                backgroundTextStyle: "light",
                navigationBarBackgroundColor: "#ffffff",
                navigationBarTextStyle: "black",
                disableScroll: true,
            }
        },
    },
    optimization: {
		domSubTreeLevel: 10,

		elementMultiplexing: true,
		textMultiplexing: true,
		commentMultiplexing: true,
		domExtendMultiplexing: true,

		styleValueReduce: 10240,
		attrValueReduce: 10240,
	},
    projectConfig: {
        projectname: 'kbone-template-vue',
        appid: 'wx88fbfd6c699ad12f',
    },
}
