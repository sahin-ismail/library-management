import { Model, DataTypes } from "sequelize";
import sequelize from "./index";
import { User } from "./User";
import { Book } from "./Book";

class Borrow extends Model {
	public id!: number;
	public userId!: number;
	public bookId!: number;
	public score!: number | null;
}

Borrow.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
		bookId: {
			type: DataTypes.INTEGER,
			references: {
				model: Book,
				key: "id",
			},
		},
		score: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: "Borrow",
		tableName: "borrows",
		timestamps: false,
	}
);

Borrow.belongsTo(User, { foreignKey: "userId" });
Borrow.belongsTo(Book, { foreignKey: "bookId" });

export { Borrow };
