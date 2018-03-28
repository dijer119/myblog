const mongoose = require('mongoose')

const { Schema } = mongoose

// https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250 sample
const Comment = new Schema({
	comment: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		index: true,
	},
	createDate: {
		type: Date,
		default: new Date()
	},
	modifiedDate: {
		type: Date,
		default: new Date()
	},
  company : {
	  type: mongoose.Schema.Types.ObjectId, ref: 'Company'
  }
})

const CommentModel = mongoose.model('Comment', Comment)


module.exports = {
	Comment,
	CommentModel,
}