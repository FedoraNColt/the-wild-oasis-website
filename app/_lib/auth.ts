import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (!user?.email || !user?.name) return false;

        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const email = session.user?.email;
      if (!email) return session;

      const guest = await getGuest(email);

      if (session.user) {
        session.user.id = String(guest?.id);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
