import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@auth/database";
import { NodemailerProvider } from "@auth/email";

const emailProvider = new NodemailerProvider();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword(data) {
        await emailProvider.sendMail({
            to: data.user.email,
            subject: "Reset your password",
            body: `Click here: ${data.url}`
        });
    },
  },
  trustedOrigins: ["http://localhost:3000"], 
});