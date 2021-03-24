import Joi from "@hapi/joi";

export function ValidateUser(body){
    const schema = Joi.object({
        email: Joi.string().min(4).required().email(),
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        membership: Joi.string().required(),
        isAdmin: Joi.boolean().required(),
  });
  return schema.validate(body);
}

export default ValidateUser;