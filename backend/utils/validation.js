const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin')
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const taskCreateSchema = Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().required().max(500),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
    priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
    dueDate: Joi.date()
});

const taskUpdateSchema = Joi.object({
    title: Joi.string().max(100),
    description: Joi.string().max(500),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
    priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
    dueDate: Joi.date()
});

module.exports = {
    registerSchema,
    loginSchema,
    taskCreateSchema,
    taskUpdateSchema
};
