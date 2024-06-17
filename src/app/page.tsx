import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center mt-16 w-full md:w-2/3 px-5 md:px-20">
      <Card className="flex justify-center flex-col items-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          MuleSoft & RPA
        </h1>
        <CardHeader className="text-2xl text-center">
          Download the sample invoice
          <span className="mt-2">click below</span>
        </CardHeader>

        <Link
          className={`${buttonVariants()}`}
          href="https://dcampuzano-mulesoft.s3.amazonaws.com/USC+EMHA+GERO+GIST+MCM+MMLIS+MPA+FA1+20+9-25-20.csv"
        >
          Download
        </Link>
      </Card>
    </main>
  );
}
