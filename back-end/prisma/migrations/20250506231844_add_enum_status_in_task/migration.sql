/*
  Warnings:

  - You are about to drop the column `done` on the `tasks` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'DONE');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "done",
ADD COLUMN     "status" "TaskStatus" DEFAULT 'PENDING';
