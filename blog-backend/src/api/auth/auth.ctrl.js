const { ADMIN_PASS: adminPass } = process.env

exports.login = (ctx) => {
	const { password } = ctx.request.body
	if (adminPass === password) {
		ctx.body = {
			success: true,
		}
		ctx.session.logged = true
		console.log('login success !!')
	} else {
		ctx.body = {
			success: false,
		}
		ctx.status = 401 //Unauthorized
		console.log('login fail !!')
	}
}

exports.check = (ctx) => {
	ctx.body = {
		logged: !!ctx.session.logged,
	}
  console.log('check success !!')
}

exports.logout = (ctx) => {
	ctx.session = null
	ctx.status = 204
  console.log('logout success !!')
}