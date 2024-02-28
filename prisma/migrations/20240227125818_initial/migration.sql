-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CAR" (
    "id" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "Img" TEXT[],
    "brand" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "Fuel" TEXT NOT NULL,
    "Seat" TEXT NOT NULL,
    "Mileage" INTEGER NOT NULL,
    "Availability" BOOLEAN NOT NULL,
    "model" TEXT NOT NULL,
    "Plate" INTEGER NOT NULL,
    "Year" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "Transmission" TEXT NOT NULL,
    "Color" TEXT NOT NULL,

    CONSTRAINT "CAR_pkey" PRIMARY KEY ("id")
);
