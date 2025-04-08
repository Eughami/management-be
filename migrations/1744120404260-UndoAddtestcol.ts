import { MigrationInterface, QueryRunner } from "typeorm";

export class UndoAddtestcol1744120404260 implements MigrationInterface {
    name = 'UndoAddtestcol1744120404260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."user" DROP COLUMN "ad"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."user" ADD "ad" text NOT NULL`);
    }

}
