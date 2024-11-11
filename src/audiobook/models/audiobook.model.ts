import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AudiobookCreationAttr{
    bookId: number;
    duration: Date;
    filePath: string;
}

@Table({ tableName: 'audiobook', timestamps: false })
export class Audiobook extends Model<Audiobook, AudiobookCreationAttr> {
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
    type: DataType.DATEONLY,
    allowNull: false,
  })
  duration: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  filePath: string;
}
