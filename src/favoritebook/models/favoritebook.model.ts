import { Column, DataType, Model, Table } from "sequelize-typescript";

interface FavoritebookCreationAttr{
    bookId: number;
    userId: number;
    addedAt: Date
}

@Table({ tableName: 'favorite_book', timestamps: false })
export class Favoritebook extends Model<Favoritebook, FavoritebookCreationAttr> {
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.DATE,
  })
  addedAt: Date;
}
