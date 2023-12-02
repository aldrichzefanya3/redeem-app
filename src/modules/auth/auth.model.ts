import * as Joi from 'joi';

export const signInModel = Joi.object({
    Email: Joi.string().email().required()
})