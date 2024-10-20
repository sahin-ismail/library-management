import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { Book } from "../models/Book";
import { Borrow } from "../models/Borrow";
import logger from "../logger";
import { NotFoundError, AlreadyBorrowedError } from "../utils/customErrors";

interface BookDetails {
	name: string;
	userScore?: number;
}

interface UserBooks {
	past: BookDetails[];
	present: BookDetails[];
}

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	logger.info("getUsers: Request to fetch all users started");
	try {
		const users = await User.findAll();
		logger.info(`getUsers: Fetched ${users.length} users successfully`);
		res.json(users);
	} catch (error) {
		logger.error("getUsers: Error occurred while fetching users", error);
		next(error);
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	logger.info("getUser: Request to fetch user started");
	try {
		const user = await User.findByPk(req.params.id);

		if (user) {
			logger.info(`getUser: User with ID ${user.id} found`);

			const borrowRecords = await Borrow.findAll({
				where: { userId: user.id },
				include: [{ model: Book, attributes: ["name"] }],
			});

			const books: UserBooks = { past: [], present: [] };

			borrowRecords.forEach((borrow: any) => {
				const book = borrow.Book;

				if (borrow.score !== null) {
					books.past.push({ name: book.name, userScore: borrow.score });
				} else {
					books.present.push({ name: book.name });
				}
			});

			logger.info(
				`getUser: User with ID ${user.id} has ${books.past.length} past books and ${books.present.length} present books`
			);

			res.json({
				id: user.id,
				name: user.name,
				books,
			});
		} else {
			logger.warn(`getUser: User with ID ${req.params.id} not found`);
			next(new NotFoundError("User not found"));
		}
	} catch (error) {
		logger.error("getUser: Error occurred while fetching user data", error);
		next(error);
	}
};

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	logger.info("createUser: Request to create a new user started");
	try {
		const { name } = req.body;
		logger.debug(`createUser: Creating new user with name "${name}"`);

		const newUser = await User.create({ name });
		logger.info(
			`createUser: Successfully created new user with ID ${newUser.id}`
		);

		res.status(201).json(newUser);
	} catch (error) {
		logger.error("createUser: Error occurred while creating a new user", error);
		next(error);
	}
};

export const borrowBook = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	logger.info("borrowBook: Request to borrow a book started");
	try {
		const { userId, bookId } = req.params;

		const user = await User.findByPk(userId);
		const book = await Book.findByPk(bookId);

		if (!user || !book) {
			logger.warn(
				`borrowBook: User with ID ${userId} or Book with ID ${bookId} not found`
			);
			next(new NotFoundError("User or Book not found"));
			return;
		}

		const existingBorrow = await Borrow.findOne({
			where: { bookId: book?.id, score: null },
		});

		if (existingBorrow) {
			logger.warn(
				`borrowBook: Book with ID ${bookId} is already borrowed by another user`
			);
			next(
				new AlreadyBorrowedError("Book is already borrowed by another user")
			);
			return;
		}

		await Borrow.create({
			userId: Number(userId),
			bookId: Number(bookId),
			score: null,
		});

		logger.info(
			`borrowBook: Book with ID ${bookId} borrowed successfully by user with ID ${userId}`
		);
		res.status(204).send();
	} catch (error) {
		logger.error("borrowBook: Error occurred while borrowing the book", error);
		next(error);
	}
};

export const returnBook = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	logger.info("returnBook: Request to return a book started");
	try {
		const { userId, bookId } = req.params;
		const { score } = req.body;

		if (score === undefined) {
			logger.warn(
				`returnBook: Score is required for returning the book with ID ${bookId}`
			);
			res.status(400).json({ error: "Score is required" });
			return;
		}

		const user = await User.findByPk(userId);
		const book = await Book.findByPk(bookId);

		if (!user || !book) {
			logger.warn(
				`returnBook: User with ID ${userId} or Book with ID ${bookId} not found`
			);
			next(new NotFoundError("User or Book not found"));
			return;
		}

		const borrowRecord = await Borrow.findOne({
			where: { userId: user?.id, bookId: book?.id, score: null },
		});

		if (!borrowRecord) {
			logger.warn(
				`returnBook: No matching borrow record found for user ${userId} and book ${bookId}`
			);
			next(new NotFoundError("No matching borrow record found"));
			return;
		}

		await borrowRecord?.update({ score });

		logger.info(
			`returnBook: Book with ID ${bookId} successfully returned by user with ID ${userId} with score ${score}`
		);
		res.status(204).send();
	} catch (error) {
		logger.error("returnBook: Error occurred while returning the book", error);
		next(error);
	}
};
