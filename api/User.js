import router from '../router.js'
import User from '../models/User'

// 用户注册
router.post('/api/user/register', async (ctx, next) => {
    const {name, password} = ctx.request.body
    let res = {
    	stat: 1,
    	data: null,
    	message: '',
    }
    let userInfo = await User.findOne({
    	username: name,
    })

    if(!name){
    	res.message = '用户名不能为空'
    }else if(!password){
    	res.message = '密码不能为空'
    }else{
    	if(userInfo){
	    	res.message = '用户已存在'
	    }else{
	    	const user = new User({
		    	username: name,
		    	password,
		    })
		    user.save()
		    res.message = '注册成功'
	    }
    }
    ctx.body = res
    await next()
});
