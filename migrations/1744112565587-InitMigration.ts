import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1744112565587 implements MigrationInterface {
    name = 'InitMigration1744112565587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vincent"."user" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, "created_by_id" uuid, "updated_by_id" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vincent"."beneficiaire" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "nom" text NOT NULL, "address" text NOT NULL, "tel" text NOT NULL, CONSTRAINT "PK_75ead94391ccbbe2e2fa112adb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vincent"."operation_finance" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "libelle_finan" text NOT NULL, "depense" bigint NOT NULL, "montant_entree" bigint NOT NULL, "gain" bigint NOT NULL, "observation" text NOT NULL, "project_id" uuid, CONSTRAINT "PK_6c27647a70cac361000ba546cb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vincent"."project" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "nom" text NOT NULL, "date_acquisition" TIMESTAMP WITH TIME ZONE NOT NULL, "date_debut" TIMESTAMP WITH TIME ZONE NOT NULL, "date_fin" TIMESTAMP WITH TIME ZONE NOT NULL, "date_cloture" TIMESTAMP WITH TIME ZONE NOT NULL, "budget" bigint NOT NULL, "beneficiaire_id" uuid, "expert_id" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vincent"."expert" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "nom" text NOT NULL, "specialite" text NOT NULL, "tel" text NOT NULL, CONSTRAINT "PK_0062630832658e718267ce2941f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vincent"."operation_technique" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "libelle" text NOT NULL, "date_debut" TIMESTAMP WITH TIME ZONE NOT NULL, "date_fin" TIMESTAMP WITH TIME ZONE NOT NULL, "expert_id" uuid, "project_id" uuid, CONSTRAINT "PK_3c323f400e8dbc2019b1d8eba45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vincent"."user" ADD CONSTRAINT "FK_b489bba7c2e3d5afcd98a445ff8" FOREIGN KEY ("created_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."user" ADD CONSTRAINT "FK_7a4f92de626d8dc4b05f06ad181" FOREIGN KEY ("updated_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."beneficiaire" ADD CONSTRAINT "FK_d144121faedf59dd975c2827c47" FOREIGN KEY ("created_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."beneficiaire" ADD CONSTRAINT "FK_417d58ae5786cbfd71950e89e68" FOREIGN KEY ("updated_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_finance" ADD CONSTRAINT "FK_296a1954fdb8d153f937546753e" FOREIGN KEY ("created_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_finance" ADD CONSTRAINT "FK_30096f04b3bce4b7b8b00239ca3" FOREIGN KEY ("updated_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_finance" ADD CONSTRAINT "FK_50cb3de5c135c04311673f0bf5a" FOREIGN KEY ("project_id") REFERENCES "vincent"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" ADD CONSTRAINT "FK_e155d8f98ec858daa457d6ff291" FOREIGN KEY ("created_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" ADD CONSTRAINT "FK_1f3c2190a7a8185fb02bf1132ce" FOREIGN KEY ("updated_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" ADD CONSTRAINT "FK_218248b1d173e88bc1abc976b8e" FOREIGN KEY ("beneficiaire_id") REFERENCES "vincent"."beneficiaire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" ADD CONSTRAINT "FK_dcfe4f6c3d921eac410f21afe74" FOREIGN KEY ("expert_id") REFERENCES "vincent"."expert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."expert" ADD CONSTRAINT "FK_cd6b656b7e770dc8d813938b9d3" FOREIGN KEY ("created_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."expert" ADD CONSTRAINT "FK_8ede57f01e92033f11ca07d4913" FOREIGN KEY ("updated_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_technique" ADD CONSTRAINT "FK_3ad34f506c5b8590d0668ec31d1" FOREIGN KEY ("created_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_technique" ADD CONSTRAINT "FK_8f8e0739919e841ee96f53137ed" FOREIGN KEY ("updated_by_id") REFERENCES "vincent"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_technique" ADD CONSTRAINT "FK_90999962158ecae04d75356eeaf" FOREIGN KEY ("expert_id") REFERENCES "vincent"."expert"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_technique" ADD CONSTRAINT "FK_1d0e4a7ec32de087e0e2c4faa68" FOREIGN KEY ("project_id") REFERENCES "vincent"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vincent"."operation_technique" DROP CONSTRAINT "FK_1d0e4a7ec32de087e0e2c4faa68"`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_technique" DROP CONSTRAINT "FK_90999962158ecae04d75356eeaf"`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_technique" DROP CONSTRAINT "FK_8f8e0739919e841ee96f53137ed"`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_technique" DROP CONSTRAINT "FK_3ad34f506c5b8590d0668ec31d1"`);
        await queryRunner.query(`ALTER TABLE "vincent"."expert" DROP CONSTRAINT "FK_8ede57f01e92033f11ca07d4913"`);
        await queryRunner.query(`ALTER TABLE "vincent"."expert" DROP CONSTRAINT "FK_cd6b656b7e770dc8d813938b9d3"`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" DROP CONSTRAINT "FK_dcfe4f6c3d921eac410f21afe74"`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" DROP CONSTRAINT "FK_218248b1d173e88bc1abc976b8e"`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" DROP CONSTRAINT "FK_1f3c2190a7a8185fb02bf1132ce"`);
        await queryRunner.query(`ALTER TABLE "vincent"."project" DROP CONSTRAINT "FK_e155d8f98ec858daa457d6ff291"`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_finance" DROP CONSTRAINT "FK_50cb3de5c135c04311673f0bf5a"`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_finance" DROP CONSTRAINT "FK_30096f04b3bce4b7b8b00239ca3"`);
        await queryRunner.query(`ALTER TABLE "vincent"."operation_finance" DROP CONSTRAINT "FK_296a1954fdb8d153f937546753e"`);
        await queryRunner.query(`ALTER TABLE "vincent"."beneficiaire" DROP CONSTRAINT "FK_417d58ae5786cbfd71950e89e68"`);
        await queryRunner.query(`ALTER TABLE "vincent"."beneficiaire" DROP CONSTRAINT "FK_d144121faedf59dd975c2827c47"`);
        await queryRunner.query(`ALTER TABLE "vincent"."user" DROP CONSTRAINT "FK_7a4f92de626d8dc4b05f06ad181"`);
        await queryRunner.query(`ALTER TABLE "vincent"."user" DROP CONSTRAINT "FK_b489bba7c2e3d5afcd98a445ff8"`);
        await queryRunner.query(`DROP TABLE "vincent"."operation_technique"`);
        await queryRunner.query(`DROP TABLE "vincent"."expert"`);
        await queryRunner.query(`DROP TABLE "vincent"."project"`);
        await queryRunner.query(`DROP TABLE "vincent"."operation_finance"`);
        await queryRunner.query(`DROP TABLE "vincent"."beneficiaire"`);
        await queryRunner.query(`DROP TABLE "vincent"."user"`);
    }

}
