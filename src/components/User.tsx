'use client';
import { useSession } from 'next-auth/react';

const User = () => {
  const { data: session, status } = useSession();

  return <pre>{JSON.stringify(session)}</pre>;
};
export default User;
