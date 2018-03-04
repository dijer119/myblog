const Company = require('models/company')

exports.write = async (ctx) => {
	const {
		code
	} = ctx.request.body;
	const company = new Company({
		code
	})

	try	{
		await company.save()
		ctx.body = company
	} catch (e) {
		ctx.throw(e, 500)
	}
}