import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtestcol1744120256845 implements MigrationInterface {
    name = 'Addtestcol1744120256845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."user" ADD "ad" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."user" DROP COLUMN "ad"`);
    }

}
