const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const { error } = schema.validate({ email: 'email@example.com', password: '123456' });

if (error) {
  console.log(error.details[0].message);
}
