import { MigrationInterface, QueryRunner } from "typeorm";

export class MissingColProjects1745217920906 implements MigrationInterface {
    name = 'MissingColProjects1745217920906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."project" ADD "status" text NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" ADD "type_projet" text NOT NULL DEFAULT 'development'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."project" DROP COLUMN "type_projet"`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" DROP COLUMN "status"`);
    }

}
