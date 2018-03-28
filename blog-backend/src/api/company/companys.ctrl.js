const { CompanyModel } = require('models/company')


exports.list = async (ctx) => {
  const { tag, peopleTags, type, sortType='sigaTotal', searchKeyword, like } = ctx.query


  let query = {}
  query =  tag ? {...query, tags: tag} : query
  query = type ? {...query, type} : query
  query = peopleTags ? {...query, peopleTags} : query
  query = like ? {...query, like} : query

  const regex = new RegExp(searchKeyword, "i")
  query = searchKeyword ? {...query, name: regex} : query

  try {
    const companies = await CompanyModel.find(query)
      .sort({ [sortType]: -1 })
      .limit(100)
      // .skip((page - 1) * 10)
      .lean()
      .exec()
    const count = await CompanyModel.count(query).exec()

    // ctx.set('Last-Page', Math.ceil(count / 10))
    console.log(` company list count => ${count}`)
    ctx.body = companies
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