-- DropForeignKey
ALTER TABLE `d_todo` DROP FOREIGN KEY `d_todo_userId_fkey`;

-- AddForeignKey
ALTER TABLE `d_todo` ADD CONSTRAINT `d_todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `auth_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
