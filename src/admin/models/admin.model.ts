import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AdminCreationAttr {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  hashed_password: string;
  confirm_password: string;
  hashed_refresh_token: string;
  role: string;
  is_active: boolean;
  is_creator: boolean;
}

@Table({ tableName: 'admin', timestamps: false })
export class Admin extends Model<Admin, AdminCreationAttr> {
  // [x: string]: any;
  @ApiProperty({
    example: 1,
    description: 'Admin unique ID',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'alishex',
    description: 'Admin full name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Admin email address',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: '+998999999999',
    description: 'Admin phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: 'ahkhd645',
    description: 'Admin  password',
  })
  @Column({
    type: DataType.STRING(255),
  })
  password: string;

  @ApiProperty({
    example: 'hdhkzbkj4787',
    description: 'Admin hashed refresh token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'jsgadjgddhljaljdjq',
    description: 'Admin hashed refresh token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'admin',
    description: 'Admin role',
  })
  @Column({
    type: DataType.STRING,
  })
  role: string;

  @ApiProperty({
    example: true,
    description: 'Admin active or inactive',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: true,
    description: 'Admin creator or not',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;
}
