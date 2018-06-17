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
    })
  },

  validate: {
    validateBody: schema => {
      return async (req, res, next) => {
        const result = Joi.validate(req.body, schema)
        if (result.error) {
          throw result.error
        } else {
          if (!req.value) req.value = {}
          if (!req.value.body) req.value.body = result.value
          await next()
        }
      }
    }
  }
}