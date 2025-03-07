/*
  Warnings:

  - You are about to drop the column `rater_id` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ratee_id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_rater_id_fkey";

-- DropIndex
DROP INDEX "Rating_rater_id_ratee_id_key";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "rater_id";

-- CreateIndex
CREATE UNIQUE INDEX "Rating_ratee_id_key" ON "Rating"("ratee_id");
