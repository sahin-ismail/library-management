import { Model, DataTypes } from "sequelize";
import sequelize from "./index";

class Book extends Model {
	public id!: number;
	public name!: string;
}

Book.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Book",
		tableName: "books",
		timestamps: false,
	}
);

export { Book };
