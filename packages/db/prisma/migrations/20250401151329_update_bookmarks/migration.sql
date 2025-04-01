/*
  Warnings:

  - A unique constraint covering the columns `[userId,linkId]` on the table `Bookmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookmarks_userId_linkId_key" ON "Bookmarks"("userId", "linkId");
