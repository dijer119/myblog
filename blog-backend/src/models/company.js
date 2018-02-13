const mongoose = require('mongoose')

const { Schema } = mongoose

const Company = new Schema({
  name: String,
  code: String,
  createDate: {
    type: Date,
    default: new Date()
  },
  modifiedDate: {
    type: Date,
    default: new Date()
  }
})