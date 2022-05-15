import Joi from 'joi';

const cacheBody: Joi.ObjectSchema = Joi.object({
  value: Joi.string().required().label('value'),
});

export const CacheValidation = {
  cacheBody,
};
