import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() // TypeORM já mapeia corretamente como INTEGER PRIMARY KEY AUTOINCREMENT
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true }) // Mantendo o email único
    email!: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
