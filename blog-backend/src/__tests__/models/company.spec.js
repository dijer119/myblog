const { CompanyModel } = require('../../models/company')
require('./mongolocal')

test('', () => {
	const a = 1
	expect(a).toBe(1)
})

test('company create', async() => {
	const company = await CompanyModel.create({
		code: '0001',
		name: 'Naver',
		type: 'KOSPI',
	})
	expect(company.code).toBe('0001')
})

