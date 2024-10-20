import { Request, Response, NextFunction } from "express";
import { Book } from "../models/Book";
import { Borrow } from "../models/Borrow";
import { Op } from "sequelize";
import logger from "../logger";
import { NotFoundError } from "../utils/customErrors";

export const getBooks = async (
	_req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	logger.info("getBooks: Request to fetch all books started");
	try {
		const books = await Book.findAll();
		logger.info(`getBooks: Fetched ${books.length} books successfully`);
		res.json(books);
	} catch (error) {
		logger.error("getBooks: Error occurred while fetching books", error);
		next(error);
	}
};

export const getBook = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	logger.info("getBook: Request to fetch book started");
	try {
		const bookId = req.params.id;
		logger.debug(`getBook: Fetching book with ID ${bookId}`);

		const book = await Book.findByPk(bookId);
		if (!book) {
			logger.warn(`getBook: Book with ID ${bookId} not found`);
			next(new NotFoundError("Book not found"));
			return;
		}

		logger.info(`getBook: Book with ID ${bookId} found`);

		const result = await Borrow.findAll({
			attributes: ["score"],
			where: {
				bookId,
				score: { [Op.ne]: null },
			},
		});

		const scores: number[] = result.map((record) => record.score as number);
		logger.debug(
			`getBook: Retrieved ${scores.length} scores for book with ID ${bookId}`
		);

		const averageScore =
			scores.length > 0
				? scores.reduce((sum, score) => sum + score, 0) / scores.length
				: null;

		logger.info(
			`getBook: Average score for book with ID ${bookId} is ${
				averageScore?.toFixed(2) ?? "N/A"
			}`
		);

		res.json({
			id: book?.id,
			name: book?.name,
			score: averageScore?.toFixed(2) ?? "-1",
		});
	} catch (error) {
		logger.error("getBook: Error occurred while fetching book data", error);
		next(error);
	}
};

export const createBook = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	logger.info("createBook: Request to create a new book started");
	try {
		const { name } = req.body;
		logger.debug(`createBook: Creating a new book with name "${name}"`);

		const newBook = await Book.create({ name });
		logger.info(
			`createBook: Successfully created new book with ID ${newBook.id}`
		);

		res.status(201).json(newBook);
	} catch (error) {
		logger.error("createBook: Error occurred while creating a new book", error);
		next(error);
	}
};
