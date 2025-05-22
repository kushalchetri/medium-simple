/*
  Warnings:

  - A unique constraint covering the columns `[id,authorId]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blog_id_authorId_key" ON "Blog"("id", "authorId");
