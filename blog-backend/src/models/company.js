const mongoose = require('mongoose')

const { Schema } = mongoose

// https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250 sample
const Company = new Schema({
  name: {
  	type: String,
  },
  code: {
  	type: String,
		index: { unique: true }
  },
	type: {
  	type: String,
		enum: ['KOSPI', 'KOSDAQ'],
	},
	currentPrice: {
  	type: Number,
	},
	eps: {
  	type: Number,
	},
	cnsEps: { //추정 EPS
  	type: Number,
	},
	bps: {
  	type: Number,
	},
	dividendPrice: {
  	type: Number,
	},
	dividendRate:{
  	type: Number,
	},
	gapType: {
  	type: String,
	},
	gapPrice: {
  	type: Number,
	},
	gapRate: {
  	type: Number,
	},
	sigaTotal: {
  	type: Number,
	},
	traceVolume: {
  	type: Number,
	},
	tags: {
  	type: [String],
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
	CompanyModel,
}