import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GenreCreationAttr{
    name: string;
}

@Table({ tableName: 'genre', timestamps: false })
export class Genre extends Model<Genre, GenreCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
}
