const { CommentModel } = require('../../models/comment')
const { CompanyModel } = require('../../models/company')
require('./mongolocal')

const code = '035420'

test('comment create', async() => {
	const company = await CompanyModel.findOne({ code }).exec()
	const comment = await CommentModel.create({
		comment: '잘들어가나?',
		code,
		company: company._id
	})
	expect(comment.code).toEqual('035420')
})

test(' comment populate ', async() => {
	const comment = await CommentModel.findOne({ code }).populate('company').exec()
	console.log(comment.comment)
	console.log(comment.company.name)
	expect(comment.company.name).toEqual('NAVER')
})
