import { body, validationResult, param } from "express-validator";

export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 to 100 characters")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage(
      "Title can only have english small and capital case characters",
    ),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description length must be between 20 to 500 characters"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const updateProductValidator = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 to 100 characters")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage(
      "Title can only have english small and capital case characters",
    ),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage(
      "Description length must be between 20 to 500 characters",
    ),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  },
];

export const checkIdValidator = [
   param("id")
  .exists().withMessage("Product id is required in request params").bail()
  .isMongoId().withMessage("Product id must be a valid mongo object id"),
  (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data",
        errors : errors.array()
      })
    }
    next()

  }
]