const Post = require('models/post')
const { ObjectId } = require('mongoose').Types
const Joi = require('joi')

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params

  if (!ObjectId.isValid(id)) {
    ctx.status = 400
    return `잘못된 object id > ${id}`
  }
  return next()
}

/* 포스트 작성
   POST /api/posts
   { title, body } */
exports.write = async (ctx) => {
  // REST API의 request body 는 ctx.request.body 에서 조회 할 수 있습니다.

  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  })

  const result = Joi.validate(ctx.request.body, schema)

  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }
  const {
    title,
    body,
    tags,
  } = ctx.request.body;

  const post = new Post({
    title, body, tags,
  })

  try {
    await post.save()
    ctx.body = post
  } catch (e) {
    ctx.throw(e, 500)
  }
}

/* 포스트 목록 조회
   GET /api/posts */
exports.list = async (ctx) => {
  const page = parseInt(ctx.query.page || 1, 10)
  const { tag } = ctx.query

  const query = tag ? {
    tags: tag
  } : {}

  if (page < 1) {
    ctx.status = 400
    return
  }

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec()
    const count = await Post.count(query).exec()
    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
    });
    // ctx.set 은 response header 를 설정해줍니다.
    ctx.set('Last-Page', Math.ceil(count / 10))
    ctx.body = posts.map(limitBodyLength)
  } catch (e) {
    ctx.throw(e, 500)
  }
};

/* 특정 포스트 조회
   GET /api/posts/:id */
exports.read = async (ctx) => {
  const { id } = ctx.params
  try {
    const post = await Post.findById(id).exec()

    if (!post) {
      ctx.status = 404
      return
    }

    ctx.body = post
  } catch (e) {
    ctx.throw(e, 500)
  }
};

/* 특정 포스트 제거
   DELETE /api/posts/:id */
exports.remove = async (ctx) => {
  const { id } = ctx.params
  try {
    await Post.findByIdAndRemove(id).exec()

    ctx.status = 204
  } catch (e) {
    ctx.throw(e, 500)
  }
};

/* 포스트 수정 (교체)
  PUT /api/posts/:id
  { title, body } */
exports.replace = (ctx) => {}

/* 포스트 수정 (특정 필드 변경)
   PATCH /api/posts/:id
   { title, body } */
exports.update = async (ctx) => {
  const { id } = ctx.params
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
      // 이 값을 설정해 주어야 업데이트 된 객체를 반환합니다.
    }).exec()

    if (!post) {
      ctx.status = 404
      return
    }

    ctx.body = post
  } catch (e) {
    ctx.throw(e, 500)
  }
};