import { body, param, validationResult } from "express-validator";

export const validateGetUser = [
	param("id").isInt().withMessage("User ID must be a valid integer"),
];

export const validateCreateUser = [
	body("name")
		.isString()
		.withMessage("Name must be a string")
		.notEmpty()
		.withMessage("Name is required"),
];

export const validateBorrowBook = [
	param("userId").isInt().withMessage("User ID must be a valid integer"),
	param("bookId").isInt().withMessage("Book ID must be a valid integer"),
];

export const validateReturnBook = [
	param("userId").isInt().withMessage("User ID must be a valid integer"),
	param("bookId").isInt().withMessage("Book ID must be a valid integer"),
	body("score").isInt().withMessage("Score must be a valid integer"),
];

export const handleValidationErrors = (req: any, res: any, next: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
