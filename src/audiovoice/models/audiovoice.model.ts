import { Column, DataType, Model, Table } from "sequelize-typescript"

interface AudiovoiceCreationAttr{
    audiobookId:number
    voiceName:string
}

@Table({ tableName: 'audiovoice', timestamps: false })
export class Audiovoice extends Model<Audiovoice, AudiovoiceCreationAttr> {
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
  audiobookId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  voiceName: string;
}
