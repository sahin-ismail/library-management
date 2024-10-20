import { Router } from "express";
import {
	getUsers,
	getUser,
	createUser,
	borrowBook,
	returnBook,
} from "../controllers/userController";
import {
	validateGetUser,
	validateCreateUser,
	validateBorrowBook,
	validateReturnBook,
	handleValidationErrors,
} from "../validation/userValidation";

const router = Router();

router.get("/", getUsers);
router.get("/:id", validateGetUser, handleValidationErrors, getUser);

router.post("/", validateCreateUser, handleValidationErrors, createUser);

router.post(
	"/:userId/borrow/:bookId",
	validateBorrowBook,
	handleValidationErrors,
	borrowBook
);

router.post(
	"/:userId/return/:bookId",
	validateReturnBook,
	handleValidationErrors,
	returnBook
);

export default router;
