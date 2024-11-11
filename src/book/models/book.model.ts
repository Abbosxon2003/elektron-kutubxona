import { Column, DataType, Model, Table } from "sequelize-typescript";

interface BookCreationAttr {
  title: string;
  isbn: string;
  images: string;
  genreId: number;
  authorId: number;
  categoryId: number;
  totalCopies: number;
  availableCopies: number;
  isAudio: boolean;
}

@Table({ tableName: 'book', timestamps: false })
export class Book extends Model<Book, BookCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  isbn: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  images: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  genreId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalCopies: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  availableCopies: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isAudio: boolean;
}


