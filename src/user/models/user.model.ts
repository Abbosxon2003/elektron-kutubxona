import { Column, DataType, Model, Table } from "sequelize-typescript"

interface UserCreationAttr {
  notificationId: number;
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  hashed_refresh_token: string;
  is_active: boolean;
}

@Table({ tableName: 'user', timestamps: false })
export class User extends Model<User, UserCreationAttr> {
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
  notificationId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING(255),
  })
  confirm_password: string;

  @Column({
    type: DataType.STRING(255),
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING(255),
  })
  phone: string;

  @Column({
    type: DataType.STRING(255),
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING(255),
  })
  activation_link: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;
}
