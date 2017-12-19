var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');
const transCloudPath = 'C:/Users/Sven/Desktop/Transtopia-UI/GroupServer/public';



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', {abc:1});
});

router.get('/addfriendbyemail', function(req, res, next) {
  res.json({abc: 111});
});

router.get('/getfriendlist', function(req, res, next) {
  res.json([{
		id: 1,
		name: '测试1',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo2.png'
	},{
		id: 2,
		name: '测试2',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo1.png'
	},{
		id: 3,
		name: '测试3',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo2.png'
	},{
		id: 4,
		name: '测试2',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo1.png'
	},{
		id: 5,
		name: '测试3',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo2.png'
	},{
		id: 6,
		name: '测试2',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo1.png'
	},{
		id: 7,
		name: '测试3',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo2.png'
	},{
		id: 8,
		name: '测试2',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo1.png'
	},{
		id: 5,
		name: '测试3',
		title: '软件工程师',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo2.png'
	}]);
});

router.get('/deletefriend', function(req, res, next) {
  console.log(req.query);
	res.json({abc: 2222});
});

router.get('/getfriendrequestlist', function(req, res, next) {
  res.json([{
		id: 1,
		name: '测试1',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo2.png'
	},{
		id: 2,
		name: '测试2',
		img: 'dist/img/user1-128x128.jpg',
		bg_img: 'dist/img/photo1.png'
	}]);
});

router.get('/acceptfriendrequest', function(req, res, next) {
  console.log(req.query);
	res.json({abc:111});
});

router.get('/declinefriendrequest', function(req, res, next) {
  console.log(req.query);
	res.json({abc:222});
});

router.get('/gettopic', function(req, res, next) {
  console.log(req.query);
	res.json([{ id: 0, text: '资讯' }, { id: 1, text: '日记' }, { id: 2, text: '资源' }, { id: 3, text: '知识' }, 
		{ id: 4, text: '工具' }, { id: 5, text: '教学' }, { id: 6, text: '提问' }, { id: 7, text: '产品' }, { id: 8, text: '直播' }]);
});


router.route("/creategroup")
	.post(function(req, res, next){
		  //生成multiparty对象，并配置上传目标路径
			var form = new multiparty.Form({uploadDir: './public'});
		  //上传完成后处理
		  form.parse(req, function(err, fields, files) {
				var filesTmp = JSON.stringify(files,null,2);
				console.log(fields);
				if(err){
					console.log('parse error: ' + err);
					res.json({error: 'error!!!!'});
				}else{
					console.log(fields);
					res.status(200);
					res.send('oops');;
				}
			});
		
});

router.get('/getallgroup', function(req, res, next) {
  console.log(req.query);
	res.json([{
		id: 123,
		name: '群组名称',
		authority: 1,
		bg_img: 'dist/img/photo1.png',
		img: 'dist/img/default6.png',
		introduction: '这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介',
		member_count: 15
	},{
		id: 123,
		name: '群组名称',
		authority: 0,
		bg_img: 'dist/img/photo1.png',
		img: 'dist/img/default6.png',
		introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
		member_count: 15
	},{
		id: 123,
		name: '群组名称',
		authority: 1,
		bg_img: 'dist/img/photo1.png',
		img: 'dist/img/default6.png',
		introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
		member_count: 15
	}]);
});

router.get('/getgroupdetails', function(req, res, next) {
  console.log(req.query);
	res.json({
		id: 1231321,
		authority: 1,
		bg_img: 'dist/img/photo1.png',
		img: 'dist/img/default6.png',
		name: '测试群组',
		datetime: '2015年12月5日',
		host_img: 'dist/img/user5-128x128.jpg',
		bi_code: 'dist/img/Test_addFriend.jpg',
		introduction: '这是一个群组这是一个群组这是一个群组这是一个群组这是一个群组这是一个群组这是一个群组',
		member: [{
			id: 12132,
			img: 'dist/img/user5-128x128.jpg',
			name: '张正国',
			title: '软件工程师',
			authority: 1
		},{
			id: 12132,
			img: 'dist/img/user5-128x128.jpg',
			name: '张乾隆',
			title: '软件工程师',
			authority: 0
		},{
			id: 12132,
			img: 'dist/img/user5-128x128.jpg',
			name: '张乾隆',
			title: '软件工程师',
			authority: 0
		},{
			id: 12132,
			img: 'dist/img/user5-128x128.jpg',
			name: '张乾隆',
			title: '软件工程师',
			authority: 0
		}]
		
	});
});
router.get('/dismissgroup', function(req, res, next) {
  console.log(req.query);
	res.json({
	});
});
router.get('/quitgroup', function(req, res, next) {
  console.log(req.query);
	res.json({
	});
});

/* GET home page. */
router.get('/moment', function(req, res, next) {
  res.render('moment', {abc:1});
});

router.get('/getrelatedmoment', function(req, res, next) {
	console.log(req.query);
	console.log(1);
	//console.log(req.body);
  if(Object.keys(req.query).length === 0){
		console.log('all');
		res.json([{
				id: 1,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content:'abc',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				authority: 1, //是否有修改和删除权限
				
				comments: [] // 评论
			},{
				id: 2,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content:'<div class="PostIndex-header" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><h1 class="PostIndex-title" style="box-sizing: inherit; margin-top: 0px; margin-bottom: 0px; font-style: inherit; font-variant: inherit; font-weight: 700; font-stretch: inherit; font-size: 32px; line-height: 1.3; font-family: inherit;">《三生三世》四海八荒的第一美人杨幂，也有驼背的困扰</h1><div class="PostIndex-author" style="box-sizing: inherit; display: flex; flex-direction: row; align-items: center; flex-shrink: 0; position: relative; font-size: 14px; color: gray; margin-top: 22px;"><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" style="box-sizing: inherit; color: inherit;"><img class="Avatar PostIndex-authorAvatar Avatar--xs" alt="舞者龚溢文" src="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_xs.jpg" srcset="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_l.jpg 2x" style="box-sizing: inherit; overflow: hidden; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 50%; width: 36px; height: 36px; margin-right: 12px;"></a><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" class="PostIndex-authorName" style="box-sizing: inherit; color: gray;">舞者龚溢文</a><div class="HoverTitle Badge-wrapper" data-hover-title="已认证的个人" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative; margin-left: 6px;"><a href="https://www.zhihu.com/question/48510028/answer/111228381" target="_blank" class="Badge" style="box-sizing: inherit; color: inherit; display: inline-block; width: 14px; height: 14px; position: relative; top: -1px;"><svg viewBox="0 0 20 20" class="Icon Icon--badgeCert" width="16" height="16" aria-hidden="true" style="height: 16px; width: 16px;"><g><g fill="none" fill-rule="evenodd"><path d="M.64 11.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.12 3.21.656 4.083 1.735l-.125-.154c.876 1.085 2.304 1.093 3.195.028l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.28-2.238l.016.197c-.12-1.388.656-3.212 1.735-4.084l-.154.125c1.084-.876 1.093-2.304.028-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.28l.198-.016c-1.387.122-3.21-.655-4.083-1.734l.125.153C10.802-.265 9.374-.274 8.483.79L8.61.64c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.28 2.24L2.4 4.363c.12 1.387-.656 3.21-1.735 4.084l.154-.126C-.265 9.2-.274 10.626.79 11.517L.64 11.39z" fill="#0F88EB"></path><path d="M7.78 13.728l-2.633-3s-.458-.704.242-1.36c.7-.658 1.327-.22 1.327-.22L8.67 11.28l4.696-4.93s.663-.35 1.3.197c.635.545.27 1.382.27 1.382s-3.467 3.857-5.377 5.78c-.98.93-1.78.018-1.78.018z" fill="#FFF"></path></g></g></svg></a></div><span class="Bull" style="box-sizing: inherit; margin: 0px 6px;"></span><div class="HoverTitle" data-hover-title="2017 年 3月 4 日星期六上午 9 点 19 分" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative;"><time datetime="2017-03-04T17:19:38.000Z" style="box-sizing: inherit;">6 天前</time></div></div></div><div class="RichText PostIndex-content" style="box-sizing: inherit; flex-direction: column; align-items: stretch; flex-shrink: 0; word-break: break-word; margin: 30px 0px; line-height: 1.7; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">《三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">三、塑造自己的肌肉</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果想要练出一副漂亮的身型，仅仅拉伸是不够的，还需要一定程度的训练。</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">下面每一个动作，12个为一组，每天坚持做3组。<br style="box-sizing: inherit;"></blockquote><img src="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_b.jpg" data-rawwidth="600" data-rawheight="833" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">上图，后腿自然平方在地上，两臂撑起与地面垂直，先吸气，像猫一样弓起后背，如同感觉到绳子从胸椎牵拉，然后呼气放松。<a href="https://www.zhihu.com/people/04a50076fae35bb1005653c3acacce37" data-hash="04a50076fae35bb1005653c3acacce37" class="member_mention" data-title="@我用真名被嘲笑了" data-hovercard="p$b$04a50076fae35bb1005653c3acacce37" style="box-sizing: inherit; color: rgb(62, 122, 194); border-bottom: 0px !important;">@我用真名被嘲笑了</a></blockquote></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				authority: 1, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 3,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content:'<div class="PostIndex-header" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><h1 class="PostIndex-title" style="box-sizing: inherit; margin-top: 0px; margin-bottom: 0px; font-style: inherit; font-variant: inherit; font-weight: 700; font-stretch: inherit; font-size: 32px; line-height: 1.3; font-family: inherit;">《三生三世》四海八荒的第一美人杨幂，也有驼背的困扰</h1><div class="PostIndex-author" style="box-sizing: inherit; display: flex; flex-direction: row; align-items: center; flex-shrink: 0; position: relative; font-size: 14px; color: gray; margin-top: 22px;"><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" style="box-sizing: inherit; color: inherit;"><img class="Avatar PostIndex-authorAvatar Avatar--xs" alt="舞者龚溢文" src="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_xs.jpg" srcset="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_l.jpg 2x" style="box-sizing: inherit; overflow: hidden; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 50%; width: 36px; height: 36px; margin-right: 12px;"></a><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" class="PostIndex-authorName" style="box-sizing: inherit; color: gray;">舞者龚溢文</a><div class="HoverTitle Badge-wrapper" data-hover-title="已认证的个人" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative; margin-left: 6px;"><a href="https://www.zhihu.com/question/48510028/answer/111228381" target="_blank" class="Badge" style="box-sizing: inherit; color: inherit; display: inline-block; width: 14px; height: 14px; position: relative; top: -1px;"><svg viewBox="0 0 20 20" class="Icon Icon--badgeCert" width="16" height="16" aria-hidden="true" style="height: 16px; width: 16px;"><g><g fill="none" fill-rule="evenodd"><path d="M.64 11.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.12 3.21.656 4.083 1.735l-.125-.154c.876 1.085 2.304 1.093 3.195.028l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.28-2.238l.016.197c-.12-1.388.656-3.212 1.735-4.084l-.154.125c1.084-.876 1.093-2.304.028-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.28l.198-.016c-1.387.122-3.21-.655-4.083-1.734l.125.153C10.802-.265 9.374-.274 8.483.79L8.61.64c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.28 2.24L2.4 4.363c.12 1.387-.656 3.21-1.735 4.084l.154-.126C-.265 9.2-.274 10.626.79 11.517L.64 11.39z" fill="#0F88EB"></path><path d="M7.78 13.728l-2.633-3s-.458-.704.242-1.36c.7-.658 1.327-.22 1.327-.22L8.67 11.28l4.696-4.93s.663-.35 1.3.197c.635.545.27 1.382.27 1.382s-3.467 3.857-5.377 5.78c-.98.93-1.78.018-1.78.018z" fill="#FFF"></path></g></g></svg></a></div><span class="Bull" style="box-sizing: inherit; margin: 0px 6px;"></span><div class="HoverTitle" data-hover-title="2017 年 3月 4 日星期六上午 9 点 19 分" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative;"><time datetime="2017-03-04T17:19:38.000Z" style="box-sizing: inherit;">6 天前</time></div></div></div><div class="RichText PostIndex-content" style="box-sizing: inherit; flex-direction: column; align-items: stretch; flex-shrink: 0; word-break: break-word; margin: 30px 0px; line-height: 1.7; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">《三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">三、塑造自己的肌肉</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果想要练出一副漂亮的身型，仅仅拉伸是不够的，还需要一定程度的训练。</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">下面每一个动作，12个为一组，每天坚持做3组。<br style="box-sizing: inherit;"></blockquote><img src="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_b.jpg" data-rawwidth="600" data-rawheight="833" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">上图，后腿自然平方在地上，两臂撑起与地面垂直，先吸气，像猫一样弓起后背，如同感觉到绳子从胸椎牵拉，然后呼气放松。<a href="https://www.zhihu.com/people/04a50076fae35bb1005653c3acacce37" data-hash="04a50076fae35bb1005653c3acacce37" class="member_mention" data-title="@我用真名被嘲笑了" data-hovercard="p$b$04a50076fae35bb1005653c3acacce37" style="box-sizing: inherit; color: rgb(62, 122, 194); border-bottom: 0px !important;">@我用真名被嘲笑了</a></blockquote></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				authority: 1, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 4,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				authority: 0, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 5,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				authority: 0, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 6,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				authority: 0, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 7,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content:'<div class="PostIndex-header" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><h1 class="PostIndex-title" style="box-sizing: inherit; margin-top: 0px; margin-bottom: 0px; font-style: inherit; font-variant: inherit; font-weight: 700; font-stretch: inherit; font-size: 32px; line-height: 1.3; font-family: inherit;">《三生三世》四海八荒的第一美人杨幂，也有驼背的困扰</h1><div class="PostIndex-author" style="box-sizing: inherit; display: flex; flex-direction: row; align-items: center; flex-shrink: 0; position: relative; font-size: 14px; color: gray; margin-top: 22px;"><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" style="box-sizing: inherit; color: inherit;"><img class="Avatar PostIndex-authorAvatar Avatar--xs" alt="舞者龚溢文" src="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_xs.jpg" srcset="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_l.jpg 2x" style="box-sizing: inherit; overflow: hidden; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 50%; width: 36px; height: 36px; margin-right: 12px;"></a><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" class="PostIndex-authorName" style="box-sizing: inherit; color: gray;">舞者龚溢文</a><div class="HoverTitle Badge-wrapper" data-hover-title="已认证的个人" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative; margin-left: 6px;"><a href="https://www.zhihu.com/question/48510028/answer/111228381" target="_blank" class="Badge" style="box-sizing: inherit; color: inherit; display: inline-block; width: 14px; height: 14px; position: relative; top: -1px;"><svg viewBox="0 0 20 20" class="Icon Icon--badgeCert" width="16" height="16" aria-hidden="true" style="height: 16px; width: 16px;"><g><g fill="none" fill-rule="evenodd"><path d="M.64 11.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.12 3.21.656 4.083 1.735l-.125-.154c.876 1.085 2.304 1.093 3.195.028l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.28-2.238l.016.197c-.12-1.388.656-3.212 1.735-4.084l-.154.125c1.084-.876 1.093-2.304.028-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.28l.198-.016c-1.387.122-3.21-.655-4.083-1.734l.125.153C10.802-.265 9.374-.274 8.483.79L8.61.64c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.28 2.24L2.4 4.363c.12 1.387-.656 3.21-1.735 4.084l.154-.126C-.265 9.2-.274 10.626.79 11.517L.64 11.39z" fill="#0F88EB"></path><path d="M7.78 13.728l-2.633-3s-.458-.704.242-1.36c.7-.658 1.327-.22 1.327-.22L8.67 11.28l4.696-4.93s.663-.35 1.3.197c.635.545.27 1.382.27 1.382s-3.467 3.857-5.377 5.78c-.98.93-1.78.018-1.78.018z" fill="#FFF"></path></g></g></svg></a></div><span class="Bull" style="box-sizing: inherit; margin: 0px 6px;"></span><div class="HoverTitle" data-hover-title="2017 年 3月 4 日星期六上午 9 点 19 分" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative;"><time datetime="2017-03-04T17:19:38.000Z" style="box-sizing: inherit;">6 天前</time></div></div></div><div class="RichText PostIndex-content" style="box-sizing: inherit; flex-direction: column; align-items: stretch; flex-shrink: 0; word-break: break-word; margin: 30px 0px; line-height: 1.7; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">《三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">三、塑造自己的肌肉</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果想要练出一副漂亮的身型，仅仅拉伸是不够的，还需要一定程度的训练。</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">下面每一个动作，12个为一组，每天坚持做3组。<br style="box-sizing: inherit;"></blockquote><img src="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_b.jpg" data-rawwidth="600" data-rawheight="833" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">上图，后腿自然平方在地上，两臂撑起与地面垂直，先吸气，像猫一样弓起后背，如同感觉到绳子从胸椎牵拉，然后呼气放松。<a href="https://www.zhihu.com/people/04a50076fae35bb1005653c3acacce37" data-hash="04a50076fae35bb1005653c3acacce37" class="member_mention" data-title="@我用真名被嘲笑了" data-hovercard="p$b$04a50076fae35bb1005653c3acacce37" style="box-sizing: inherit; color: rgb(62, 122, 194); border-bottom: 0px !important;">@我用真名被嘲笑了</a></blockquote></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				authority: 1, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 8,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content:'abc',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				authority: 1, //是否有修改和删除权限
				
				comments: [] // 评论
			},{
				id: 9,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content:'<div class="PostIndex-header" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><h1 class="PostIndex-title" style="box-sizing: inherit; margin-top: 0px; margin-bottom: 0px; font-style: inherit; font-variant: inherit; font-weight: 700; font-stretch: inherit; font-size: 32px; line-height: 1.3; font-family: inherit;">《三生三世》四海八荒的第一美人杨幂，也有驼背的困扰</h1><div class="PostIndex-author" style="box-sizing: inherit; display: flex; flex-direction: row; align-items: center; flex-shrink: 0; position: relative; font-size: 14px; color: gray; margin-top: 22px;"><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" style="box-sizing: inherit; color: inherit;"><img class="Avatar PostIndex-authorAvatar Avatar--xs" alt="舞者龚溢文" src="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_xs.jpg" srcset="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_l.jpg 2x" style="box-sizing: inherit; overflow: hidden; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 50%; width: 36px; height: 36px; margin-right: 12px;"></a><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" class="PostIndex-authorName" style="box-sizing: inherit; color: gray;">舞者龚溢文</a><div class="HoverTitle Badge-wrapper" data-hover-title="已认证的个人" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative; margin-left: 6px;"><a href="https://www.zhihu.com/question/48510028/answer/111228381" target="_blank" class="Badge" style="box-sizing: inherit; color: inherit; display: inline-block; width: 14px; height: 14px; position: relative; top: -1px;"><svg viewBox="0 0 20 20" class="Icon Icon--badgeCert" width="16" height="16" aria-hidden="true" style="height: 16px; width: 16px;"><g><g fill="none" fill-rule="evenodd"><path d="M.64 11.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.12 3.21.656 4.083 1.735l-.125-.154c.876 1.085 2.304 1.093 3.195.028l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.28-2.238l.016.197c-.12-1.388.656-3.212 1.735-4.084l-.154.125c1.084-.876 1.093-2.304.028-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.28l.198-.016c-1.387.122-3.21-.655-4.083-1.734l.125.153C10.802-.265 9.374-.274 8.483.79L8.61.64c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.28 2.24L2.4 4.363c.12 1.387-.656 3.21-1.735 4.084l.154-.126C-.265 9.2-.274 10.626.79 11.517L.64 11.39z" fill="#0F88EB"></path><path d="M7.78 13.728l-2.633-3s-.458-.704.242-1.36c.7-.658 1.327-.22 1.327-.22L8.67 11.28l4.696-4.93s.663-.35 1.3.197c.635.545.27 1.382.27 1.382s-3.467 3.857-5.377 5.78c-.98.93-1.78.018-1.78.018z" fill="#FFF"></path></g></g></svg></a></div><span class="Bull" style="box-sizing: inherit; margin: 0px 6px;"></span><div class="HoverTitle" data-hover-title="2017 年 3月 4 日星期六上午 9 点 19 分" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative;"><time datetime="2017-03-04T17:19:38.000Z" style="box-sizing: inherit;">6 天前</time></div></div></div><div class="RichText PostIndex-content" style="box-sizing: inherit; flex-direction: column; align-items: stretch; flex-shrink: 0; word-break: break-word; margin: 30px 0px; line-height: 1.7; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">《三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">三、塑造自己的肌肉</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果想要练出一副漂亮的身型，仅仅拉伸是不够的，还需要一定程度的训练。</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">下面每一个动作，12个为一组，每天坚持做3组。<br style="box-sizing: inherit;"></blockquote><img src="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_b.jpg" data-rawwidth="600" data-rawheight="833" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">上图，后腿自然平方在地上，两臂撑起与地面垂直，先吸气，像猫一样弓起后背，如同感觉到绳子从胸椎牵拉，然后呼气放松。<a href="https://www.zhihu.com/people/04a50076fae35bb1005653c3acacce37" data-hash="04a50076fae35bb1005653c3acacce37" class="member_mention" data-title="@我用真名被嘲笑了" data-hovercard="p$b$04a50076fae35bb1005653c3acacce37" style="box-sizing: inherit; color: rgb(62, 122, 194); border-bottom: 0px !important;">@我用真名被嘲笑了</a></blockquote></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				authority: 1, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 10,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content:'<div class="PostIndex-header" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><h1 class="PostIndex-title" style="box-sizing: inherit; margin-top: 0px; margin-bottom: 0px; font-style: inherit; font-variant: inherit; font-weight: 700; font-stretch: inherit; font-size: 32px; line-height: 1.3; font-family: inherit;">《三生三世》四海八荒的第一美人杨幂，也有驼背的困扰</h1><div class="PostIndex-author" style="box-sizing: inherit; display: flex; flex-direction: row; align-items: center; flex-shrink: 0; position: relative; font-size: 14px; color: gray; margin-top: 22px;"><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" style="box-sizing: inherit; color: inherit;"><img class="Avatar PostIndex-authorAvatar Avatar--xs" alt="舞者龚溢文" src="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_xs.jpg" srcset="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_l.jpg 2x" style="box-sizing: inherit; overflow: hidden; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 50%; width: 36px; height: 36px; margin-right: 12px;"></a><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" class="PostIndex-authorName" style="box-sizing: inherit; color: gray;">舞者龚溢文</a><div class="HoverTitle Badge-wrapper" data-hover-title="已认证的个人" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative; margin-left: 6px;"><a href="https://www.zhihu.com/question/48510028/answer/111228381" target="_blank" class="Badge" style="box-sizing: inherit; color: inherit; display: inline-block; width: 14px; height: 14px; position: relative; top: -1px;"><svg viewBox="0 0 20 20" class="Icon Icon--badgeCert" width="16" height="16" aria-hidden="true" style="height: 16px; width: 16px;"><g><g fill="none" fill-rule="evenodd"><path d="M.64 11.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.12 3.21.656 4.083 1.735l-.125-.154c.876 1.085 2.304 1.093 3.195.028l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.28-2.238l.016.197c-.12-1.388.656-3.212 1.735-4.084l-.154.125c1.084-.876 1.093-2.304.028-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.28l.198-.016c-1.387.122-3.21-.655-4.083-1.734l.125.153C10.802-.265 9.374-.274 8.483.79L8.61.64c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.28 2.24L2.4 4.363c.12 1.387-.656 3.21-1.735 4.084l.154-.126C-.265 9.2-.274 10.626.79 11.517L.64 11.39z" fill="#0F88EB"></path><path d="M7.78 13.728l-2.633-3s-.458-.704.242-1.36c.7-.658 1.327-.22 1.327-.22L8.67 11.28l4.696-4.93s.663-.35 1.3.197c.635.545.27 1.382.27 1.382s-3.467 3.857-5.377 5.78c-.98.93-1.78.018-1.78.018z" fill="#FFF"></path></g></g></svg></a></div><span class="Bull" style="box-sizing: inherit; margin: 0px 6px;"></span><div class="HoverTitle" data-hover-title="2017 年 3月 4 日星期六上午 9 点 19 分" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative;"><time datetime="2017-03-04T17:19:38.000Z" style="box-sizing: inherit;">6 天前</time></div></div></div><div class="RichText PostIndex-content" style="box-sizing: inherit; flex-direction: column; align-items: stretch; flex-shrink: 0; word-break: break-word; margin: 30px 0px; line-height: 1.7; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">《三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">三、塑造自己的肌肉</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果想要练出一副漂亮的身型，仅仅拉伸是不够的，还需要一定程度的训练。</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">下面每一个动作，12个为一组，每天坚持做3组。<br style="box-sizing: inherit;"></blockquote><img src="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_b.jpg" data-rawwidth="600" data-rawheight="833" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">上图，后腿自然平方在地上，两臂撑起与地面垂直，先吸气，像猫一样弓起后背，如同感觉到绳子从胸椎牵拉，然后呼气放松。<a href="https://www.zhihu.com/people/04a50076fae35bb1005653c3acacce37" data-hash="04a50076fae35bb1005653c3acacce37" class="member_mention" data-title="@我用真名被嘲笑了" data-hovercard="p$b$04a50076fae35bb1005653c3acacce37" style="box-sizing: inherit; color: rgb(62, 122, 194); border-bottom: 0px !important;">@我用真名被嘲笑了</a></blockquote></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				authority: 1, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 11,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				authority: 0, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 12,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				authority: 0, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 13,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				authority: 0, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: 14,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content:'<div class="PostIndex-header" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><h1 class="PostIndex-title" style="box-sizing: inherit; margin-top: 0px; margin-bottom: 0px; font-style: inherit; font-variant: inherit; font-weight: 700; font-stretch: inherit; font-size: 32px; line-height: 1.3; font-family: inherit;">《三生三世》四海八荒的第一美人杨幂，也有驼背的困扰</h1><div class="PostIndex-author" style="box-sizing: inherit; display: flex; flex-direction: row; align-items: center; flex-shrink: 0; position: relative; font-size: 14px; color: gray; margin-top: 22px;"><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" style="box-sizing: inherit; color: inherit;"><img class="Avatar PostIndex-authorAvatar Avatar--xs" alt="舞者龚溢文" src="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_xs.jpg" srcset="https://pic1.zhimg.com/eaf9b0b881669929994d4802ee14de28_l.jpg 2x" style="box-sizing: inherit; overflow: hidden; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 50%; width: 36px; height: 36px; margin-right: 12px;"></a><a href="https://www.zhihu.com/people/wu-zhe-gong-yi-wen" target="_blank" class="PostIndex-authorName" style="box-sizing: inherit; color: gray;">舞者龚溢文</a><div class="HoverTitle Badge-wrapper" data-hover-title="已认证的个人" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative; margin-left: 6px;"><a href="https://www.zhihu.com/question/48510028/answer/111228381" target="_blank" class="Badge" style="box-sizing: inherit; color: inherit; display: inline-block; width: 14px; height: 14px; position: relative; top: -1px;"><svg viewBox="0 0 20 20" class="Icon Icon--badgeCert" width="16" height="16" aria-hidden="true" style="height: 16px; width: 16px;"><g><g fill="none" fill-rule="evenodd"><path d="M.64 11.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.12 3.21.656 4.083 1.735l-.125-.154c.876 1.085 2.304 1.093 3.195.028l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.28-2.238l.016.197c-.12-1.388.656-3.212 1.735-4.084l-.154.125c1.084-.876 1.093-2.304.028-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.28l.198-.016c-1.387.122-3.21-.655-4.083-1.734l.125.153C10.802-.265 9.374-.274 8.483.79L8.61.64c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.28 2.24L2.4 4.363c.12 1.387-.656 3.21-1.735 4.084l.154-.126C-.265 9.2-.274 10.626.79 11.517L.64 11.39z" fill="#0F88EB"></path><path d="M7.78 13.728l-2.633-3s-.458-.704.242-1.36c.7-.658 1.327-.22 1.327-.22L8.67 11.28l4.696-4.93s.663-.35 1.3.197c.635.545.27 1.382.27 1.382s-3.467 3.857-5.377 5.78c-.98.93-1.78.018-1.78.018z" fill="#FFF"></path></g></g></svg></a></div><span class="Bull" style="box-sizing: inherit; margin: 0px 6px;"></span><div class="HoverTitle" data-hover-title="2017 年 3月 4 日星期六上午 9 点 19 分" style="box-sizing: inherit; display: flex; flex-direction: column; align-items: stretch; flex-shrink: 0; position: relative;"><time datetime="2017-03-04T17:19:38.000Z" style="box-sizing: inherit;">6 天前</time></div></div></div><div class="RichText PostIndex-content" style="box-sizing: inherit; flex-direction: column; align-items: stretch; flex-shrink: 0; word-break: break-word; margin: 30px 0px; line-height: 1.7; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">《三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><br style="box-sizing: inherit;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p><br style="box-sizing: inherit;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;"><span style="box-sizing: inherit; font-weight: 700;">三、塑造自己的肌肉</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px;">如果想要练出一副漂亮的身型，仅仅拉伸是不够的，还需要一定程度的训练。</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">下面每一个动作，12个为一组，每天坚持做3组。<br style="box-sizing: inherit;"></blockquote><img src="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_b.jpg" data-rawwidth="600" data-rawheight="833" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic1.zhimg.com/v2-0610ee552fd44ade5b8f88f3463284b8_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228);">上图，后腿自然平方在地上，两臂撑起与地面垂直，先吸气，像猫一样弓起后背，如同感觉到绳子从胸椎牵拉，然后呼气放松。<a href="https://www.zhihu.com/people/04a50076fae35bb1005653c3acacce37" data-hash="04a50076fae35bb1005653c3acacce37" class="member_mention" data-title="@我用真名被嘲笑了" data-hovercard="p$b$04a50076fae35bb1005653c3acacce37" style="box-sizing: inherit; color: rgb(62, 122, 194); border-bottom: 0px !important;">@我用真名被嘲笑了</a></blockquote></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				authority: 1, //是否有修改和删除权限
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			}]);
	}
	else if(req.query.star){
		console.log('star');
		res.json([{
				id: 54315,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
				content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &ps://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			}]);
	}else if(req.query.friend){
		console.log('friend');
		res.json([{
				id: "543dasfasdfasf",
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			}]);
	}else if(req.query.group){
		console.log('group');
		req.json(1);
	}else{
		
	}
	
});

router.get('/getmomentbyuserid', function(req, res, next) {
  console.log(req.query);
	res.json([{
				id: 54315,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "这是一个标题",
				content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: "543dasfasdfasf",
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: "543dasfasdfasf",
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: "543dasfasdfasf",
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: "543dasfasdfasf",
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			}]);
});
router.get('/getfollowedmoment', function(req, res, next) {
  console.log(req.body);
  console.log(req.query);
	res.json([{
				id: 54315,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				followed:1,
				
				title: "这是一个标题",
				content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			},{
				id: "543dasfasdfasf",
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				followed: 0,
				
				title: "fasdfasfasfsdfasfsafsd",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 1, //我是否点赞
				star: 0, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			}]);
});

router.get('/getoption', function(req, res, next) {
	res.json({
		senders: 
			[{text: '个人',
				children: [{
					id  : 0,
					img: 'dist/img/user7-128x128.jpg',
					text: '张震宇'
				}]
			},
			{text: '群组',
				children: [{
					id  : 1,
					img: 'dist/img/default6.png',
					text: '交托帮'
				},{
					id  : 2,
					img: 'dist/img/default6.png',
					text: '测试'
				},{
					id  : 3,
					img: 'dist/img/default6.png',
					text: '测试2'
				},{
					id  : 4,
					img: 'dist/img/default6.png',
					text: '测试3'
				},{
					id  : 5,
					img: 'dist/img/default6.png',
					text: '测试4'
				}]
			}],
		genres: [{ id: 0, text: '资讯' }, { id: 1, text: '日记' }, { id: 2, text: '资源' }, { id: 3, text: '知识' }, 
					{ id: 4, text: '工具' }, { id: 5, text: '教学' }, { id: 6, text: '提问' }, { id: 7, text: '产品' }, { id: 8, text: '直播' }],
		tags: [{ id: 0, text: '交叉口设计' }, { id: 1, text: '城市规划' }, { id: 2, text: '交通流量统计' }, { id: 3, text: '绘图' }, { id: 4, text: '设计' }],
		sharedwith: [{ id: 0, text: '交托帮' }, { id: 1, text: '测试' }, { id: 2, text: '测试2' }, { id: 3, text: '测试3' }, { id: 4, text: '测试4' }]
	});
});


router.post('/postmoment', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json({abc:1});
});

router.post('/postReplyToMoment', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json({
				id: 54315,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				followed: 0,
				
				title: "这是一个标题",
				content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			});
});

router.get('/starMoment', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json({abc:1});
});

router.get('/likeMoment', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json({count:125});
});

router.get('/removetagofmoment', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json({abc:1});
});
router.get('/getmomentbyid', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json({
				id: 54315,
				user_id: 123,
				user_name: "张振宇",
				user_img: "dist/img/avatar.png",
				user_followers: 123,
				user_blogs: 456, //发表总文章数
				user_bestblogs: 789, //用户精华帖
				followed: 2, // 0: 自己 1: 已关注 2：未关注
				
				title: "这是一个标题",
				content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p>',
				datetime: "2015-07-13 08:05", //时间
				genre: "资讯", // 大分类
				tags: ["绘图","资讯"], // 小标签
				sharedwith: [], //分享范围，是否需要？？？
				total_like: 8056, //总点赞人数
				like: 0, //我是否点赞
				star: 1, //我是否加星
				
				comments: [{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &ps://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, ps://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2574,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
					datetime: "2015-07-13 08:05",
				}] // 评论
			});
});
router.get('/getuserinfobyid', function(req, res, next){
	console.log(req.body);
	console.log(req.query);

	res.json({
						id: 123123,
						name: '张振宇',
						title: '软件工程师',
						bg: 'dist/img/photo1.png',
						img: 'dist/img/user2-160x160.jpg',
						blogs: 153,
						followers: 18,
						followings: 25,
						introduction: '在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。',
						topic_genres: [1,2,3,4,5,6,7,8], //此处有变动 20170317
						topic_tags: [0,1,2,3,4,5], //此处有变动 20170317
						moment_count: 11,
						following_individual: 100,
						following_group: 50,
						followed_by: 25,
						followed: 0
					});
	
});

router.get('/follow', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json({});
});
router.get('/getcontactinfo', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json({myid: 121321,
		contacts: [{
					user_id: 111,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					datetime: "2015-07-13 08:05",
				},{
					user_id: 222,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					datetime: "2015-07-13 08:05",
				},{
					user_id: 2533374,
					user_name: "刘美义",
					user_img: "dist/img/user2-160x160.jpg",
					
					to_id: -1, //回复用户id
					to_name: "", //回复用户姓名
					datetime: "2015-07-13 08:05",
	}]}
	);
});

router.get('/getfollowing', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json([{
			id: 111,
			type: 1,
			name: "刘美义",
			img: "dist/img/user2-160x160.jpg",
			title: '软件工程师',
			followed: 1
		},{
			id: 111,
			type: 2,
			name: "交托帮",
			bg_img: "dist/img/photo1.png",
			img: "dist/img/photo1.png",
			title: '软件工程师',
			member_count: 150,
			genre: ['资讯', '日记'],
			followed: 1
		},{
			id: 111,
			type: 2,
			name: "测试群",
			bg_img: "dist/img/photo1.png",
			img: "dist/img/user2-160x160.jpg",
			title: '软件工程师',
			member_count: 150,
			genre: ['资讯', '日记'],
			followed: 2
		},{
			id: 111,
			type: 2,
			name: "测试群",
			bg_img: "dist/img/photo1.png",
			img: "dist/img/user2-160x160.jpg",
			title: '软件工程师',
			member_count: 150,
			genre: ['资讯', '日记'],
			followed: 2
		},{
			id: 111,
			type: 2,
			name: "测试群",
			bg_img: "dist/img/photo1.png",
			img: "dist/img/user2-160x160.jpg",
			title: '软件工程师',
			member_count: 150,
			genre: ['资讯', '日记'],
			followed: 2
		},{
			id: 111,
			type: 2,
			name: "测试群",
			bg_img: "dist/img/photo1.png",
			img: "dist/img/user2-160x160.jpg",
			title: '软件工程师',
			member_count: 150,
			genre: ['资讯', '日记'],
			followed: 2
		}]);
});

router.get('/getfollowed', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json([{
			id: 111,
			name: "刘美义",
			img: "dist/img/user2-160x160.jpg",
			title: '软件工程师',
			followed: 1
		}]);
});

router.get('/deleteMoment', function(req, res, next){
	console.log(req.body);
	console.log(req.query);
	res.json([{
			id: 111,
			name: "刘美义",
			img: "dist/img/user2-160x160.jpg",
			title: '软件工程师',
			followed: 1
		}]);
});
router.route('/editmoment')
	.get(function(req,res,next){
		console.log(req.body);
		console.log(req.query);
		res.json({
					id: 54315,
					user_id: 1,
					user_name: "张振宇",
					user_img: "dist/img/avatar.png",
					user_followers: 123,
					user_blogs: 456, //发表总文章数
					user_bestblogs: 789, //用户精华帖
					followed: 2, // 0: 自己 1: 已关注 2：未关注
					
					title: "这是一个标题",
					content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">更有人曝光了她在《宫锁心玉》中的驼背形象。</blockquote><img src="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_b.jpg" data-rawwidth="550" data-rawheight="367" class="origin_image zh-lightbox-thumb" width="550" data-original="https://pic2.zhimg.com/v2-471b7bb01032c98e7d70ff3af1e1ecb1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">客观点说，杨幂的各方面条件还是满足了大部分男人的审美：<span style="box-sizing: inherit; font-weight: 700;">美颜+大胸。<br style="box-sizing: inherit;"></span>但是杨幂在这部戏里频繁的出现驼背、耸肩的动作，确实是让人大跌眼镜，也难怪让人发出瞬间出戏的感叹！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit;">但好像还是有好消息的，听说在看这部电视剧的时候，无论是男人还是女人，都是这样的姿势。<br style="box-sizing: inherit;"></p><img src="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_b.jpg" data-rawwidth="424" data-rawheight="341" class="origin_image zh-lightbox-thumb" width="424" data-original="https://pic3.zhimg.com/v2-79e6c260b375a2bd21184d92acb7846e_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">平时总有朋友私信我，该如何改变驼背？<br style="box-sizing: inherit;">下面就由龚Sir教大家几个简单的办法，来避免、改变我们的身体形态。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">首先一定要强调，所有的训练以及拉伸动作，都只能帮助因为习惯和姿势等问题造成的驼背现象！</span></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">如果你是先天骨骼问题导致驼背，请及时找医生检查！<br style="box-sizing: inherit;"></p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">好啦，让我们开始吧。</p><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">一、芭蕾舞者的直立标准</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">说到驼背，很多人强调：要抬头挺胸！</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">认为“抬头挺胸”是直立的标准，其实这就和“真正的直立”走远了。</span></p><img src="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_b.jpg" data-rawwidth="1280" data-rawheight="720" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic2.zhimg.com/v2-07a6629964b4aa215bf8d7956a85d7b1_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">真正的<span style="box-sizing: inherit; font-weight: 700;">直立是以后背为标准</span>，也就是说：“尾椎、肩胛骨、后脑勺”，连成一条与地面垂直的直线</p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">这就是芭蕾舞者高挑挺拔的秘诀</span></blockquote><img src="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_b.jpg" data-rawwidth="1600" data-rawheight="1200" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic4.zhimg.com/v2-4c02027bf1478fc1a26319b97087c8bb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_b.jpg" data-rawwidth="1280" data-rawheight="960" class="origin_image zh-lightbox-thumb" width="1280" data-original="https://pic3.zhimg.com/v2-2526bca6f76b80dd83ba94cc9cfd0df2_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><span style="box-sizing: inherit; font-weight: 700;">二、拉伸自己的肌肉</span></p><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">许多年轻人有驼背的情况，大多是因为大家都是低头族。去公司的路上看手机、工作时弯着腰坐在电脑前、打王者荣耀恨不得把头钻到屏幕里去。</blockquote><ul style="box-sizing: inherit; margin: 20px 0px; padding: 0px 0px 0px 24px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><li style="box-sizing: inherit; list-style-type: disc; margin-top: 10px; list-style-position: outside;"><span style="box-sizing: inherit; font-weight: 700;">长期以来的错误姿势，导致了肌肉的僵化。</span><br style="box-sizing: inherit;"></li></ul><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这里有三个动作，无论是在办公室还是在家里都可以轻松拉伸到你的脖子和肩膀。</p><img src="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic1.zhimg.com/v2-4384e7d0544ea218639ace84637882a4_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_b.jpg" data-rawwidth="922" data-rawheight="1280" class="origin_image zh-lightbox-thumb" width="922" data-original="https://pic2.zhimg.com/v2-9794c3128a334da1239cf3cbd2a3cda5_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">在拉伸肌肉过后，每个人都有不同的感受，有人酸痛，有人会觉得很舒服，这些都是正常现象。</blockquote><p style="box-sizing: inherit; margin-top: 20px; margin-bottom: 20px; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">别急，还没结束，在拉伸过后还有更重要的事情！那就是为你的肌肉训练出一个强壮且美丽的样子。</p>',
					datetime: "2015-07-13 08:05", //时间
					genre: 2, // 大分类
					tags: [1,2], // 小标签
					sharedwith: [1,2], //分享范围，是否需要？？？
					total_like: 8056, //总点赞人数
					like: 0, //我是否点赞
					star: 1, //我是否加星
					
					comments: [{
						user_id: 2574,
						user_name: "刘美义",
						user_img: "dist/img/user2-160x160.jpg",
						
						to_id: -1, //回复用户id
						to_name: "", //回复用户姓名
						content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &ps://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
						datetime: "2015-07-13 08:05",
					},{
						user_id: 2574,
						user_name: "刘美义",
						user_img: "dist/img/user2-160x160.jpg",
						
						to_id: -1, //回复用户id
						to_name: "", //回复用户姓名
						content: '<span style="box-sizing: inherit; font-weight: 700; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">三生三世十里桃花》刚刚结束，大家就对杨幂的驼背进行了疯狂吐槽。</span><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;">这也是情理之中，作为四海八荒第一美人，一个转身驼背，无论多么入戏的眼神，都会让我有一种瞬间出戏的错觉。<br style="box-sizing: inherit;"></blockquote><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><img src="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_b.jpg" data-rawwidth="600" data-rawheight="338" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic4.zhimg.com/v2-c41f671b1b2251951c818c985f3351eb_r.jpg" style="box-sizing: inherit; overflow: hidden; max-width: 100%; display: block; margin: 1.5em auto; cursor: -webkit-zoom-in; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><br style="box-sizing: inherit; font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: medium;"><blockquote style="box-sizing: inherit; padding-left: 1.2em; margin-top: 20px; border-left-width: 4px; border-left-color: rgb(226, 227, 228); font-family: -apple-system, &quot;Helvetica Neue&quot;, Arial, ps://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
						datetime: "2015-07-13 08:05",
					},{
						user_id: 2574,
						user_name: "刘美义",
						user_img: "dist/img/user2-160x160.jpg",
						
						to_id: -1, //回复用户id
						to_name: "", //回复用户姓名
						content: '<div>作者：Airbnb<br>链接：https://zhuanlan.zhihu.com/p/23528322<br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br><br><p>在风云变幻的都市上海，有这样的一块地方，完整地保留了民国时期的浮华与沧桑，那就是今天旅行者都不会错过的上海原法租界。虽然我们已经远离了那个年代，但只要在Airbnb上预定一间上海原法租界的房子，你就可以瞬间穿越回斑驳的1943，感受民国租界里的生活的滋味。</p><p><b>1、复古挑高华美百年洋房</b></p><img src="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-7d3c427193fffc7f98a3eebd4430386a_r.jpg"><p>这间被称作“时间胶囊”的民宿凭借优越的地理位置以及独特的室内装潢，吸引了不少Airbnb的房客。虽然面积不大，但空间布局和每一处细小的装潢都独具特色。</p><img src="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic1.zhimg.com/v2-5ff476b80d341c47cb4711d25b0813cc_r.jpg"><p>房间里的罗马柱和清一色地木质家具，仿佛重回1943的老上海。房东大量的藏书，让人觉得好像来到了20世纪初的欧洲私人图书馆，沉浸在阅读的欢愉中，与外面的都市喧嚣全然隔绝。<br></p><img src="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-fb48bac01e7fb47c071770f06981312e_r.jpg"><p>房间的厨房小巧玲珑，但可以称得上是空间利用的典范，即便是在这小小的空间里，做出一顿法式大餐也是完全可能的。<br></p><img src="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_b.jpg" data-rawwidth="1651" data-rawheight="1101" class="origin_image zh-lightbox-thumb" width="1651" data-original="https://pic3.zhimg.com/v2-e4860954a3e40065011af7fb8b2de0c6_r.jpg"><p>4米挑高阁楼上的卧室既保有整个房间的古朴元素，又加入了一些现代的装饰，角落里摆放的埃菲尔铁塔懒人沙发在昭示着这间房子与法国千丝万缕的关联。<br></p><img src="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_b.jpg" data-rawwidth="852" data-rawheight="640" class="origin_image zh-lightbox-thumb" width="852" data-original="https://pic2.zhimg.com/v2-2b0a8a5972b6a407c696b1aa9190c8f5_r.jpg"><p>房子对面就有法租界里有名的酒吧和咖啡馆，如果觉得一个人在屋里无聊的话，买杯咖啡，在对街看看这栋有一百年历史的老房子，读一读《上海法租界史》，说不定你住的民宿还会出现在书里某张泛黄的照片里哦。</p><br><p><b>2、法租界优雅的孔雀吱屋</b></p><img src="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-0533dd82c7f4b5f0996345ecd3d46f5f_r.jpg"><p>这间位于石库门洋房一楼的loft民宿有一个特别的名字，叫“雀吱”。跟孔雀那高傲的美艳一样，这家民宿也是大有来头，曾经风靡上海滩的大明星胡蝶就曾居住于此。</p><img src="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_b.jpg" data-rawwidth="4200" data-rawheight="2804" class="origin_image zh-lightbox-thumb" width="4200" data-original="https://pic4.zhimg.com/v2-346b8d7d80af1403ea71a5cee61f3b6f_r.jpg"><p>为了方便房客入住，房子的主人特意改造了独门独户的入口，门厅的设计也满满都是中式古朴感，两侧镂雕花卉纹的木质柜子，装饰以铜制吊扣和拉手，散发着时间流逝的芳香。</p></div>',
						datetime: "2015-07-13 08:05",
					}] // 评论
				});
	}).post(function(req,res,next){
		console.log(req.body);
		console.log(req.query);
		res.json({abc:1});
	});
	
	
router.route("/editprofile")
	.post(function(req, res, next){
		  //生成multiparty对象，并配置上传目标路径
			var form = new multiparty.Form({uploadDir: './public'});
		  //上传完成后处理
		  form.parse(req, function(err, fields, files) {
				var filesTmp = JSON.stringify(files,null,2);
				console.log(fields);
				if(err){
					console.log('parse error: ' + err);
					res.json({error: 'error!!!!'});
				}else{
					console.log(fields);
					res.status(200);
					res.send('oops');;
				}
			});
});

router.get('/getfeatruedgroup', function(req, res, next) {
  console.log(req.query);
	res.json([{
		id: 123,
		name: '群组名称',
		authority: 1,
		bg_img: 'dist/img/photo1.png',
		img: 'dist/img/default6.png',
		introduction: '这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介',
		genre: [1,2,4,5],
		member_count: 15
	},{
		id: 123,
		name: '群组名称',
		authority: 0,
		bg_img: 'dist/img/photo1.png',
		img: 'dist/img/default6.png',
		introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
		genre: [1,2,4,5],
		member_count: 15
	},{
		id: 123,
		name: '群组名称',
		authority: 1,
		bg_img: 'dist/img/photo1.png',
		img: 'dist/img/default6.png',
		introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
		genre: [1,2,4,5],
		member_count: 15
	}]);
});


router.get('/searchmoment', function(req, res, next) {
  console.log(req.query);
	if(req.query.q)
		res.json([{
			id: 1,
			text: '按名称搜索',
			img: 'dist/img/default6.png',
			count: 3,
			list: [{
			id: 123,
			name: '群组名称',
			authority: 1,
			bg_img: 'dist/img/photo1.png',
			img: 'dist/img/default6.png',
			introduction: '这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介这是一条简介',
			genre: [1,2,4,5],
			member_count: 15
		},{
			id: 123,
			name: '群组名称',
			authority: 0,
			bg_img: 'dist/img/photo1.png',
			img: 'dist/img/default6.png',
			introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
			genre: [1,2,4,5],
			member_count: 15
		},{
			id: 123,
			name: '群组名称',
			authority: 1,
			bg_img: 'dist/img/photo1.png',
			img: 'dist/img/default6.png',
			introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
			genre: [1,2,4,5],
			member_count: 15
		}]
		},{
			id: 2,
			text: '按类别搜索',
			img: 'dist/img/ecommerce-tag-icon.png',
			count: 0,
			list: []
		},{
			id: 3,
			text: '按标签搜索',
			img: 'dist/img/Pencil-icon.gif',
			count: 1,
			list: [{
			id: 123,
			name: '群组名称',
			authority: 1,
			bg_img: 'dist/img/photo1.png',
			img: 'dist/img/default6.png',
			introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
			genre: [1,2,4,5],
			member_count: 15
		}]
		},{
			id: 4,
			text: '按手机搜索',
			img: 'dist/img/dentist-rochester-ny--contemporary-dentistry-rochester-ny-24.png',
			count: 0,
			list: [{
			id: 123,
			name: '群组名称',
			authority: 1,
			bg_img: 'dist/img/photo1.png',
			img: 'dist/img/default6.png',
			introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
			genre: [1,2,4,5],
			member_count: 15
		}]
		},{
			id: 5,
			text: '按邮件搜索',
			img: 'dist/img/email.png',
			count: 5,
			list: [{
			id: 123,
			name: '群组名称',
			authority: 1,
			bg_img: 'dist/img/photo1.png',
			img: 'dist/img/default6.png',
			introduction: '这是一条简介这是一条简介这是一条简介这是一条简介',
			genre: [1,2,4,5],
			member_count: 15
		}]
		}]);
	else
		res.json([]);
});
router.get('/applytojoingroup', function(req, res, next) {
  console.log(req.query);
	res.json({abc:1});
});

router.get('/reportmoment', function(req, res, next) {
  console.log(req.query);
	res.json({abc:1});
});

router.get('/layout_group', function(req, res, next) {
	res.render('layout_group');
});

router.get('/individual_posts', function(req, res, next) {
	res.render('individual_posts');
});

router.get('/individual_collection', function(req, res, next) {
	res.render('individual_collection');
});

router.get('/individual_collection_tags', function(req, res, next) {
	res.render('individual_collection_tags');
});
router.get('/individual_collection_tag_posts', function(req, res, next) {
	res.render('individual_collection_tag_posts');
});

router.get('/individual_friends', function(req, res, next) {
	res.render('individual_friends');
});

router.get('/individual_followingindividual', function(req, res, next) {
	res.render('individual_followingindividual');
});

router.get('/individual_followed', function(req, res, next) {
	res.render('individual_followed');
});

router.get('/individual_followinggroups', function(req, res, next) {
	res.render('individual_followinggroups');
});

router.get('/individual_tags', function(req, res, next) {
	res.render('individual_tags');
});

router.get('/individual_tag_home', function(req, res, next) {
	res.render('individual_tag_home');
});

router.get('/individual_test', function(req, res, next) {
	res.render('individual_test');
});

//Group
router.get('/group_index', function(req, res, next) {
	res.render('group_index');
});

router.get('/getgroupdata', function(req, res, next) {
	if(req.query.id == 1)
		res.json({
			temp: '管理员',
			name: '交托帮',
			image: 'dist/img/default6.png',
			bg: 'dist/img/default_group_bg.jpg',
			numberofmembers: '15',
			description: '几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等',
			genre: ['资讯', '日记', '视频'],
			topic: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
			followed: 1,
			isMember: 1,
			dataMenu: [
				{
					name: '群组信息',
					action: '$().createEditGroupModal({'+
													'authority: 1,'+
													'temp: \'普通成员\','+
													'name: \'交托帮\','+
													'image: \'dist/img/default6.png\','+
													'bg: \'dist/img/default_group_bg.jpg\','+
													'numberofmembers: \'15\','+
													'description: \'几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等\','+
													'genre: [\'资讯\', \'日记\', \'视频\'],'+
													'topic: [\'设计\', \'交叉口设计\', \'信号灯设计\', \'统计\', \'软件工程\']});'
				},{
					name: '设置',
					action: '$(\'#modal-group-privacy\').modal(\'show\');'
				},{
					name: '成员管理',
					sublist: [
						{
							name: '新成员申请',
							action: 'initModalListBlock(\'新成员申请\', data_userlist_1, 3);'
						},{
							name: '成员列表',
							action: 'initModalTag(\'成员\', \'face\', data_userlist_1, data_userlist_2, \'action1\', \'action2\');'
						},
						{
							name: '身份设定',
							action: 'alert(1)'
						},
						{
							name: '成员设定',
							action: 'alert(2)'
						}
					]
				},{
					name: '黑名单',
					action: 
					'$().singleRowModal({' +
					'	title: \'测试窗口\',' +
					'	data: data_userlist_2,' +
					'	funcCard1: createUserCard,' +
					'	actionMenu: [' +
					'		{' +
					'			name: \'移出黑名单\',' +
					'			action: \'/test123\'' +
					'		}' +
					'	],' +
					'	funcCard2: createModalFunctionCardHTML1,' +
					'	funcCardInput2: {' +
					'		title: \'新增头衔\',' +
					'		cardTitle: \'添加头衔\',' +
					'		action: \'/test123\'' +
					'	},' +
					'});'
				},{
					name: '产品与服务',
					action: '$(\'#modal-test\').modal(\'show\');'
				},{
					name: '账号与安全',
					action: ''
				},{
					name: '定位',
					action: 'alert(1);'
				},{
					name: '投诉',
					action: 'alert(1);'
				},{
					name: '费用',
					action: 'alert(1);'
				},{
					name: '删除并退出',
					action: 'alert(1);'
				}
			],
			navtop1: {
				title: '群组',
				name: '张震宇',
				image: 'dist/img/avatar04.png',
			},
			navtop2:[
				{
					name: '群公告',
					action: ''
				},
				{
					 name: '群动态',
					 action: ''
				},
				{
					name: '群成员',
					sublist: [
						{
							name: '成员列表',
							action: ''
						},
						{
							name: '群加入申请',
							action: ''
						}
					]
				},
				{
					name: '关注群用户',
					action: ''
				},
				{
					name: '群问题',
					action: ''
				},
				{
					name: '群任务',
					action: ''
				}
			],
			btnrightbot:[
				{
					title: '创建群组',
					icon: 'fa-user-plus',
					action: '$().createNewGroupModal()'
				},
				{
					title: '查看群文件',
					icon: 'fa-folder-open-o',
					action: '$(transCloudModal).transCloud({title: \'文件管理\', dirFull: \'/TransCloud/交托帮\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML})'
				},
				{
					title: '创建群任务',
					icon: 'fa-tasks',
					action: ''
				},
				{
					title: '发布群动态',
					icon: 'fa-pencil',
					action: ''
				},
			]
		});
	else if(req.query.id == 2)
		res.json({
			temp: '普通游客',
			name: '交托帮',
			image: 'dist/img/default6.png',
			bg: 'dist/img/default_group_bg.jpg',
			numberofmembers: '15',
			description: '几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等',
			genre: ['资讯', '日记', '视频'],
			topic: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
			followed: 0,
			isMember: 0,
			dataMenu: [],
			navtop1: {
				title: '群组',
				name: '张震宇',
				image: 'dist/img/avatar04.png',
			},
			navtop2:[
				{
					name: '群公告',
					action: ''
				},
				{
					 name: '群动态',
					 action: ''
				},
				{
					name: '关注者',
					action: ''
				}
			],
			btnrightbot:[
				{
					title: '创建群组',
					icon: 'fa-user-plus',
					action: '$().createNewGroupModal()'
				}
			]
		});
	else if(req.query.id == 3)
		res.json({
			temp: '普通成员',
			name: '交托帮',
			image: 'dist/img/default6.png',
			bg: 'dist/img/default_group_bg.jpg',
			numberofmembers: '15',
			description: '几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等',
			genre: ['资讯', '日记', '视频'],
			topic: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
			followed: 1,
			isMember: 1,
			dataMenu: [
				{
					name: '群组信息',
					action: '$().createEditGroupModal({'+
													'authority: 0,'+
													'temp: \'普通成员\','+
													'name: \'交托帮\','+
													'image: \'dist/img/default6.png\','+
													'bg: \'dist/img/default_group_bg.jpg\','+
													'numberofmembers: \'15\','+
													'description: \'几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等\','+
													'genre: [\'资讯\', \'日记\', \'视频\'],'+
													'topic: [\'设计\', \'交叉口设计\', \'信号灯设计\', \'统计\', \'软件工程\']});'
				},{
					name: '退出群组',
					action: 'callAlert(\'退出群组\',\'done\', 0);;'
				}
			],
			navtop1: {
				title: '群组',
				name: '张震宇',
				image: 'dist/img/avatar04.png',
			},
			navtop2:[
				{
					name: '群公告',
					action: ''
				},
				{
					 name: '群动态',
					 action: ''
				},
				{
					name: '群成员',
					sublist: [
						{
							name: '成员列表',
							action: ''
						},
						{
							name: '群加入申请',
							action: ''
						}
					]
				},
				{
					name: '关注群用户',
					action: ''
				},
				{
					name: '群问题',
					action: ''
				},
				{
					name: '群任务',
					action: ''
				}
			],
			btnrightbot:[
				{
					title: '创建群组',
					icon: 'fa-user-plus',
					action: '$().createNewGroupModal()'
				},{
					title: '查看群文件',
					icon: 'fa-folder-open-o',
					action: '$(transCloudModal).transCloud({title: \'文件管理\', dirFull: \'/TransCloud/交托帮\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML})'
				}
			]
		});
});



router.get('/test', function(req, res, next) {
	res.render('test');
});

router.get('/test123', function(req, res, next) {
	console.log(req.query)
	res.json(1);
});

router.get('/test456', function(req, res, next) {
	console.log(req.query)
	res.json(1);
});

router.get('/createGroup', function(req, res, next) {
	console.log(req.query)
	res.json({id: 123});
});

router.get('/getgroupgenres', function(req, res, next) {
	console.log(req.query)
	res.json({
		avaliable: [
			{	id: 2,
				name: '设计'
			},{	id: 3,
				name: '交叉口设计'
			},{	id: 4,
				name: '信号灯设计'
			},{	id: 5,
				name: '统计'
			},{	id: 6,
				name: '软件工程'
			}
		],
		current: [
			{	id: 11,
				name: '设计'
			},{	id: 12,
				name: '日记'
			},{	id: 13,
				name: '视频'
			}
		]
	});
});

router.get('/getgrouptopic', function(req, res, next) {
	console.log(req.query)
	res.json({
		avaliable: [
			{	id: 2,
				name: '设计'
			},{	id: 3,
				name: '交叉口设计'
			},{	id: 4,
				name: '信号灯设计'
			},{	id: 5,
				name: '统计'
			},{	id: 6,
				name: '软件工程'
			}
		],
		current: [
			{	id: 11,
				name: '设计'
			},{	id: 12,
				name: '日记'
			},{	id: 13,
				name: '视频'
			}
		]
	});
});

router.get('/gerfilemenu', function(req, res, next) {
	console.log(req.query);
	if(req.query.authority == 1){
		if(req.query.type == 1){
			//文件
			res.json({
				dir: req.query.dir,
				type: 1,
				list:[{
					name: '打开',
					action: 'window.open(\'' + req.query.dir + '\');'
				},{
					name: '下载',
					action: 'console.log' 
				},{
					name: '复制',
					action: '$(transCloudModal).copyFile({dir: \'' + req.query.dir + '\'});' 
				},{
					name: '删除',
					action: '$(transCloudModal).deleteFile({dirTarget: \'' + req.query.dir + '\', dirFull: \'' + req.query.dirFolder + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
				},{
					name: '分享',
					action: 'console.log'
				},{
					name: '访问权限',
					action: 'console.log'
				}]
			});
		}else if(req.query.type == 2){
			//文件夹
			if(req.query.dirCopy == ""){
				res.json(
					{
						dir: '/交托帮/测试文件',
						type: 2,
						list:[{
							name: '打开',
							action: '$(transCloudModal).reloadTransCloud({dirFull: \'' + req.query.dir + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
						},{
							name: '删除',
							action: '$(transCloudModal).deleteFolder({dirTarget: \'' + req.query.dir + '\', dirFull: \'' + req.query.dirFolder + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
						},{
							name: '分享',
							action: 'console.log'
						},{
							name: '访问权限',
							action: 'console.log'
						},{
							name: '属性',
							action: 'console.log'
						}]
					}
				);
			}else{
				res.json(
					{
						dir: '/交托帮/测试文件',
						type: 2,
						list:[{
							name: '打开',
							action: '$(transCloudModal).reloadTransCloud({dirFull: \'' + req.query.dir + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
						},{
							name: '粘贴',
							action: '$(transCloudModal).pasteFile({dirTarget: \'' + req.query.dir + '\', dirFull: \'' + req.query.dirFolder + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});' 
						},{
							name: '删除',
							action: '$(transCloudModal).deleteFolder({dirTarget: \'' + req.query.dir + '\', dirFull: \'' + req.query.dirFolder + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
						},{
							name: '分享',
							action: 'console.log'
						},{
							name: '访问权限',
							action: 'console.log'
						},{
							name: '属性',
							action: 'console.log'
						}]
					}
				);
			}
		}else if(req.query.type == 3){
			
			if(req.query.dirCopy == ""){
				res.json({
					dir: '/交托帮/测试文件',
					type: 2,
					list:[{
						name: '添加文件',
						action: '$(transCloudModal).uploadFile({dirFull: \'' + req.query.dir + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
					},{
						name: '创建文件夹',
						action: '$(transCloudModal).createTransFolder({dirFull: \'' + req.query.dir + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
					},{
						name: '分享',
						action: 'console.log'
					},{
						name: '访问权限',
						action: 'console.log'
					},{
						name: '属性',
						action: 'console.log'
					}]
				});
			}else{
				res.json({
					dir: '/交托帮/测试文件',
					type: 2,
					list:[{
						name: '添加文件',
						action: '$(transCloudModal).uploadFile({dirFull: \'' + req.query.dir + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
					},{
						name: '创建文件夹',
						action: '$(transCloudModal).createTransFolder({dirFull: \'' + req.query.dir + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
					},{
						name: '粘贴',
						action: '$(transCloudModal).pasteFile({dirTarget: \'' + req.query.dir + '\', dirFull: \'' + req.query.dirFolder + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});' 
					},{
						name: '分享',
						action: 'console.log'
					},{
						name: '访问权限',
						action: 'console.log'
					},{
						name: '属性',
						action: 'console.log'
					}]
				});
			}
			
			
		}else{
			
		}
	}else{
		if(req.query.type == 1){
			//文件
			res.json({
				dir: req.query.dir,
				type: 1,
				list:[{
					name: '打开',
					action: 'window.open(\'' + req.query.dir + '\');'
				},{
					name: '下载',
					action: 'console.log' 
				}]
			});
		}else if(req.query.type == 2){
			//文件夹
			if(req.query.dirCopy == ""){
				res.json(
					{
						dir: '/交托帮/测试文件',
						type: 2,
						list:[{
							name: '打开',
							action: '$(transCloudModal).reloadTransCloud({dirFull: \'' + req.query.dir + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
						},{
							name: '属性',
							action: 'console.log'
						}]
					}
				);
			}else{
				res.json(
					{
						dir: '/交托帮/测试文件',
						type: 2,
						list:[{
							name: '打开',
							action: '$(transCloudModal).reloadTransCloud({dirFull: \'' + req.query.dir + '\', dirRoot: \'/TransCloud\', dataRequest: \'/getFileFolder\', createCard: createFileCardHTML});'
						},{
							name: '属性',
							action: 'console.log'
						}]
					}
				);
			}
		}else if(req.query.type == 3){
			
			if(req.query.dirCopy == ""){
				res.json({
					dir: '/交托帮/测试文件',
					type: 2,
					list:[
					{
						name: '属性',
						action: 'console.log'
					}]
				});
			}else{
				res.json({
					dir: '/交托帮/测试文件',
					type: 2,
					list:[{
						name: '属性',
						action: 'console.log'
					}]
				});
			}
			
			
		}else{
			
		}
	}
	
});


router.get('/getFileFolder', function(req, res, next) {
	console.log(req.query);
	var path = transCloudPath + req.query.dir;
	var result = []
	console.log("******************************");
	console.log(path);
	
	fs.readdir(path, (err, files) => {
		files.forEach(file => {
			var stats = fs.statSync(path + '/' + file);
			if(stats.isFile()){
				var data = {
					type: 1,
					dir: req.query.dir + '/' + file,
					name: file,
					icon: 'insert_drive_file',
					bgcolor: 'rgb(29, 135, 228)'
				}
				result.push(data);
			}else if(stats.isDirectory()){
				var data = {
					type: 2,
					dir: req.query.dir + '/' + file,
					name: file,
					icon: 'folder_open',
					bgcolor: 'rgb(119, 143, 155)'
				}
				result.push(data);
			}else{
				
			}
			//console.log(stats.isFile());
			//console.log(stats.isDirectory());
		});
		res.json(result);
	});
});

router.get('/createFolder', function(req, res, next) {
	console.log(req.query);
	var path = transCloudPath + req.query.dir;
	var dir = path + '/' + req.query.name;

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
		res.json(1);	
	}else{
		res.json(0);
	}
});

router.get('/deletefile', function(req, res, next) {
	console.log(req.query);
	
	var path = transCloudPath + req.query.dir;
	fs.unlink(path, (err) => {
		if (err) throw err;
		//console.log('successfully deleted /tmp/hello');
		res.json(1);
	});

});

router.get('/deletefolder', function(req, res, next) {
	console.log(req.query);
	
	var path = transCloudPath + req.query.dir;
	rimraf(path, function () {
		console.log('done'); 
		res.json(1);
	});
});

router.get('/movefile', function(req, res, next) {
	//console.log(req.query);
	var oldpath = transCloudPath + req.query.dirItem;
	var newpath = transCloudPath + req.query.dirTarget + '/' + path.basename(req.query.dirItem);
	console.log(oldpath, newpath);
	fs.rename(oldpath, newpath, function (err) {
		if (err) throw err;
		res.json(1);
	});
});

router.get('/copyfile', function(req, res, next) {
	var dirFile = transCloudPath + req.query.dirItem;
	var dirFolder = transCloudPath + req.query.dirTarget + '/' + path.basename(req.query.dirItem);
	fs.createReadStream(dirFile).pipe(fs.createWriteStream(dirFolder));
	res.json(1);
});




router.post('/uploadfile', function(req, res, next) {
	//console.log(req.form);
	console.log(req.params);
	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({uploadDir: './public'});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		console.log(fields);
		//console.log(files['filesupload']);
		files['filesupload'].forEach(function(item, index){
			/* console.log(item); */
			console.log(index);
			var oldpath = 'C:/Users/Sven/Desktop/Transtopia-UI/GroupServer/' + item.path;
			var newpath = transCloudPath + fields.dir[index] + '/' + item.originalFilename;
			console.log(oldpath, newpath);
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err;
			}); 
		});
		/* var oldpath = files.filetoupload.path;
		var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
		fs.rename(oldpath, newpath, function (err) {
			if (err) throw err;
			res.write('File uploaded and moved!');
			res.end();
		}); */
		//var filesTmp = JSON.stringify(files,null,2);
		//console.log(filesTmp);
		if(err){
			console.log('parse error: ' + err);
			res.json({error: 'error!!!!'});
		}else{
			/* console.log(fields);
			res.status(200);
			res.send('oops'); */
			res.json('success');
		}
	});
});

/* 整合开始 */
router.get('/group/operation/get-instance/:gid', function(req, res, next) {
	var flag = 1;
	if(Math.random() >= 0.9)
		res.json(0);
	else
		res.json({
			id: '123',
			name: '交托帮', 
			datetime: '2017-07-05',
			image: 'dist/img/default6.png', 
			bg_image: 'dist/img/default_group_bg.jpg', 
			admin_id: '001', 
			spaceNumber: '500G', 
			innerGroupNumber: 114, 
			memberSize: 500,
			country: '中国', 
			province: '湖北', 
			city: '武汉', 
			town: '汉阳', 
			address: '滨江花园188号',
			category: ['资讯', '日记', '视频'], 
			tags: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'], 
			introduction: '几何设计、交通组织设计、交通设施、水泥混凝土路面的板块划分、竖向设计及排水设计等',
			reportinfo: [],
			notices: [], //???
			followers: [], //{uid, datetime}, 
			members: [], //{uid, role:int--1-superadmin 2-admin 3-self-admin 4-member 5-follower 6 guest , roleinfo: string[]},
			wait_members: [], //{uid, datetime, note}, 
			shareposts: [], //{uid, pid, share_note, share_datetime},
			blacklist: [],  //ids, 
			allow_post_notice: 1,
			allow_new_member_in: 0, 
			allow_group_share: 1, 
			allow_post_share_following: 0,
			allow_new_following: 1, 
			allow_new_member_validation: 1, 
			role: 5, 
			roleinfo: [2,3,4,6,7,8,9,11,12,16,17,18,19,20,21,22,23,24,25,101,102], 
			slef_admin_info: [], 
			isFollower: 0,
			isMember: 1
		});
});

router.get('/group/chen-operation/26/123/0/0', function(req, res, next) {
	console.log(req.query);
	res.json(Math.floor((Math.random()*2)));
	//res.json(0);
});
router.get('/group/chen-operation/25/123', function(req, res, next) {
	console.log(req.query);
	res.json(Math.floor((Math.random()*2)));
	//res.json(0);
});


router.get('/get-current-user', function(req, res, next){
	
	if(Math.random() >= 0.5){
		res.json({
			id: 123,
			name: '张震宇',
			introduction: '2012年本科毕业于清华大学计算机系',
			titles: ['软件工程师', '前端工程师'],
			cates: ['资讯', '日记', '视频'],
			tags: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
			image: 'dist/img/avatar04.png',
			bg_image: 'dist/img/default_group_bg.jpg',
			country: '中国', 
			province: '湖北', 
			city: '武汉', 
			town: '汉阳', 
			address: '滨江花园188号',
		});
	}else{
		res.json(0);
	}	
});

router.post('/uploadfile_beta/123', function(req, res, next) {
	//console.log(req.form);
	console.log(req.params);
	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({uploadDir: './public'});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		//console.log(files['filesupload']);
		var path;
		files['filesupload'].forEach(function(item, index){
			/* console.log(item); */
			console.log(index);
			var oldpath = 'C:/Users/Sven/Desktop/Transtopia-UI/GroupSever/' + item.path;
			var newpath = transCloudPath +  '/' + item.originalFilename;
			path = item.path;
			console.log(oldpath, newpath);
			/*
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err;
			});
			*/
		});
		/* var oldpath = files.filetoupload.path;
		var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
		fs.rename(oldpath, newpath, function (err) {
			if (err) throw err;
			res.write('File uploaded and moved!');
			res.end();
		}); */
		//var filesTmp = JSON.stringify(files,null,2);
		//console.log(filesTmp);
		if(err){
			console.log('parse error: ' + err);
			res.json(0);
		}else{
			/* console.log(fields);
			res.status(200);
			res.send('oops'); */
			res.json(path.replace('\\', '/'));
		}
	});
});

router.get('/addcatagory', function(req, res, next){
	console.log(1);
	res.json(1);
});

router.get('/all-tag-cate-info', function(req, res, next){
	res.json({
		category_list: ["资讯","资源","日记","知识","工具","教学","提问","产品","直播","LOL","AI","咨询","论文","科研","项目报告","MSI","我的世界","名片"], 
		tags_list: ["交叉口设计","城市规划","交通流量统计","绘图","设计","游戏设计","篮球","PND","DLL","Movie","检测器","交通控制","安全","高效","鲁棒","研究性学习","优化","科研","会议","图论","报告","TCRP","公交","智慧城市","智慧交通","共享经济","人工智能","ACRP","研究","桥梁","铁路桥","求职","教职","车联网","编程工具","在线教学","产品需求","算法设计","游戏管理","SONGS","NBA","POR","test"], 
		titles_list: []
	});
});
router.get('/group/chen-operation/4', function(req, res, next){
	res.json(1);
});
router.get('/group/chen-operation/6', function(req, res, next){
	res.json(1);
});


router.get('/group/chen-operation/3', function(req, res, next){
	res.json(["资讯","资源","日记","知识","工具","教学","提问","产品","直播","LOL","AI","咨询","论文","科研","项目报告","MSI","我的世界","名片"]);
});
router.get('/group/chen-operation/4/123456', function(req, res, next){
	res.json({
		name: 123456
	})
});

router.get('/group/chen-operation/5', function(req, res, next){
	res.json(["交叉口设计","城市规划","交通流量统计","绘图","设计","游戏设计","篮球","PND","DLL","Movie","检测器","交通控制","安全","高效","鲁棒","研究性学习","优化","科研","会议","图论","报告","TCRP","公交","智慧城市","智慧交通","共享经济","人工智能","ACRP","研究","桥梁","铁路桥","求职","教职","车联网","编程工具","在线教学","产品需求","算法设计","游戏管理","SONGS","NBA","POR","test"]);
});

router.get('/group/chen-operation/6/123456', function(req, res, next){
	res.json({
		name: 123456
	})
});

router.get('/group/operation/get-blacklist/123', function(req, res, next){
	if(Math.random() >= 0.05){
		res.json([
			{
				id: 123,
				name: '张震宇',
				image: 'dist/img/user1-128x128.jpg'
			},{
				id: 456,
				name: '刘强',
				image: 'dist/img/user2-160x160.jpg'
			},{
				id: 789,
				name: '方怡',
				image: 'dist/img/user3-128x128.jpg'
			}
		]);
	}else{
		res.json(0);
	}
});
router.get('/group/operation/remove-user-blacklist/123/123', function(req, res, next){
	if(Math.random() >= 0.05){
		res.json(1);
	}else{
		res.json(0);
	}
});

router.get('/group/get-category/123', function(req, res, next){
	if(Math.random() >= 0.05){
		res.json(['资讯', '日记', '视频']);
	}else{
		res.json(0);
	}
});

/* 类别 */
router.get('/group/operation/get-all-category/', function(req, res, next){
	if(Math.random() >= 0.05){
		res.json(["资讯","资源","日记","知识","工具","教学","提问","产品","直播","LOL","AI","咨询","论文","科研","项目报告","MSI","我的世界","名片"]);
	}else{
		res.json(0);
	}
});

router.get('/group/operation/add-category/:name', function(req, res, next){
	res.json({name: '测试数据'});
});

router.get('/group/operation/update-category/123', function(req, res, next){
	console.log(req.query);
	if(Math.random() >= 0.5){
		res.json(1);
	}else{
		res.json(0);
	}
});

/* 兴趣 */
router.get('/group/get-tag/123', function(req, res, next){
	if(Math.random() >= 0.05){
		res.json(['设计', '交叉口设计', '信号灯设计', '统计', '软件工程']);
	}else{
		res.json(0);
	}
});

router.get('/group/operation/get-all-tag/', function(req, res, next){
	if(Math.random() >= 0.05){
		res.json(["交叉口设计","城市规划","交通流量统计","绘图","设计","游戏设计","篮球","PND","DLL","Movie","检测器","交通控制","安全","高效","鲁棒","研究性学习","优化","科研","会议","图论","报告","TCRP","公交","智慧城市","智慧交通","共享经济","人工智能","ACRP","研究","桥梁","铁路桥","求职","教职","车联网","编程工具","在线教学","产品需求","算法设计","游戏管理","SONGS","NBA","POR","test"]);
	}else{
		res.json(0);
	}
});

router.get('/group/operation/add-tag/123', function(req, res, next){
	res.json({name: '测试数据'});
});

router.get('/group/operation/update-tag/123', function(req, res, next){
	console.log(req.query);
	if(Math.random() >= 0.5){
		res.json(1);
	}else{
		res.json(0);
	}
});

router.get('/group/operation/create-group/', function(req, res, next){
	console.log(req.query);
	if(Math.random() >= 0.5){
		res.json(1);
	}else{
		res.json(0);
	}
});

router.get('/group/chen-operation/14', function(req, res, next){
	console.log(req.query);
	if(Math.random() >= 0.5){
		res.json(1);
	}else{
		res.json(0);
	}
});

router.get('/group/get-authority-for-current-user/:gid', function(req, res, next){
	if(Math.random() >= 0.6){
		res.json([2,3,4,6,7,8,9,11,12,16,17,18,19,20,21,22,23,24,25,101,102]);
	}else if(Math.random() >= 0.5){
		res.json([2,3,4,6,7,8,11,12,16,17,19,20,22,23,24,25,101,102]);
	}else if(Math.random() >= 0.4){
		res.json([7,12,16,17,19,20,22,23,24,25,101,102]);
	}else if(Math.random() >= 0.3){
		res.json([3,6,11,24,25]);
	}else if(Math.random() >= 0.2){
		res.json([11]);
	}else{
		res.json([]);
	}
});

router.get('/group/operation/update-basic-info/', function(req, res, next){
	console.log(req.query);
	res.json(1);
});

router.get('/group/operation/get-group-settings/123', function(req, res, next){
	res.json({
		allow_group_share: 0,
		allow_new_following: 0,
		allow_new_member_validation: 0,
		allow_post_share_following: 0,
		allow_new_member_in: 0
	});
});

router.get('/group/operation/update-group-settings/:groupid/:option/:id', function(req, res, next){
	res.json(1);
});

router.get('/group/operation/get-group-posts/:groupid/:size', function(req, res, next){
	res.json([{
		title: '测试',
		content: '<div class="RichContent-inner"><span class="RichText CopyrightRichText-richText" itemprop="text"><p>《演说家》孙一冰这期看得我实在太生气了！</p><p>孙一冰是个从小因为丑胖而备受排挤，甚至不堪老师同学的侮辱想到过自杀，最后整容13次给生活带来转机的女性。</p><p><a href="https://link.zhihu.com/?target=https%3A//v.qq.com/x/cover/z0538clwgi4/z0538clwgi4.html" class=" wrap external" target="_blank" rel="nofollow noreferrer">丑的代价就是失去整个世界？整容女13次手术只为改变悲剧人生_腾讯视频<i class="icon-external"></i></a></p><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png"&gt;</noscript><img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb lazy" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png" data-actualsrc="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png"><p><br></p><p>嘉宾认为没必要整容，反驳她举的例子竟然是：</p><p><b>“漂亮也会受排挤”</b></p><p>想起什么了么？</p><p><br></p><p><b>还记得张雪峰那期么？</b></p><p><b>张雪峰说考研是改变大多数学生命运的有效途径！更多的意义在于获得一张入场券.</b></p><p><b>可是马丁这个人举出的例子是：没考研也能混的很好！</b></p><p><b>还叫在场的嘉宾表决，这些嘉宾竟然纷纷叫好！</b></p><p><b>（我还能说啥？没考研的混的好的比例有多少？！只能说物以类聚！）</b></p><p><br></p><p><b>是，漂亮也会受排挤，可是有多少呢？因为长相而被歧视的，失去机会的又有多少呢！！</b></p><p>（话说回来，就节目上来看，要分美丑的话，我觉得几位女嘉宾，还真的不咋地，你来喷我啊,不管是内心还是外表。。。）</p><p>更让我不能忍受的是，当曹云金提出了这个“漂亮也会受排挤”的证据后，看看这些人的反应！</p><p><b>所有人！所有人！！都沉浸在这个欢乐的氛围中！！！</b></p><p><b>（除了最右的那位推荐人，我要点赞他！看他的眼神！）</b></p><p>我就问问，假如，你是孙一冰，你站在台上此刻是何感受！</p><p>真的很生气！</p><p><b>我感到恶心！</b></p><p><b>反胃！！</b></p><p>不是说需要这些评委赞同她的观点，每个人都应该有拥有自己观点的权利。</p><p>但是，只要你真的尝试去理解那个女孩了，真的尝试去感受她的内心了，你还能笑的这么开心么！</p><p>你不知道她经历了怎样的绝望和挣扎，<b>你看不到她身上背负着怎样的重担，在怎样的泥泞里前行，又怎么敢轻率的否定她，想要改变她，叫她看开呢？！</b></p><noscript>&lt;img data-rawheight="568" src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" data-rawwidth="997" class="origin_image zh-lightbox-thumb" width="997" data-original="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" style="width: 654px; height: 372.59px;"></div></span><p>注意下图右边这个推荐人的眼神，在往台上瞟，应该是在考虑女孩的感受。</p><noscript>&lt;img data-rawheight="559" src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" data-rawwidth="986" class="origin_image zh-lightbox-thumb" width="986" data-original="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" style="width: 654px; height: 370.777px;"></div></span><p><br></p><noscript>&lt;img data-rawheight="562" src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" data-rawwidth="1007" class="origin_image zh-lightbox-thumb" width="1007" data-original="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" style="width: 654px; height: 364.993px;"></div></span><br><p>接着，曹云金又说没必要整容，可以靠才华.</p><p>然后女孩说了自己减肥见网友结果被嘲笑的事</p><p><b>曹来了一句“减肥算什么才华...."</b></p><p>（我不是黑曹，这期节目开始登台的时候，他说的关于喜剧演员有色眼镜的事我认为还是三观正的，可是你爱惜自己挺带劲儿，怎么理解别人就这么难呢？！）</p><noscript>&lt;img data-rawheight="562" src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" data-rawwidth="1010" class="origin_image zh-lightbox-thumb" width="1010" data-original="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" style="width: 654px; height: 363.909px;"></div></span><p>所有人又开始大笑！！！</p><h2><b>最为讽刺的是，</b></h2><h2><b>笑得最开心的是同为女性的，</b></h2><h2><b>应该更容易理解整容女孩的她俩.</b>..</h2><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" data-rawwidth="994" class="origin_image zh-lightbox-thumb" width="994" data-original="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" style="width: 654px; height: 366.477px;"></div></span><h2>还有她们....</h2><noscript>&lt;img data-rawheight="1072" src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" style="width: 654px; height: 365.15px;"></div></span><p><br></p><p>对不起，我不觉得曹云金幽默，我只觉得<b>阴阳怪气</b>......</p><p>仔细想想，一个又胖又丑的女孩努力减肥好笑么？</p><p>减肥不算才华，那知乎上还那么多减肥话题，那么多人咋还减不下去，还要花钱，还要请教练，减肥火了多少大V，带动了多少减肥药微商......</p><p>不说别的，如果这不是一个看脸的世界，看看知乎上有多少关于长相的答案下面写了：“强答”两字吧，看看有多少点赞的吧。</p><p>我再举一个例子，头像好看的人是不是更容易吸粉？（我没调查过，也不断言。大家心里自行判断。我个人认为是更容易吸粉，这没什么见不得人的，我就是喜欢追求美的。美本来就是一种优势。）</p><h2><b>别跟我说，这个世界不看脸！</b></h2><p><b>为甚么明星容貌姣好的多？</b></p><p><b>为甚么主持人要求端庄？</b></p><p><b>为什么有礼仪小姐的存在？</b></p><p><b>为什么好看的小姐价更高？！</b></p><p>其实，我对于整形的个人观点也不太一样，你可以不赞成整容，但你没有权利就说人家整容是错的......仅属于个人观点。</p><p>我觉得介绍人的话说的很正：</p><noscript>&lt;img data-rawheight="1596" src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" data-rawwidth="1919" class="origin_image zh-lightbox-thumb" width="1919" data-original="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" style="width: 654px; height: 543.921px;"></div></span><noscript>&lt;img data-rawheight="1698" src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" data-rawwidth="1917" class="origin_image zh-lightbox-thumb" width="1917" data-original="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" style="width: 654px; height: 579.286px;"></div></span><noscript>&lt;img data-rawheight="1701" src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" data-rawwidth="1914" class="origin_image zh-lightbox-thumb" width="1914" data-original="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" style="width: 654px; height: 581.219px;"></div></span><noscript>&lt;img data-rawheight="1613" src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" style="width: 654px; height: 549.428px;"></div></span><noscript>&lt;img data-rawheight="1316" src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" style="width: 654px; height: 448.262px;"></div></span><p><br></p><p>在这个节目，只感到心寒：</p><p>我从不寄希望于他人可以感同身受，</p><p>我只想有人能尝试理解我，</p><p>可<b>他们只想打败我，</b></p><p><b>从而证明他们的三观才是对的。</b></p><p><br></p><p><b>这个世界当然不是全看脸的，但是，</b></p><p><b>不全看脸不代表不看脸！！</b></p><p><b>更不代表脸不重要！！</b></p><p><b>请别尝试营造脸不重要的假象了！</b></p><p><b><br></b></p><p><b><br></b></p><p><b><br></b></p><p><b>——————————分割线————————</b></p><p><b>这两天得了很多赞，也有很多老铁在评论区说出了自己的经历和观点，希望大家能给有类似经历的老铁们多点鼓励~</b></p><p><b>对于嘉宾的问题，我个人觉得这期节目中他们表现出来的行为是不妥的，让人气愤的！！！</b></p><p><b><br></b></p><p><b>我知道接下去的话可能会少很多赞同，</b></p><p><b>但是人也不是简单的非黑即白的，</b></p><p><b>这期节目中他们的表现我觉得就是欠骂……</b><b>所以怎么评价他们这期节目的表现我觉得都不为过…</b></p><p><b>不过一棍子全面打死就说这些嘉宾一无是处，是否就真的妥当呢？</b></p><p><b>（当然他们中有些人也许在别的方面也是这样一无是处！那实在是可恶至极！）</b></p><p><b>希望各位老铁适当考虑一下叭。</b></p><p><b>谢谢各位老铁的浏览！</b></p></span><!-- react-empty: 190 --></div>',
		datetime:	'YYYY-MM-DD-HH-MM-SS',
		gname: '交托帮',
		gimage: 'dist/img/default6.png',
		allowShare: 1,
		category: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
		tags: ['资讯', '日记', '视频']
	},{
		title: '测试',
		content: '<div class="RichContent-inner"><span class="RichText CopyrightRichText-richText" itemprop="text"><p>《演说家》孙一冰这期看得我实在太生气了！</p><p>孙一冰是个从小因为丑胖而备受排挤，甚至不堪老师同学的侮辱想到过自杀，最后整容13次给生活带来转机的女性。</p><p><a href="https://link.zhihu.com/?target=https%3A//v.qq.com/x/cover/z0538clwgi4/z0538clwgi4.html" class=" wrap external" target="_blank" rel="nofollow noreferrer">丑的代价就是失去整个世界？整容女13次手术只为改变悲剧人生_腾讯视频<i class="icon-external"></i></a></p><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png"&gt;</noscript><img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb lazy" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png" data-actualsrc="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png"><p><br></p><p>嘉宾认为没必要整容，反驳她举的例子竟然是：</p><p><b>“漂亮也会受排挤”</b></p><p>想起什么了么？</p><p><br></p><p><b>还记得张雪峰那期么？</b></p><p><b>张雪峰说考研是改变大多数学生命运的有效途径！更多的意义在于获得一张入场券.</b></p><p><b>可是马丁这个人举出的例子是：没考研也能混的很好！</b></p><p><b>还叫在场的嘉宾表决，这些嘉宾竟然纷纷叫好！</b></p><p><b>（我还能说啥？没考研的混的好的比例有多少？！只能说物以类聚！）</b></p><p><br></p><p><b>是，漂亮也会受排挤，可是有多少呢？因为长相而被歧视的，失去机会的又有多少呢！！</b></p><p>（话说回来，就节目上来看，要分美丑的话，我觉得几位女嘉宾，还真的不咋地，你来喷我啊,不管是内心还是外表。。。）</p><p>更让我不能忍受的是，当曹云金提出了这个“漂亮也会受排挤”的证据后，看看这些人的反应！</p><p><b>所有人！所有人！！都沉浸在这个欢乐的氛围中！！！</b></p><p><b>（除了最右的那位推荐人，我要点赞他！看他的眼神！）</b></p><p>我就问问，假如，你是孙一冰，你站在台上此刻是何感受！</p><p>真的很生气！</p><p><b>我感到恶心！</b></p><p><b>反胃！！</b></p><p>不是说需要这些评委赞同她的观点，每个人都应该有拥有自己观点的权利。</p><p>但是，只要你真的尝试去理解那个女孩了，真的尝试去感受她的内心了，你还能笑的这么开心么！</p><p>你不知道她经历了怎样的绝望和挣扎，<b>你看不到她身上背负着怎样的重担，在怎样的泥泞里前行，又怎么敢轻率的否定她，想要改变她，叫她看开呢？！</b></p><noscript>&lt;img data-rawheight="568" src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" data-rawwidth="997" class="origin_image zh-lightbox-thumb" width="997" data-original="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" style="width: 654px; height: 372.59px;"></div></span><p>注意下图右边这个推荐人的眼神，在往台上瞟，应该是在考虑女孩的感受。</p><noscript>&lt;img data-rawheight="559" src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" data-rawwidth="986" class="origin_image zh-lightbox-thumb" width="986" data-original="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" style="width: 654px; height: 370.777px;"></div></span><p><br></p><noscript>&lt;img data-rawheight="562" src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" data-rawwidth="1007" class="origin_image zh-lightbox-thumb" width="1007" data-original="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" style="width: 654px; height: 364.993px;"></div></span><br><p>接着，曹云金又说没必要整容，可以靠才华.</p><p>然后女孩说了自己减肥见网友结果被嘲笑的事</p><p><b>曹来了一句“减肥算什么才华...."</b></p><p>（我不是黑曹，这期节目开始登台的时候，他说的关于喜剧演员有色眼镜的事我认为还是三观正的，可是你爱惜自己挺带劲儿，怎么理解别人就这么难呢？！）</p><noscript>&lt;img data-rawheight="562" src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" data-rawwidth="1010" class="origin_image zh-lightbox-thumb" width="1010" data-original="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" style="width: 654px; height: 363.909px;"></div></span><p>所有人又开始大笑！！！</p><h2><b>最为讽刺的是，</b></h2><h2><b>笑得最开心的是同为女性的，</b></h2><h2><b>应该更容易理解整容女孩的她俩.</b>..</h2><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" data-rawwidth="994" class="origin_image zh-lightbox-thumb" width="994" data-original="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" style="width: 654px; height: 366.477px;"></div></span><h2>还有她们....</h2><noscript>&lt;img data-rawheight="1072" src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" style="width: 654px; height: 365.15px;"></div></span><p><br></p><p>对不起，我不觉得曹云金幽默，我只觉得<b>阴阳怪气</b>......</p><p>仔细想想，一个又胖又丑的女孩努力减肥好笑么？</p><p>减肥不算才华，那知乎上还那么多减肥话题，那么多人咋还减不下去，还要花钱，还要请教练，减肥火了多少大V，带动了多少减肥药微商......</p><p>不说别的，如果这不是一个看脸的世界，看看知乎上有多少关于长相的答案下面写了：“强答”两字吧，看看有多少点赞的吧。</p><p>我再举一个例子，头像好看的人是不是更容易吸粉？（我没调查过，也不断言。大家心里自行判断。我个人认为是更容易吸粉，这没什么见不得人的，我就是喜欢追求美的。美本来就是一种优势。）</p><h2><b>别跟我说，这个世界不看脸！</b></h2><p><b>为甚么明星容貌姣好的多？</b></p><p><b>为甚么主持人要求端庄？</b></p><p><b>为什么有礼仪小姐的存在？</b></p><p><b>为什么好看的小姐价更高？！</b></p><p>其实，我对于整形的个人观点也不太一样，你可以不赞成整容，但你没有权利就说人家整容是错的......仅属于个人观点。</p><p>我觉得介绍人的话说的很正：</p><noscript>&lt;img data-rawheight="1596" src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" data-rawwidth="1919" class="origin_image zh-lightbox-thumb" width="1919" data-original="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" style="width: 654px; height: 543.921px;"></div></span><noscript>&lt;img data-rawheight="1698" src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" data-rawwidth="1917" class="origin_image zh-lightbox-thumb" width="1917" data-original="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" style="width: 654px; height: 579.286px;"></div></span><noscript>&lt;img data-rawheight="1701" src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" data-rawwidth="1914" class="origin_image zh-lightbox-thumb" width="1914" data-original="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" style="width: 654px; height: 581.219px;"></div></span><noscript>&lt;img data-rawheight="1613" src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" style="width: 654px; height: 549.428px;"></div></span><noscript>&lt;img data-rawheight="1316" src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" style="width: 654px; height: 448.262px;"></div></span><p><br></p><p>在这个节目，只感到心寒：</p><p>我从不寄希望于他人可以感同身受，</p><p>我只想有人能尝试理解我，</p><p>可<b>他们只想打败我，</b></p><p><b>从而证明他们的三观才是对的。</b></p><p><br></p><p><b>这个世界当然不是全看脸的，但是，</b></p><p><b>不全看脸不代表不看脸！！</b></p><p><b>更不代表脸不重要！！</b></p><p><b>请别尝试营造脸不重要的假象了！</b></p><p><b><br></b></p><p><b><br></b></p><p><b><br></b></p><p><b>——————————分割线————————</b></p><p><b>这两天得了很多赞，也有很多老铁在评论区说出了自己的经历和观点，希望大家能给有类似经历的老铁们多点鼓励~</b></p><p><b>对于嘉宾的问题，我个人觉得这期节目中他们表现出来的行为是不妥的，让人气愤的！！！</b></p><p><b><br></b></p><p><b>我知道接下去的话可能会少很多赞同，</b></p><p><b>但是人也不是简单的非黑即白的，</b></p><p><b>这期节目中他们的表现我觉得就是欠骂……</b><b>所以怎么评价他们这期节目的表现我觉得都不为过…</b></p><p><b>不过一棍子全面打死就说这些嘉宾一无是处，是否就真的妥当呢？</b></p><p><b>（当然他们中有些人也许在别的方面也是这样一无是处！那实在是可恶至极！）</b></p><p><b>希望各位老铁适当考虑一下叭。</b></p><p><b>谢谢各位老铁的浏览！</b></p></span><!-- react-empty: 190 --></div>',
		datetime:	'YYYY-MM-DD-HH-MM-SS',
		gname: '交托帮',
		gimage: 'dist/img/default6.png',
		allowShare: 1,
		category: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
		tags: ['资讯', '日记', '视频']
	},{
		title: '测试',
		content: '<div class="RichContent-inner"><span class="RichText CopyrightRichText-richText" itemprop="text"><p>《演说家》孙一冰这期看得我实在太生气了！</p><p>孙一冰是个从小因为丑胖而备受排挤，甚至不堪老师同学的侮辱想到过自杀，最后整容13次给生活带来转机的女性。</p><p><a href="https://link.zhihu.com/?target=https%3A//v.qq.com/x/cover/z0538clwgi4/z0538clwgi4.html" class=" wrap external" target="_blank" rel="nofollow noreferrer">丑的代价就是失去整个世界？整容女13次手术只为改变悲剧人生_腾讯视频<i class="icon-external"></i></a></p><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png"&gt;</noscript><img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb lazy" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png" data-actualsrc="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png"><p><br></p><p>嘉宾认为没必要整容，反驳她举的例子竟然是：</p><p><b>“漂亮也会受排挤”</b></p><p>想起什么了么？</p><p><br></p><p><b>还记得张雪峰那期么？</b></p><p><b>张雪峰说考研是改变大多数学生命运的有效途径！更多的意义在于获得一张入场券.</b></p><p><b>可是马丁这个人举出的例子是：没考研也能混的很好！</b></p><p><b>还叫在场的嘉宾表决，这些嘉宾竟然纷纷叫好！</b></p><p><b>（我还能说啥？没考研的混的好的比例有多少？！只能说物以类聚！）</b></p><p><br></p><p><b>是，漂亮也会受排挤，可是有多少呢？因为长相而被歧视的，失去机会的又有多少呢！！</b></p><p>（话说回来，就节目上来看，要分美丑的话，我觉得几位女嘉宾，还真的不咋地，你来喷我啊,不管是内心还是外表。。。）</p><p>更让我不能忍受的是，当曹云金提出了这个“漂亮也会受排挤”的证据后，看看这些人的反应！</p><p><b>所有人！所有人！！都沉浸在这个欢乐的氛围中！！！</b></p><p><b>（除了最右的那位推荐人，我要点赞他！看他的眼神！）</b></p><p>我就问问，假如，你是孙一冰，你站在台上此刻是何感受！</p><p>真的很生气！</p><p><b>我感到恶心！</b></p><p><b>反胃！！</b></p><p>不是说需要这些评委赞同她的观点，每个人都应该有拥有自己观点的权利。</p><p>但是，只要你真的尝试去理解那个女孩了，真的尝试去感受她的内心了，你还能笑的这么开心么！</p><p>你不知道她经历了怎样的绝望和挣扎，<b>你看不到她身上背负着怎样的重担，在怎样的泥泞里前行，又怎么敢轻率的否定她，想要改变她，叫她看开呢？！</b></p><noscript>&lt;img data-rawheight="568" src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" data-rawwidth="997" class="origin_image zh-lightbox-thumb" width="997" data-original="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" style="width: 654px; height: 372.59px;"></div></span><p>注意下图右边这个推荐人的眼神，在往台上瞟，应该是在考虑女孩的感受。</p><noscript>&lt;img data-rawheight="559" src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" data-rawwidth="986" class="origin_image zh-lightbox-thumb" width="986" data-original="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" style="width: 654px; height: 370.777px;"></div></span><p><br></p><noscript>&lt;img data-rawheight="562" src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" data-rawwidth="1007" class="origin_image zh-lightbox-thumb" width="1007" data-original="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" style="width: 654px; height: 364.993px;"></div></span><br><p>接着，曹云金又说没必要整容，可以靠才华.</p><p>然后女孩说了自己减肥见网友结果被嘲笑的事</p><p><b>曹来了一句“减肥算什么才华...."</b></p><p>（我不是黑曹，这期节目开始登台的时候，他说的关于喜剧演员有色眼镜的事我认为还是三观正的，可是你爱惜自己挺带劲儿，怎么理解别人就这么难呢？！）</p><noscript>&lt;img data-rawheight="562" src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" data-rawwidth="1010" class="origin_image zh-lightbox-thumb" width="1010" data-original="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" style="width: 654px; height: 363.909px;"></div></span><p>所有人又开始大笑！！！</p><h2><b>最为讽刺的是，</b></h2><h2><b>笑得最开心的是同为女性的，</b></h2><h2><b>应该更容易理解整容女孩的她俩.</b>..</h2><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" data-rawwidth="994" class="origin_image zh-lightbox-thumb" width="994" data-original="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" style="width: 654px; height: 366.477px;"></div></span><h2>还有她们....</h2><noscript>&lt;img data-rawheight="1072" src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" style="width: 654px; height: 365.15px;"></div></span><p><br></p><p>对不起，我不觉得曹云金幽默，我只觉得<b>阴阳怪气</b>......</p><p>仔细想想，一个又胖又丑的女孩努力减肥好笑么？</p><p>减肥不算才华，那知乎上还那么多减肥话题，那么多人咋还减不下去，还要花钱，还要请教练，减肥火了多少大V，带动了多少减肥药微商......</p><p>不说别的，如果这不是一个看脸的世界，看看知乎上有多少关于长相的答案下面写了：“强答”两字吧，看看有多少点赞的吧。</p><p>我再举一个例子，头像好看的人是不是更容易吸粉？（我没调查过，也不断言。大家心里自行判断。我个人认为是更容易吸粉，这没什么见不得人的，我就是喜欢追求美的。美本来就是一种优势。）</p><h2><b>别跟我说，这个世界不看脸！</b></h2><p><b>为甚么明星容貌姣好的多？</b></p><p><b>为甚么主持人要求端庄？</b></p><p><b>为什么有礼仪小姐的存在？</b></p><p><b>为什么好看的小姐价更高？！</b></p><p>其实，我对于整形的个人观点也不太一样，你可以不赞成整容，但你没有权利就说人家整容是错的......仅属于个人观点。</p><p>我觉得介绍人的话说的很正：</p><noscript>&lt;img data-rawheight="1596" src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" data-rawwidth="1919" class="origin_image zh-lightbox-thumb" width="1919" data-original="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" style="width: 654px; height: 543.921px;"></div></span><noscript>&lt;img data-rawheight="1698" src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" data-rawwidth="1917" class="origin_image zh-lightbox-thumb" width="1917" data-original="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" style="width: 654px; height: 579.286px;"></div></span><noscript>&lt;img data-rawheight="1701" src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" data-rawwidth="1914" class="origin_image zh-lightbox-thumb" width="1914" data-original="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" style="width: 654px; height: 581.219px;"></div></span><noscript>&lt;img data-rawheight="1613" src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" style="width: 654px; height: 549.428px;"></div></span><noscript>&lt;img data-rawheight="1316" src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" style="width: 654px; height: 448.262px;"></div></span><p><br></p><p>在这个节目，只感到心寒：</p><p>我从不寄希望于他人可以感同身受，</p><p>我只想有人能尝试理解我，</p><p>可<b>他们只想打败我，</b></p><p><b>从而证明他们的三观才是对的。</b></p><p><br></p><p><b>这个世界当然不是全看脸的，但是，</b></p><p><b>不全看脸不代表不看脸！！</b></p><p><b>更不代表脸不重要！！</b></p><p><b>请别尝试营造脸不重要的假象了！</b></p><p><b><br></b></p><p><b><br></b></p><p><b><br></b></p><p><b>——————————分割线————————</b></p><p><b>这两天得了很多赞，也有很多老铁在评论区说出了自己的经历和观点，希望大家能给有类似经历的老铁们多点鼓励~</b></p><p><b>对于嘉宾的问题，我个人觉得这期节目中他们表现出来的行为是不妥的，让人气愤的！！！</b></p><p><b><br></b></p><p><b>我知道接下去的话可能会少很多赞同，</b></p><p><b>但是人也不是简单的非黑即白的，</b></p><p><b>这期节目中他们的表现我觉得就是欠骂……</b><b>所以怎么评价他们这期节目的表现我觉得都不为过…</b></p><p><b>不过一棍子全面打死就说这些嘉宾一无是处，是否就真的妥当呢？</b></p><p><b>（当然他们中有些人也许在别的方面也是这样一无是处！那实在是可恶至极！）</b></p><p><b>希望各位老铁适当考虑一下叭。</b></p><p><b>谢谢各位老铁的浏览！</b></p></span><!-- react-empty: 190 --></div>',
		datetime:	'YYYY-MM-DD-HH-MM-SS',
		gname: '交托帮',
		gimage: 'dist/img/default6.png',
		allowShare: 1,
		category: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
		tags: ['资讯', '日记', '视频']
	},{
		title: '测试',
		content: '<div class="RichContent-inner"><span class="RichText CopyrightRichText-richText" itemprop="text"><p>《演说家》孙一冰这期看得我实在太生气了！</p><p>孙一冰是个从小因为丑胖而备受排挤，甚至不堪老师同学的侮辱想到过自杀，最后整容13次给生活带来转机的女性。</p><p><a href="https://link.zhihu.com/?target=https%3A//v.qq.com/x/cover/z0538clwgi4/z0538clwgi4.html" class=" wrap external" target="_blank" rel="nofollow noreferrer">丑的代价就是失去整个世界？整容女13次手术只为改变悲剧人生_腾讯视频<i class="icon-external"></i></a></p><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png"&gt;</noscript><img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb lazy" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png" data-actualsrc="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png"><p><br></p><p>嘉宾认为没必要整容，反驳她举的例子竟然是：</p><p><b>“漂亮也会受排挤”</b></p><p>想起什么了么？</p><p><br></p><p><b>还记得张雪峰那期么？</b></p><p><b>张雪峰说考研是改变大多数学生命运的有效途径！更多的意义在于获得一张入场券.</b></p><p><b>可是马丁这个人举出的例子是：没考研也能混的很好！</b></p><p><b>还叫在场的嘉宾表决，这些嘉宾竟然纷纷叫好！</b></p><p><b>（我还能说啥？没考研的混的好的比例有多少？！只能说物以类聚！）</b></p><p><br></p><p><b>是，漂亮也会受排挤，可是有多少呢？因为长相而被歧视的，失去机会的又有多少呢！！</b></p><p>（话说回来，就节目上来看，要分美丑的话，我觉得几位女嘉宾，还真的不咋地，你来喷我啊,不管是内心还是外表。。。）</p><p>更让我不能忍受的是，当曹云金提出了这个“漂亮也会受排挤”的证据后，看看这些人的反应！</p><p><b>所有人！所有人！！都沉浸在这个欢乐的氛围中！！！</b></p><p><b>（除了最右的那位推荐人，我要点赞他！看他的眼神！）</b></p><p>我就问问，假如，你是孙一冰，你站在台上此刻是何感受！</p><p>真的很生气！</p><p><b>我感到恶心！</b></p><p><b>反胃！！</b></p><p>不是说需要这些评委赞同她的观点，每个人都应该有拥有自己观点的权利。</p><p>但是，只要你真的尝试去理解那个女孩了，真的尝试去感受她的内心了，你还能笑的这么开心么！</p><p>你不知道她经历了怎样的绝望和挣扎，<b>你看不到她身上背负着怎样的重担，在怎样的泥泞里前行，又怎么敢轻率的否定她，想要改变她，叫她看开呢？！</b></p><noscript>&lt;img data-rawheight="568" src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" data-rawwidth="997" class="origin_image zh-lightbox-thumb" width="997" data-original="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" style="width: 654px; height: 372.59px;"></div></span><p>注意下图右边这个推荐人的眼神，在往台上瞟，应该是在考虑女孩的感受。</p><noscript>&lt;img data-rawheight="559" src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" data-rawwidth="986" class="origin_image zh-lightbox-thumb" width="986" data-original="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" style="width: 654px; height: 370.777px;"></div></span><p><br></p><noscript>&lt;img data-rawheight="562" src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" data-rawwidth="1007" class="origin_image zh-lightbox-thumb" width="1007" data-original="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" style="width: 654px; height: 364.993px;"></div></span><br><p>接着，曹云金又说没必要整容，可以靠才华.</p><p>然后女孩说了自己减肥见网友结果被嘲笑的事</p><p><b>曹来了一句“减肥算什么才华...."</b></p><p>（我不是黑曹，这期节目开始登台的时候，他说的关于喜剧演员有色眼镜的事我认为还是三观正的，可是你爱惜自己挺带劲儿，怎么理解别人就这么难呢？！）</p><noscript>&lt;img data-rawheight="562" src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" data-rawwidth="1010" class="origin_image zh-lightbox-thumb" width="1010" data-original="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" style="width: 654px; height: 363.909px;"></div></span><p>所有人又开始大笑！！！</p><h2><b>最为讽刺的是，</b></h2><h2><b>笑得最开心的是同为女性的，</b></h2><h2><b>应该更容易理解整容女孩的她俩.</b>..</h2><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" data-rawwidth="994" class="origin_image zh-lightbox-thumb" width="994" data-original="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" style="width: 654px; height: 366.477px;"></div></span><h2>还有她们....</h2><noscript>&lt;img data-rawheight="1072" src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" style="width: 654px; height: 365.15px;"></div></span><p><br></p><p>对不起，我不觉得曹云金幽默，我只觉得<b>阴阳怪气</b>......</p><p>仔细想想，一个又胖又丑的女孩努力减肥好笑么？</p><p>减肥不算才华，那知乎上还那么多减肥话题，那么多人咋还减不下去，还要花钱，还要请教练，减肥火了多少大V，带动了多少减肥药微商......</p><p>不说别的，如果这不是一个看脸的世界，看看知乎上有多少关于长相的答案下面写了：“强答”两字吧，看看有多少点赞的吧。</p><p>我再举一个例子，头像好看的人是不是更容易吸粉？（我没调查过，也不断言。大家心里自行判断。我个人认为是更容易吸粉，这没什么见不得人的，我就是喜欢追求美的。美本来就是一种优势。）</p><h2><b>别跟我说，这个世界不看脸！</b></h2><p><b>为甚么明星容貌姣好的多？</b></p><p><b>为甚么主持人要求端庄？</b></p><p><b>为什么有礼仪小姐的存在？</b></p><p><b>为什么好看的小姐价更高？！</b></p><p>其实，我对于整形的个人观点也不太一样，你可以不赞成整容，但你没有权利就说人家整容是错的......仅属于个人观点。</p><p>我觉得介绍人的话说的很正：</p><noscript>&lt;img data-rawheight="1596" src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" data-rawwidth="1919" class="origin_image zh-lightbox-thumb" width="1919" data-original="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" style="width: 654px; height: 543.921px;"></div></span><noscript>&lt;img data-rawheight="1698" src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" data-rawwidth="1917" class="origin_image zh-lightbox-thumb" width="1917" data-original="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" style="width: 654px; height: 579.286px;"></div></span><noscript>&lt;img data-rawheight="1701" src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" data-rawwidth="1914" class="origin_image zh-lightbox-thumb" width="1914" data-original="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" style="width: 654px; height: 581.219px;"></div></span><noscript>&lt;img data-rawheight="1613" src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" style="width: 654px; height: 549.428px;"></div></span><noscript>&lt;img data-rawheight="1316" src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" style="width: 654px; height: 448.262px;"></div></span><p><br></p><p>在这个节目，只感到心寒：</p><p>我从不寄希望于他人可以感同身受，</p><p>我只想有人能尝试理解我，</p><p>可<b>他们只想打败我，</b></p><p><b>从而证明他们的三观才是对的。</b></p><p><br></p><p><b>这个世界当然不是全看脸的，但是，</b></p><p><b>不全看脸不代表不看脸！！</b></p><p><b>更不代表脸不重要！！</b></p><p><b>请别尝试营造脸不重要的假象了！</b></p><p><b><br></b></p><p><b><br></b></p><p><b><br></b></p><p><b>——————————分割线————————</b></p><p><b>这两天得了很多赞，也有很多老铁在评论区说出了自己的经历和观点，希望大家能给有类似经历的老铁们多点鼓励~</b></p><p><b>对于嘉宾的问题，我个人觉得这期节目中他们表现出来的行为是不妥的，让人气愤的！！！</b></p><p><b><br></b></p><p><b>我知道接下去的话可能会少很多赞同，</b></p><p><b>但是人也不是简单的非黑即白的，</b></p><p><b>这期节目中他们的表现我觉得就是欠骂……</b><b>所以怎么评价他们这期节目的表现我觉得都不为过…</b></p><p><b>不过一棍子全面打死就说这些嘉宾一无是处，是否就真的妥当呢？</b></p><p><b>（当然他们中有些人也许在别的方面也是这样一无是处！那实在是可恶至极！）</b></p><p><b>希望各位老铁适当考虑一下叭。</b></p><p><b>谢谢各位老铁的浏览！</b></p></span><!-- react-empty: 190 --></div>',
		datetime:	'YYYY-MM-DD-HH-MM-SS',
		gname: '交托帮',
		gimage: 'dist/img/default6.png',
		allowShare: 1,
		category: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
		tags: ['资讯', '日记', '视频']
	},{
		title: '测试',
		content: '<div class="RichContent-inner"><span class="RichText CopyrightRichText-richText" itemprop="text"><p>《演说家》孙一冰这期看得我实在太生气了！</p><p>孙一冰是个从小因为丑胖而备受排挤，甚至不堪老师同学的侮辱想到过自杀，最后整容13次给生活带来转机的女性。</p><p><a href="https://link.zhihu.com/?target=https%3A//v.qq.com/x/cover/z0538clwgi4/z0538clwgi4.html" class=" wrap external" target="_blank" rel="nofollow noreferrer">丑的代价就是失去整个世界？整容女13次手术只为改变悲剧人生_腾讯视频<i class="icon-external"></i></a></p><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png"&gt;</noscript><img data-rawheight="557" src="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png" data-rawwidth="1001" class="origin_image zh-lightbox-thumb lazy" width="1001" data-original="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_r.png" data-actualsrc="https://pic4.zhimg.com/v2-8f19ff75182bb1f6e574a7d9de608e6b_b.png"><p><br></p><p>嘉宾认为没必要整容，反驳她举的例子竟然是：</p><p><b>“漂亮也会受排挤”</b></p><p>想起什么了么？</p><p><br></p><p><b>还记得张雪峰那期么？</b></p><p><b>张雪峰说考研是改变大多数学生命运的有效途径！更多的意义在于获得一张入场券.</b></p><p><b>可是马丁这个人举出的例子是：没考研也能混的很好！</b></p><p><b>还叫在场的嘉宾表决，这些嘉宾竟然纷纷叫好！</b></p><p><b>（我还能说啥？没考研的混的好的比例有多少？！只能说物以类聚！）</b></p><p><br></p><p><b>是，漂亮也会受排挤，可是有多少呢？因为长相而被歧视的，失去机会的又有多少呢！！</b></p><p>（话说回来，就节目上来看，要分美丑的话，我觉得几位女嘉宾，还真的不咋地，你来喷我啊,不管是内心还是外表。。。）</p><p>更让我不能忍受的是，当曹云金提出了这个“漂亮也会受排挤”的证据后，看看这些人的反应！</p><p><b>所有人！所有人！！都沉浸在这个欢乐的氛围中！！！</b></p><p><b>（除了最右的那位推荐人，我要点赞他！看他的眼神！）</b></p><p>我就问问，假如，你是孙一冰，你站在台上此刻是何感受！</p><p>真的很生气！</p><p><b>我感到恶心！</b></p><p><b>反胃！！</b></p><p>不是说需要这些评委赞同她的观点，每个人都应该有拥有自己观点的权利。</p><p>但是，只要你真的尝试去理解那个女孩了，真的尝试去感受她的内心了，你还能笑的这么开心么！</p><p>你不知道她经历了怎样的绝望和挣扎，<b>你看不到她身上背负着怎样的重担，在怎样的泥泞里前行，又怎么敢轻率的否定她，想要改变她，叫她看开呢？！</b></p><noscript>&lt;img data-rawheight="568" src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" data-rawwidth="997" class="origin_image zh-lightbox-thumb" width="997" data-original="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-6a0abc3acb452382d72d0caa7e06fc08_b.png" style="width: 654px; height: 372.59px;"></div></span><p>注意下图右边这个推荐人的眼神，在往台上瞟，应该是在考虑女孩的感受。</p><noscript>&lt;img data-rawheight="559" src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" data-rawwidth="986" class="origin_image zh-lightbox-thumb" width="986" data-original="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-80b38c34c5c0e2412eb07aa8bde41e1d_b.png" style="width: 654px; height: 370.777px;"></div></span><p><br></p><noscript>&lt;img data-rawheight="562" src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" data-rawwidth="1007" class="origin_image zh-lightbox-thumb" width="1007" data-original="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-3fdb81bc2ca17329eea56cd8ef80d735_b.png" style="width: 654px; height: 364.993px;"></div></span><br><p>接着，曹云金又说没必要整容，可以靠才华.</p><p>然后女孩说了自己减肥见网友结果被嘲笑的事</p><p><b>曹来了一句“减肥算什么才华...."</b></p><p>（我不是黑曹，这期节目开始登台的时候，他说的关于喜剧演员有色眼镜的事我认为还是三观正的，可是你爱惜自己挺带劲儿，怎么理解别人就这么难呢？！）</p><noscript>&lt;img data-rawheight="562" src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" data-rawwidth="1010" class="origin_image zh-lightbox-thumb" width="1010" data-original="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic1.zhimg.com/v2-c8670adc09f58869b5045c465c33e318_b.png" style="width: 654px; height: 363.909px;"></div></span><p>所有人又开始大笑！！！</p><h2><b>最为讽刺的是，</b></h2><h2><b>笑得最开心的是同为女性的，</b></h2><h2><b>应该更容易理解整容女孩的她俩.</b>..</h2><noscript>&lt;img data-rawheight="557" src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" data-rawwidth="994" class="origin_image zh-lightbox-thumb" width="994" data-original="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_r.png"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-3ff089843a75798de4dfdbdee6831bf7_b.png" style="width: 654px; height: 366.477px;"></div></span><h2>还有她们....</h2><noscript>&lt;img data-rawheight="1072" src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-9d403668ac512a73ff1844d84cc093b3_b.jpg" style="width: 654px; height: 365.15px;"></div></span><p><br></p><p>对不起，我不觉得曹云金幽默，我只觉得<b>阴阳怪气</b>......</p><p>仔细想想，一个又胖又丑的女孩努力减肥好笑么？</p><p>减肥不算才华，那知乎上还那么多减肥话题，那么多人咋还减不下去，还要花钱，还要请教练，减肥火了多少大V，带动了多少减肥药微商......</p><p>不说别的，如果这不是一个看脸的世界，看看知乎上有多少关于长相的答案下面写了：“强答”两字吧，看看有多少点赞的吧。</p><p>我再举一个例子，头像好看的人是不是更容易吸粉？（我没调查过，也不断言。大家心里自行判断。我个人认为是更容易吸粉，这没什么见不得人的，我就是喜欢追求美的。美本来就是一种优势。）</p><h2><b>别跟我说，这个世界不看脸！</b></h2><p><b>为甚么明星容貌姣好的多？</b></p><p><b>为甚么主持人要求端庄？</b></p><p><b>为什么有礼仪小姐的存在？</b></p><p><b>为什么好看的小姐价更高？！</b></p><p>其实，我对于整形的个人观点也不太一样，你可以不赞成整容，但你没有权利就说人家整容是错的......仅属于个人观点。</p><p>我觉得介绍人的话说的很正：</p><noscript>&lt;img data-rawheight="1596" src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" data-rawwidth="1919" class="origin_image zh-lightbox-thumb" width="1919" data-original="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic3.zhimg.com/v2-9496409b4c396cd78d5e8be892f2d1e6_b.jpg" style="width: 654px; height: 543.921px;"></div></span><noscript>&lt;img data-rawheight="1698" src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" data-rawwidth="1917" class="origin_image zh-lightbox-thumb" width="1917" data-original="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-a34676b802e62fd530e47cebcf0d69b3_b.jpg" style="width: 654px; height: 579.286px;"></div></span><noscript>&lt;img data-rawheight="1701" src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" data-rawwidth="1914" class="origin_image zh-lightbox-thumb" width="1914" data-original="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic2.zhimg.com/v2-5989a34de48d2c685a99d91bee869961_b.jpg" style="width: 654px; height: 581.219px;"></div></span><noscript>&lt;img data-rawheight="1613" src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-d97b78e99a28e154a663173249827f3b_b.jpg" style="width: 654px; height: 549.428px;"></div></span><noscript>&lt;img data-rawheight="1316" src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" data-rawwidth="1920" class="origin_image zh-lightbox-thumb" width="1920" data-original="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_r.jpg"&gt;</noscript><span><div data-reactroot="" class="VagueImage origin_image zh-lightbox-thumb" data-src="https://pic4.zhimg.com/v2-caea3f1dbdc257a1c54be5376d4f3c3b_b.jpg" style="width: 654px; height: 448.262px;"></div></span><p><br></p><p>在这个节目，只感到心寒：</p><p>我从不寄希望于他人可以感同身受，</p><p>我只想有人能尝试理解我，</p><p>可<b>他们只想打败我，</b></p><p><b>从而证明他们的三观才是对的。</b></p><p><br></p><p><b>这个世界当然不是全看脸的，但是，</b></p><p><b>不全看脸不代表不看脸！！</b></p><p><b>更不代表脸不重要！！</b></p><p><b>请别尝试营造脸不重要的假象了！</b></p><p><b><br></b></p><p><b><br></b></p><p><b><br></b></p><p><b>——————————分割线————————</b></p><p><b>这两天得了很多赞，也有很多老铁在评论区说出了自己的经历和观点，希望大家能给有类似经历的老铁们多点鼓励~</b></p><p><b>对于嘉宾的问题，我个人觉得这期节目中他们表现出来的行为是不妥的，让人气愤的！！！</b></p><p><b><br></b></p><p><b>我知道接下去的话可能会少很多赞同，</b></p><p><b>但是人也不是简单的非黑即白的，</b></p><p><b>这期节目中他们的表现我觉得就是欠骂……</b><b>所以怎么评价他们这期节目的表现我觉得都不为过…</b></p><p><b>不过一棍子全面打死就说这些嘉宾一无是处，是否就真的妥当呢？</b></p><p><b>（当然他们中有些人也许在别的方面也是这样一无是处！那实在是可恶至极！）</b></p><p><b>希望各位老铁适当考虑一下叭。</b></p><p><b>谢谢各位老铁的浏览！</b></p></span><!-- react-empty: 190 --></div>',
		datetime:	'YYYY-MM-DD-HH-MM-SS',
		gname: '交托帮',
		gimage: 'dist/img/default6.png',
		allowShare: 1,
		category: ['设计', '交叉口设计', '信号灯设计', '统计', '软件工程'],
		tags: ['资讯', '日记', '视频']
	}]);
});

router.get('/test', function(req, res, next){
	res.render('test');
});



router.get('/testtest', function(req, res, next) {
	console.log('####');
	console.log(req.query);
	if( Math.random() >0.5 )
		res.json(1);
	else
		res.json(2);
});

router.get('/test1', function(req, res, next) {
	res.render('testtest');
});

router.get('/timeline', function(req, res, next) {
	res.render('timeline');
});

router.get('/get-notice/:groupid', function(req, res, next) {
	res.json(
		[
			{	
				id: 111,
				uid: 123,
				uname: '张震宇',
				uimage: 'dist/img/default6.png',
				content: '这是一条公告',
				datetime: '2017_05_03_01_05_45',
				hasAuthority : 0
			},{
				id: 222,
				uid: 123,
				uname: '张震宇',
				uimage: 'dist/img/default6.png',
				content: '这是一条公告这是一条公告',
				datetime: '2017_05_03_01_05_45',
				hasAuthority : 1
			}
		]
	);
});

router.get('/add-notice', function(req, res, next) {
	console.log(req.query)
	res.json(1);
});

router.get('/delete-notice', function(req, res, next) {
	console.log(req.query)
	res.json(1);
});

router.get('/edit-notice', function(req, res, next) {
	console.log(req.query)
	res.json(1);
});


//云盘
router.get('/cloud_index', function(req, res, next) {
	res.render('cloud_index');
});

router.get('/folder_authority', function(req, res, next) {
	res.json(2);
});

router.get('/file_authority', function(req, res, next) {
	res.json(2);
});

router.get('/getallinfolder', function(req, res, next) {
	var temp = new Date().getTime();
	var dataListOfFolder = [
		{
			id: '1',
			type: '1',
			hasAuthority: 1,
			isShare : 1,
			isPublic : 1,
			initDate: new Date(temp),
			name: '测试文件夹1'
		},
		{
			id: '2',
			type: '2',
			hasAuthority: 1,
			initDate: new Date(temp+3000),
			name: '测试文件夹2'
		},
		{
			id: '3',
			hasAuthority: 1,
			initDate: new Date(temp+2000),
			name: '测试文件夹3'
		},
		{
			id: '4',
			hasAuthority: 1,
			initDate: new Date(temp+1000),
			name: '测试文件夹4'
		},
		{
			id: '5',
			hasAuthority: 2,
			initDate: new Date(temp+4000),
			name: '测试文件夹5'
		},
		{
			id: '6',
			hasAuthority: 2,
			initDate: new Date(temp+5000),
			name: '测试文件夹6'
		}
	];

	var dataListOfFile = [
		{
			id: '1',
			type: '1',
			hasAuthority: 0,
			initDate: new Date(temp+6000),
			name: 'New Text Document.txt',
			src: 'http://127.0.0.1:3000/dist/img/New Text Document.txt'
		},
		{
			id: '2',
			type: '2',
			hasAuthority: 1,
			initDate: new Date(temp+7000),
			name: 'extofgong_chen.pdf',
			src: 'http://127.0.0.1:3000/dist/img/extofgong_chen.pdf'
		},
		{
			id: '3',
			hasAuthority: 1,
			initDate: new Date(temp+8000),
			name: '阿尔法.png',
			src: 'http://127.0.0.1:3000/dist/img/photo1.png'
		},
		{
			id: '4',
			hasAuthority: 2,
			initDate: new Date(temp+9000),
			name: '阿尔法2.js',
			src: 'http://127.0.0.1:3000/dist/img/controller.js'
		},
		{
			id: '5',
			hasAuthority: 2,
			initDate: new Date(temp+10000),
			name: '定价模型_beta.docx',
			src: 'http://127.0.0.1:3000/TransCloud/交托帮/定价模型_beta.docx'
		}
	];
	
	var dataListOfDir = [
		{
			id: '1',
			name: '交托帮'
		},
		{
			id: '2',
			name: '项目1'
		},
		{
			id: '3',
			name: '小组3'
		}
	];
	
	console.log(req.query.id);
	
	res.json({
		folder: dataListOfFolder,
		file: dataListOfFile,
		dir: dataListOfDir
	});
});

router.get('/copy_file_to', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/copy_folder_to', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/move_file_to', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/move_folder_to', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/delete_file', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/delete_folder', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/rename_file', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/rename_folder', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/get_friend_tag_list', function(req, res, next) {
	console.log(req.query);
	res.json(
		[
			{
				id: 1,
				name: '标签1'
			},
			{
				id: 2,
				name: '标签2'
			}
		]
	);
});

router.get('/get_file_visibility_list', function(req, res, next) {
	console.log(req.query);
	res.json(
		{
			value: 3,
			sublist: [
				 '标签1',
				 '标签2',
				 '标签4'
			],
			tail: [
				{
					id: 1,
					name: '张震宇'
				},
				{
					id: 2,
					name: '刘强'
				},
				{
					id: 3,
					name: '李玉'
				}
			]
		}
	);
});

router.get('/get_folder_visibility_list', function(req, res, next) {
	console.log(req.query);
	res.json(
		{
			value: 3,
			sublist: [
				 '标签1',
				 '标签2',
				 '标签4'
			],
			tail: [
				{
					id: 1,
					name: '张震宇'
				},
				{
					id: 2,
					name: '刘强'
				},
				{
					id: 3,
					name: '李玉'
				}
			]
		}
	);
});

router.get('/get_friend_list', function(req, res, next) {
	console.log(req.query);
	res.json(
		[
			{
				id: 1,
				name: '张震宇'
			},
			{
				id: 2,
				name: '刘强'
			},
			{
				id: 3,
				name: '李玉'
			},
			{
				id: 4,
				name: '陈红'
			}
		]
	);
});
router.get('/create_friend_tag', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});
router.get('/update_friend_tag', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});
router.get('/get_friend_in_tag', function(req, res, next) {
	console.log(req.query);
	res.json(
		[
			{
				id: 1,
				name: '张震宇'
			}
		]
	);
});
router.get('/update_file_folder_visibility', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/get_group_member_list', function(req, res, next) {
	console.log(req.query);
	res.json(
		[
			{
				id: 1,
				name: '张震宇'
			},
			{
				id: 2,
				name: '刘强'
			},
			{
				id: 3,
				name: '李玉'
			},
			{
				id: 4,
				name: '陈红'
			}
		]
	);
});

router.get('/test_select', function(req, res, next) {
	console.log(req.query);
	res.json(
		[
			{
				id: 1,
				name: '张震宇'
			},
			{
				id: 2,
				name: '刘强'
			},
			{
				id: 3,
				name: '李玉'
			},
			{
				id: 4,
				name: '陈红'
			}
		]
	);
});

router.get('/delete_From_share_list', function(req, res, next) {
	console.log(req.query);
	res.json(1);
})

router.get('/find_user_by_id', function(req, res, next) {
	console.log(req.query);
	res.json(
		{
			id: 1,
			name: '测试用户',
			img: 'http://127.0.0.1:3000/dist/img/avatar.png',
			hasAuthority: 1
		}
	);
});

router.get('/update_shared_with_authority', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/add_user_to_shared_with', function(req, res, next) {
	console.log(req.query);
	res.json(1);
});

router.get('/get_shared_with_group', function(req, res, next) {
	console.log(req.query);
	res.json({
		default: 0,
		users: [
			{
				id: 1,
				name: '张震宇'
			}
		]
	});
});


router.get('/get_public_files_folders', function(req, res, next) {
	console.log(req.query);
	var dataListOfFolder = [
		{
			id: '1',
			name: '测试文件夹1'
		},
		{
			id: '2',
			name: '测试文件夹2'
		},
		{
			id: '3',
			name: '测试文件夹3'
		},
		{
			id: '4',
			name: '测试文件夹4'
		},
		{
			id: '5',
			name: '测试文件夹5'
		},
		{
			id: '6',
			name: '测试文件夹6'
		}
	];

	var dataListOfFile = [
		{
			id: '1',
			name: '测试文件1',
			src: 'http://127.0.0.1:3000/dist/img/New Text Document.txt'
		},
		{
			id: '2',
			name: '测试文件2',
			src: 'http://127.0.0.1:3000/dist/img/extofgong_chen.pdf'
		},
		{
			id: '3',
			name: '测试文件3',
			src: 'http://127.0.0.1:3000/dist/img/photo1.png'
		},
		{
			id: '4',
			name: '测试文件4',
			src: 'http://127.0.0.1:3000/dist/img/controller.js'
		}
	];
	
	var dataListOfDir = [
		{
			id: '1',
			name: '目录1'
		},
		{
			id: '2',
			name: '目录2'
		},
		{
			id: '3',
			name: '目录3'
		}
	];
	
	// Math.random()*5
	// console.log();
	

	var getRandomFromArray = function(array){
		var number = Math.floor(Math.random()*array.length);
		var result = [];
		for(var i=0;i<number; i++){
			result.push(array[i]);
		}
		return result
	};
	
	res.json({
		dir: getRandomFromArray(dataListOfDir),
		files: getRandomFromArray(dataListOfFile),
		folders: getRandomFromArray(dataListOfFolder)
	});
});


router.get('/getmyfolder', function(req, res, next) {
	console.log(req.query);
	
	var dataListOfFolder = [
		{
			id: '1',
			name: '测试文件夹1'
		},
		{
			id: '2',
			name: '测试文件夹2'
		},
		{
			id: '3',
			name: '测试文件夹3'
		},
		{
			id: '4',
			name: '测试文件夹4'
		},
		{
			id: '5',
			hasAuthority: 2,
			name: '测试文件夹5'
		},
		{
			id: '6',
			name: '测试文件夹6'
		}
	];
	

	
	res.json({
		pid: 1,
		id: 1,
		name: '当前目录',
		list: dataListOfFolder
	});
});

//模板
router.get('/template', function(req, res, next) {
	res.render('template');
});




module.exports = router;
