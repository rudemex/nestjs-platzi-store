import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserCustomer1625782392623 implements MigrationInterface {
    name = 'createUserCustomer1625782392623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `customerId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_6c687a8fa35b0ae35ce766b56c` (`customerId`)");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `user` ADD `role` varchar(100) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_6c687a8fa35b0ae35ce766b56c` ON `user` (`customerId`)");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_6c687a8fa35b0ae35ce766b56ce` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_6c687a8fa35b0ae35ce766b56ce`");
        await queryRunner.query("DROP INDEX `REL_6c687a8fa35b0ae35ce766b56c` ON `user`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `user` ADD `role` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_6c687a8fa35b0ae35ce766b56c`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `customerId`");
    }

}
