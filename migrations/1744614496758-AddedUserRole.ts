import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserRole1744614496758 implements MigrationInterface {
    name = 'AddedUserRole1744614496758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."user" ADD "role" text NOT NULL DEFAULT 'Admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."user" DROP COLUMN "role"`);
    }

}
