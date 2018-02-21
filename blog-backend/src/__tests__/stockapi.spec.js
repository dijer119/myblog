const axios = require('axios')

const code = '035420'
const url = `http://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:${code}`
const config = {
	headers: {
		'Content-Type': '',
		'Accept': ''
	}
}

test(' stock api', async () => {
	// const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
	const res = await axios.get('http://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:035420')
	console.log(res)
})