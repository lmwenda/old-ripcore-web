import Joi from "@hapi/joi";

export function ValidateUser(body){
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required(),
        membership: Joi.string().required()
  });
  return schema.validate(body);
}

export default ValidateUser;