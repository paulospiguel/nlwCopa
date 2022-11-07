import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/users", async (request) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(request.body);

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        providerUserId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          providerUserId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      });
    }

    const token = fastify.jwt.sign(
      {
        name: user.name,
        avatarUrl: userInfo.picture,
      },
      {
        sub: user.id,
        expiresIn: "1 day",
      }
    );

    return { token };
  });

  fastify.get(
    "/me",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      return { user: request.user };
    }
  );
}
