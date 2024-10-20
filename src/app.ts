import express, { Request, Response } from "express";
import router from "./routes";
import sequelize from "./models/index";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router);

app.get("/", (_req: Request, res: Response) => {
	res.send("Library API is running");
});

app.use(errorHandler);

const startServer = async () => {
	try {
		await sequelize.sync({ force: false });
		console.log("Database connected");

		app.listen(3000, () => {
			console.log("Server is running on http://localhost:3000");
		});
	} catch (error) {
		console.error("Failed to connect to the database", error);
	}
};

startServer();
