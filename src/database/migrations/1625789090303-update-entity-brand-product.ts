import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntityBrandProduct1625789090303 implements MigrationInterface {
    name = 'updateEntityBrandProduct1625789090303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` ADD `brandId` int NULL");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_bb7d3d9dc1fae40293795ae39d6` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_bb7d3d9dc1fae40293795ae39d6`");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `brandId`");
    }

}
