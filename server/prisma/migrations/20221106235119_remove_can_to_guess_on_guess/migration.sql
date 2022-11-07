/*
  Warnings:

  - You are about to drop the column `canToGuess` on the `Guess` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstTeamPoints" INTEGER NOT NULL,
    "secondTeamPoints" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "guessWinnerId" TEXT,
    CONSTRAINT "Guess_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_guessWinnerId_fkey" FOREIGN KEY ("guessWinnerId") REFERENCES "GuessWinner" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Guess" ("createdAt", "firstTeamPoints", "gameId", "guessWinnerId", "id", "participantId", "secondTeamPoints") SELECT "createdAt", "firstTeamPoints", "gameId", "guessWinnerId", "id", "participantId", "secondTeamPoints" FROM "Guess";
DROP TABLE "Guess";
ALTER TABLE "new_Guess" RENAME TO "Guess";
CREATE UNIQUE INDEX "Guess_gameId_participantId_key" ON "Guess"("gameId", "participantId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
