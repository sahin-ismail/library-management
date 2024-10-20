class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}

class AlreadyBorrowedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AlreadyBorrowedError";
	}
}

export { NotFoundError, AlreadyBorrowedError };
