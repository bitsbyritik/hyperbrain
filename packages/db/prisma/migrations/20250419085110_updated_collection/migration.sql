/*
  Warnings:

  - You are about to drop the column `description` on the `Collections` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Collections` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Collections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug,userId]` on the table `Collections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collections" DROP CONSTRAINT "Collections_ownerId_fkey";

-- AlterTable
ALTER TABLE "Collections" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "ownerId",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collections_slug_userId_key" ON "Collections"("slug", "userId");

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
