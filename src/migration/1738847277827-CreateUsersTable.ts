import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1738847277827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"users",
            columns:[
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:"increment"   
                },
                {
                    name:"name",
                    type:"varchar"
                }, 
                {
                   name:"email",
                   type:"varchar",
                   isUnique:true,
                },
                {
                   name:"createdAt",
                   type:"datetime",
                   default:"CURRENT_TIMESTAMP"
                },
                {
                   name:"updatedAt",
                   type:"datetime",
                   default:"CURRENT_TIMESTAMP",
                   onUpdate:"CURRENT_TIMESTAMP"   
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Users")
    }

}
