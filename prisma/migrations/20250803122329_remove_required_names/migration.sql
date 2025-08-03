/*
  Warnings:

  - You are about to drop the column `firstname` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "firstname",
DROP COLUMN "lastname";
