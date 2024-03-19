/*
  Warnings:

  - Changed the type of `Seat` on the `CAR` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `KmsDone` on the `CAR` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ownerShip` on the `CAR` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CAR" DROP COLUMN "Seat",
ADD COLUMN     "Seat" INTEGER NOT NULL,
DROP COLUMN "KmsDone",
ADD COLUMN     "KmsDone" INTEGER NOT NULL,
DROP COLUMN "ownerShip",
ADD COLUMN     "ownerShip" INTEGER NOT NULL;
