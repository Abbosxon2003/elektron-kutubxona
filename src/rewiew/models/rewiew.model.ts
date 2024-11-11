import { Column, DataType, Model, Table } from "sequelize-typescript"

interface RewiewCreationAttr{
    bookId: number
    userId: number
    rating: number
    rewiewText: string
    rewiewAt: Date
}

@Table({ tableName: 'rewiew', timestamps: false })
export class Rewiew extends Model<Rewiew, RewiewCreationAttr> {
  2
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating: number;

  @Column({
    type: DataType.TEXT,
  })
  rewiewText: string;

  @Column({
    type: DataType.DATEONLY,
    defaultValue: new Date
  })
  rewiewAt: Date;
}
