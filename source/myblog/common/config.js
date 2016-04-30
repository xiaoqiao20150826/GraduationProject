var config = {
    blogName: '杨小侨的个人博客',
    aPageNum: 5,//分页,一页显示多少文章.
    dbUser: 'root',//dbUser填写 '' 说明数据库和本博客在同一台机器
    dbPass: '1234',
    dbAddress: 'localhost',
    dbPort: '27017',
    dbName: 'blog',
    port: '3000',
    ownerName: '杨小桥',//个人姓名，显示在博主信息中
    serverPlatform: {
        platform: 'local',
        AccessKey: 'xxx',//platform是local可以不填
        SecrectKey: 'xxx',//platform是local可以不填
        buckect: 'x' //bcs中的buckect名字
    },
    mailConfig: {
        service: 'Gmail',//Gmail QQ QQex Yahoo Hotmail
        auth: {
            user: 'longmenwaideyu@gmail.com',
            pass: 'abcd'
        }
    },
    otherBlog: {//你的其他博客，显示在页脚
        url: 'http://hi.baidu.com/longmenwaideyu',
        name: '百度博客'
    },
    friendlyLinks: [//友情链接，显示在页脚
        { url: 'http://hi.baidu.com/longmenwaideyu', name : '百度博客' }
    ],
    ICPNumber: '京ICP备00000000号'//显示在页脚
}
module.exports = config;
