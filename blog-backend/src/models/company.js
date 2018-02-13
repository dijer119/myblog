const mongoose = require('mongoose')

const { Schema } = mongoose

// https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250 sample
const Company = new Schema({
  name: {
  	type: String,
	  required: true,
  },
  code: {
  	type: String,
	  required: true,
	  unique: true,
  },
	type: {
  	type: String,
		enum: ['KOSPI', 'KOSDAQ'],
		required: true
	},
  createDate: {
    type: Date,
    default: new Date()
  },
  modifiedDate: {
    type: Date,
    default: new Date()
  }
})

const CompanyModel = mongoose.model('Company', Company)


module.exports = {
	Company,
	CompanyModel,
}