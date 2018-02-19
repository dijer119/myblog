const { CommentModel } = require('../../models/comment')
require('./mongolocal')

test('comment create', async() => {
	const comment = await CommentModel.create({
		comment: '잘들어가나?',
		code: '0001',
	})
	expect(comment.code).toEqual('0001')
})

