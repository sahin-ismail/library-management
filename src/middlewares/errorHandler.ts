import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
	status: number;
	message: string;
}

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err.stack);

	const errorResponse: ErrorResponse = {
		status: 500,
		message: "Internal Server Error",
	};

	switch (err.name) {
		case "SequelizeUniqueConstraintError":
			errorResponse.status = 400;
			errorResponse.message = "Duplicate entry";
			break;
		case "SequelizeForeignKeyConstraintError":
			errorResponse.status = 400;
			errorResponse.message = "Foreign key constraint violation";
			break;
		case "SequelizeValidationError":
			errorResponse.status = 400;
			errorResponse.message = "Validation error";
			break;
		case "NotFoundError":
			errorResponse.status = 404;
			errorResponse.message = err.message || "Not Found";
			break;
		case "AlreadyBorrowedError":
			errorResponse.status = 400;
			errorResponse.message = "Book already borrowed by someone else";
			break;
	}

	res.status(errorResponse.status).json({ error: errorResponse.message });
};

export default errorHandler;
