import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { authenticate } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/polls/:id/games",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getPollParams = z.object({
        id: z.string(),
      });

      const { id } = getPollParams.parse(request.params);

      const games = await prisma.game.findMany({
        orderBy: {
          date: "desc",
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                pollId: id,
              },
            },
            include: {
              guessWinner: {
                select: {
                  id: true,
                  _count: true,
                },
              },
            },
          },
          gameResult: {
            select: {
              gameId: true,
              firstTeamPoints: true,
              secondTeamPoints: true,
            },
          },
        },
      });

      return {
        games: games.map((game) => ({
          ...game,
          canToGuess: game.date < new Date(),
          hasGuessWinner: game.guesses.some(
            (guess) => !!guess.guessWinner?._count
          ),
          guess: !!game.guesses.length ? game.guesses[0] : null,
          guesses: undefined,
        })),
      };
    }
  );

  fastify.post(
    "/games/:id/results",
    {
      onRequest: [authenticate],
    },
    async (request, response) => {
      if (request.user.role !== "admin") {
        return response.status(404).send({
          message: "You're not allowed to access this feature",
        });
      }

      const getGameParams = z.object({
        id: z.string(),
      });

      const createResultGameBody = z.object({
        firstTeamPoints: z.number(),
        secondTeamPoints: z.number(),
      });

      const { id } = getGameParams.parse(request.params);

      const { firstTeamPoints, secondTeamPoints } = createResultGameBody.parse(
        request.body
      );

      return {
        gameId: id,
        firstTeamPoints,
        secondTeamPoints,
      };
    }
  );
}
