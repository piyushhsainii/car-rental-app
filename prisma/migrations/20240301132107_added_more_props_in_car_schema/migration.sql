/*
  Warnings:

  - Added the required column `Drive` to the `CAR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KmsDone` to the `CAR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerShip` to the `CAR` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CAR" ADD COLUMN     "Drive" TEXT NOT NULL,
ADD COLUMN     "KmsDone" TEXT NOT NULL,
ADD COLUMN     "ownerShip" TEXT NOT NULL;
