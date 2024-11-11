import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AuthorCreationAttr {
  name: string;
  birth_date: Date;
  description: string;
  address: string;
  death_date: Date;
}

@Table({ tableName: 'author', timestamps: false })
export class Author extends Model<Author, AuthorCreationAttr> {
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
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birth_date: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.DATEONLY,
  })
  death_date: Date;
}
