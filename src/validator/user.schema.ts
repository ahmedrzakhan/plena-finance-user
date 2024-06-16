import * as Joi from 'joi';

class CreateUserDto {
  name: string;
  surname: string;
  username: string;
  birthDate: string;
}

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  username: Joi.string().required(),
  birthDate: Joi.date().iso().required(),
});

export { createUserSchema, CreateUserDto };
