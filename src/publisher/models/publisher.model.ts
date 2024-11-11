import { Column, DataType, Model, Table } from "sequelize-typescript"

interface PublisherCreationAttr{
    name: string
    address: string
    phone: string
}

@Table({ tableName: 'publisher', timestamps: false })
export class Publisher extends Model<Publisher, PublisherCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  phone: string;
}
