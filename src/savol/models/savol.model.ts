import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SavolCreationAttr{
    bookId: number;
}

@Table({ tableName: 'savol', timestamps: false })
export class Savol extends Model<Savol, SavolCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookId: number;
}
