import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewColProject1745131933090 implements MigrationInterface {
    name = 'AddedNewColProject1745131933090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."project" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."project" DROP COLUMN "description"`);
    }

}
