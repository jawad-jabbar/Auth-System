const validateMiddleware = (schemas) => {
  return (req, res, next) => {
    const errors = [];

    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, { abortEarly: false });
      if (error) errors.push(...error.details.map((detail) => detail.message));
    }

    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, { abortEarly: false });
      if (error) errors.push(...error.details.map((detail) => detail.message));
    }

    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, { abortEarly: false });
      if (error) errors.push(...error.details.map((detail) => detail.message));
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    next();
  };
};

module.exports = validateMiddleware;
