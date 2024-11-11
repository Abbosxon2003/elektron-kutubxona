import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CategoryCreationAttr{
    name: string;
}

@Table({ tableName: 'category', timestamps: false })
export class Category extends Model<Category, CategoryCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}