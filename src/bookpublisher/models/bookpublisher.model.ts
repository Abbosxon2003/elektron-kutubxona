import { Column, DataType, Model, Table } from "sequelize-typescript";

interface BookpublisherCreationAttr{
    bookId: number;
    publisherId: number;
    publishedYear: Date;
}

@Table({ tableName: 'bookpublisher', timestamps: false })
export class Bookpublisher extends Model<
  Bookpublisher,
  BookpublisherCreationAttr
> {
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
  publisherId: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  publishedYear: Date;
}

