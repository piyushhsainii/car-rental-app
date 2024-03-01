/*
  Warnings:

  - Changed the type of `Availability` on the `CAR` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('Available', 'Reserved', 'Sold');

-- AlterTable
ALTER TABLE "CAR" DROP COLUMN "Availability",
ADD COLUMN     "Availability" "Availability" NOT NULL;
