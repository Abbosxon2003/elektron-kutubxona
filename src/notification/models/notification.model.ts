import { Column, DataType, Model, Table } from "sequelize-typescript"


interface NotificationCreationAttr{
    bookId: number
    message: string
    createdAt: Date
}

@Table({ tableName: 'notification', timestamps: false })
export class Notification extends Model<Model, NotificationCreationAttr> {
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
    type: DataType.STRING(255),
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date,
  })
  createdAt: Date;
}
