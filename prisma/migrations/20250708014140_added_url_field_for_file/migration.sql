/*
  Warnings:

  - Added the required column `fileUrl` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileUrl" VARCHAR(255) NOT NULL;
