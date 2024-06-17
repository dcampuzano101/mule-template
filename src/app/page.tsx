import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import User from "@/components/User";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center mt-16 w-full md:w-2/3 px-5 md:px-20">
      <Card className="flex justify-center flex-col items-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          MuleRx
        </h1>
        <CardHeader className="text-2xl text-center">
          Celebrate 100 years of MuleRx making lives better!
          <span className="mt-2">Score a limited-edition free t-shirt!</span>
        </CardHeader>

        <Link
          className={`${buttonVariants()}`}
          href="https://dcampuzano-mulesoft.s3.amazonaws.com/sample-invoice.zip"
        >
          Check Inventory
        </Link>
      </Card>

      {/* <Link className={buttonVariants()} href='/admin'>
        Admin Dashboard
      </Link> */}

      {/* <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)} */}
    </main>
  );
}
