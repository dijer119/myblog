
exports.checkObjectId = (ctx, next) => {
	const { id } = ctx.params

	if (!ObjectId.isValid(id)) {
		ctx.status = 400
		return `잘못된 object id > ${id}`
	}
	return next()
}