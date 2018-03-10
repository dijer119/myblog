const { CompanyModel } = require('models/company')


exports.list = async (ctx) => {
  const { tag, peopleTags } = ctx.query

  const query = tag ? {
    tags: tag
  } : {}


  try {
    const companys = await CompanyModel.find(query)
      .sort({ code: -1 })
      // .limit(10)
      // .skip((page - 1) * 10)
      .lean()
      .exec()
    const count = await CompanyModel.count(query).exec()
    // const limitBodyLength = post => ({
    //   ...post,
    //   body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
    // });
    // ctx.set 은 response headers 를 설정해줍니다.
    ctx.set('Last-Page', Math.ceil(count / 10))
    // ctx.body = posts.map(limitBodyLength)
    ctx.body = companys
  } catch (e) {
    ctx.throw(e, 500)
  }
}

exports.write = async (ctx) => {
	const {
		code
	} = ctx.request.body;
	const company = new CompanyModel({
		code
	})

	try	{
		await company.save()
		ctx.body = company
	} catch (e) {
		ctx.throw(e, 500)
	}
}

exports.read = async (ctx) => {
  const { code } = ctx.query
  const query = code ? {
    code: code
  } : {}

  try {
    const companys = await CompanyModel.find(query).exec()
    ctx.body = companys
  } catch (e) {
    ctx.throw(e, 500)
  }
}

exports.update = async(ctx) => {
  const { code } = ctx.params
  try {
    // const company = await CompanyModel.findByIdAndUpdate(id, ctx.request.body, {
    //   new: true
    //   // 이 값을 설정해 주어야 업데이트 된 객체를 반환합니다.
    // }).exec()
    //
    // code
    const company = await CompanyModel.findOneAndUpdate(
      { 'code': code},
      {$set: ctx.request.body},
      {new: true}
      ).exec()

    if (!company) {
      ctx.status = 404
      return
    }

    ctx.body = company

  } catch (e) {
    ctx.throw(e, 500)
  }
}