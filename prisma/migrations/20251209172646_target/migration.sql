/*
  Warnings:

  - Added the required column `icon` to the `targets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "targets" ADD COLUMN     "icon" TEXT NOT NULL;
