import NextAuth from 'next-auth';

declare module 'next-auth' {
  // consider removing name, email, image, etc. from User
  interface User {
    username: string;
    role: string;
  }
  interface Session {
    user: User & {
      username: string;
      role: string;
    };
    token: {
      username: string;
      role: string;
    };
  }
}
