var datas = {
	name: 'ivan',
	password: 'ivan'
}
fetch("http://localhost:3000/api/user/register",{
	method: 'POST', 
	headers:{
　　　　'Content-Type' : 'application/json'
　　},
　　body:JSON.stringify(datas)
}).then(res => {
	console.log(res)
})