import router from '../router.js'
import User from '../models/User'
import response from '../configs/response'

// 用户注册
router.post('/api/user/register', async (ctx, next) => {
    const {name, password} = ctx.request.body
    let res = response()
    let userInfo = await User.findOne({
    	username: name,
    })

    if(!name){
    	res.msg = '用户名不能为空'
    }else if(!password){
    	res.msg = '密码不能为空'
    }else{
    	if(userInfo){
	    	res.msg = '用户已存在'
	    }else{
	    	const user = new User({
		    	username: name,
		    	password,
		    })
		    user.save()
		    res.msg = '注册成功'
	    }
    }
    ctx.body = res
    await next()
});

// 用户登录
router.post('/api/user/login', async (ctx, next) => {
    const {name, password} = ctx.request.body
    let res = response()
    let userInfo = await User.findOne({
        username: name,
        password
    })
    console.log(ctx.cookies.get('test'))
    if(userInfo){
        res.msg = '登录成功'
        res.data = userInfo._id
    }else{
        res.msg = '用户名或密码错误'
    }
    
    // ctx.cookies.set('userInfo', JSON.stringify(userInfo))
    ctx.cookies.set('name', 'tobi');
    ctx.body = res
})