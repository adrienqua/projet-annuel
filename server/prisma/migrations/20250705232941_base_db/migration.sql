-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "website" VARCHAR(255),

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComponentType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "reference" VARCHAR(100),

    CONSTRAINT "ComponentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Component" (
    "id" SERIAL NOT NULL,
    "img_url" VARCHAR(500),
    "release_date" DATE,
    "specs" JSONB NOT NULL,
    "oc_profiles" JSONB NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "type_id" INTEGER NOT NULL,
    "manufacturer_id" INTEGER NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compatibility" (
    "component_a_id" INTEGER NOT NULL,
    "component_b_id" INTEGER NOT NULL,
    "compatible" BOOLEAN NOT NULL,

    CONSTRAINT "Compatibility_pkey" PRIMARY KEY ("component_a_id","component_b_id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "website" VARCHAR(255),

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorComponent" (
    "id" SERIAL NOT NULL,
    "in_stock" BOOLEAN NOT NULL,
    "last_checked" TIMESTAMP(3) NOT NULL,
    "product_url" VARCHAR(500) NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,

    CONSTRAINT "VendorComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" SERIAL NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "vendor_component_id" INTEGER NOT NULL,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Build" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_each" DECIMAL(10,2) NOT NULL,
    "build_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,

    CONSTRAINT "BuildItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ComponentType_slug_key" ON "ComponentType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ComponentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compatibility" ADD CONSTRAINT "Compatibility_component_a_id_fkey" FOREIGN KEY ("component_a_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compatibility" ADD CONSTRAINT "Compatibility_component_b_id_fkey" FOREIGN KEY ("component_b_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorComponent" ADD CONSTRAINT "VendorComponent_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorComponent" ADD CONSTRAINT "VendorComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_vendor_component_id_fkey" FOREIGN KEY ("vendor_component_id") REFERENCES "VendorComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildItem" ADD CONSTRAINT "BuildItem_build_id_fkey" FOREIGN KEY ("build_id") REFERENCES "Build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildItem" ADD CONSTRAINT "BuildItem_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
