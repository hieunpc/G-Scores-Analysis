import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentsTable1769825852313 implements MigrationInterface {
    name = 'CreateStudentsTable1769825852313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("sbd" character varying(8) NOT NULL, "toan" numeric(4,2), "ngu_van" numeric(4,2), "ngoai_ngu" numeric(4,2), "vat_li" numeric(4,2), "hoa_hoc" numeric(4,2), "sinh_hoc" numeric(4,2), "lich_su" numeric(4,2), "dia_li" numeric(4,2), "gdcd" numeric(4,2), "ma_ngoai_ngu" character varying(2), CONSTRAINT "PK_8635bf586dd431a1c462e26eb37" PRIMARY KEY ("sbd"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
