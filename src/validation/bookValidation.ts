import { body, param, validationResult } from "express-validator";

export const validateCreateBook = [
	body("name")
		.isString()
		.withMessage("Name must be a string")
		.notEmpty()
		.withMessage("Name is required"),
];

export const validateGetBook = [
	param("id").isInt().withMessage("Book ID must be a valid integer"),
];

export const handleValidationErrors = (req: any, res: any, next: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
