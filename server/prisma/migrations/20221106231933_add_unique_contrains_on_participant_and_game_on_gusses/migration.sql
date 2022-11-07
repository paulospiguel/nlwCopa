/*
  Warnings:

  - A unique constraint covering the columns `[gameId]` on the table `GameResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gameId,participantId]` on the table `Guess` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN "gameResultId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GameResult_gameId_key" ON "GameResult"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Guess_gameId_participantId_key" ON "Guess"("gameId", "participantId");
