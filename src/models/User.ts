import { Model, DataTypes } from "sequelize";
import sequelize from "./index";
import { Book } from "./Book";

class User extends Model {
	public id!: number;
	public name!: string;
}

User.init(
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
		modelName: "User",
		tableName: "users",
		timestamps: false,
	}
);

User.belongsToMany(Book, { through: "UserBooks" });
Book.belongsToMany(User, { through: "UserBooks" });

export { User };
