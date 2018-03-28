const { CommentModel } = require('models/comment')
const { CompanyModel } = require('models/company')


exports.listAll = async (ctx) => {
  try{

  } catch (e) {
    ctx.throw(e, 500)
  }
}
exports.list = async (ctx) => {

  try {
  } catch (e) {
    ctx.throw(e, 500)
  }
}

exports.write = async (ctx) => {
  try	{
    const {
      comment,
      code,
    } = ctx.request.body;

    const company = await CompanyModel.findOne({code}).exec()

    const commentModel = new CommentModel({
      code,
      comment,
      company: company._id
    })

    await commentModel.save()

    ctx.body = commentModel
  } catch (e) {
    ctx.throw(e, 500)
  }
}

exports.read = async (ctx) => {
  try {
  } catch (e) {
    ctx.throw(e, 500)
  }
}

exports.update = async(ctx) => {
  try {
  } catch (e) {
    ctx.throw(e, 500)
  }
}