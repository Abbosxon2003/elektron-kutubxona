
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface QuizCreationAttr{
    savolId: number;
    soni: number;
    question: string;
}

@Table({ tableName: 'quiz', timestamps: false })
export class Quiz extends Model<Quiz, QuizCreationAttr> {
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
  savolId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  soni: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  question: string;
}
