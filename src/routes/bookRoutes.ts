import { Router } from "express";
import { getBooks, getBook, createBook } from "../controllers/bookController";
import {
	validateCreateBook,
	validateGetBook,
	handleValidationErrors,
} from "../validation/bookValidation";

const router = Router();

router.get("/", getBooks);

router.get("/:id", validateGetBook, handleValidationErrors, getBook);

router.post("/", validateCreateBook, handleValidationErrors, createBook);

export default router;
