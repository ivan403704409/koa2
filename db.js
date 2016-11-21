import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27018/blog', (err) => {
	if(err){
		console.log('db connect fail')
	}else{
		console.log('db connect success')
	}
})