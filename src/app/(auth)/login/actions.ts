"use server";

import { cookies } from "next/headers";
import { verify } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

import prisma from "@/lib/prisma";
import { lucia } from "../../../../auth";
import { loginSchema, LoginValues } from "@/lib/validation";

export async function login(
  credentials: LoginValues
): Promise<{ error: string }> {
  try {
    const { password, username } = loginSchema.parse(credentials);

    const exsitingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!exsitingUser || !exsitingUser.passwordHash) {
      return { error: "Incorrect username or password" };
    }

    const validPassword = await verify(exsitingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 1,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Incorrect username or password" };
    }

    const session = await lucia.createSession(exsitingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    console.log(error);

    if (isRedirectError(error)) throw error;

    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
