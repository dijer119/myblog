const Company = require('models/company')
const { ObjectId } = require('mongoose').Types
const Joi = require('joi')

/* 포스트 작성
   POST /api/posts
   { title, body } */
exports.write = async (ctx) => {
	// REST API의 request body 는 ctx.request.body 에서 조회 할 수 있습니다.

	const schema = Joi.object().keys({
		code: Joi.string().required(),
	})

	const result = Joi.validate(ctx.request.body, schema)

	if (result.error) {
		ctx.status = 400
		ctx.body = result.error
		return
	}
	const {
		code
	} = ctx.request.body;

	// const company = new Company({
	// 	code
	// })

	try {
		// await company.save()
		ctx.body = company
	} catch (e) {
		ctx.throw(e, 500)
	}
}