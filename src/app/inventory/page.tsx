import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import OrderForm from "@/components/form/OrderForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Inventory {
  id: number;
  count: string;
  description: string;
  productCode: string;
  size: string;
  imageUrl: string;
}

const page = async () => {
  //   const session = await getServerSession(authOptions);

  const getInventory = async () => {
    try {
      const result = await fetch(
        "https://dcampuzano-mulesoft.s3.amazonaws.com/sample-invoice.pdf",
        {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/pdf",
            // Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      if (result) {
        const data = await result.json();
        // console.log(data);
        return data;
      } else {
        console.log("NO RESULT");
      }
    } catch (error) {
      console.log(error);
    }
  };
  function capitalizeFirstLetter(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function capitalizeSentences(str: String) {
    return str
      .split(/\.|\?|\!/)
      .map(capitalizeFirstLetter)
      .join(". ");
  }

  const inventoryArray = await getInventory();

  if (inventoryArray) {
    // console.log(inventoryArray);
    return (
      <div className="mt-8 w-5/6">
        <h1 className="text-center mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
          Pick Up Some Swag!
        </h1>

        <div className="md:grid md:grid-cols-2 gap-5 flex flex-wrap flex-row">
          {inventoryArray.map((inventory: Inventory) => (
            <Card
              key={inventory.id}
              className="rounded border-2 border-black p-5 flex justify-center flex-wrap flex-col items-center"
            >
              <CardHeader>
                <CardTitle>
                  {capitalizeSentences(inventory.productCode)}
                </CardTitle>
                <CardDescription>
                  Description: {capitalizeSentences(inventory.description)}...
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <Image
                  src={`${inventory.imageUrl}`}
                  alt="MuleSoft Logo"
                  width={350}
                  height={350}
                  className="rounded border border-mulesoft"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger>
                    <Button>Order Now</Button>
                  </DialogTrigger>
                  <DialogContent className="p-6">
                    <DialogHeader>
                      <DialogTitle className="mb-5">
                        {capitalizeSentences(inventory.productCode)}
                      </DialogTitle>
                      <DialogDescription className="">
                        <OrderForm inventory={inventory} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
};

export default page;
