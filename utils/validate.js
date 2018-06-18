const Joi = require('joi')

module.exports = {
  schemas: {
    newLocalprod: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      image: Joi.string().required(),
      desc: Joi.string().required(),
      info: Joi.string().required()
    }),
    editLocalprod: Joi.object().keys({
      name: Joi.string(),
      price: Joi.number(),
      image: Joi.string(),
      desc: Joi.string(),
      info: Joi.string(),
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }),
    idQuery: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },

  validate: {
    validateBody: schema => {
      return async (req, res, next) => {
        const result = Joi.validate(req.body, schema)
        if (result.error) {
          throw result.error
          // res.status(400).json({
          //   msg: '请稍后再试'
          // })
        } else {
          if (!req.value) req.value = {}
          if (!req.value.body) req.value.body = result.value
          await next()
        }
      }
    },
    validateParam: (schema) => {
      return async (req, res, next) => {
        const result = Joi.validate(req.query, schema)
        if (result.error) {
          throw result.error
        } else {
          if (!req.value) req.value = {}
          if (!req.value.query) req.value.query = result.value
          await next()
        }
      }
    }
  }
}
