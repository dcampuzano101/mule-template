'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const FormSchema = z.object({
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'First Name is required'),
  email: z.string().min(1, 'Email is required'),
});

interface Inventory {
  id: number;
  count: string;
  description: string;
  productCode: string;
  size: string;
  imageUrl: string;
}

interface OrderFormProps {
  inventory: {
    id: number;
    count: string;
    description: string;
    productCode: string;
    size: string;
    imageUrl: string;
  };
}

const OrderForm: React.FC<OrderFormProps> = (inventory) => {
  //   console.log(inventory);
  const { id, count, description, productCode, size, imageUrl } =
    inventory.inventory;
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      client_id: '',
      client_secret: '',
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { id, count, description, productCode, size, imageUrl } =
      inventory.inventory;
    // console.log(values);
    // console.log(inventory);
    // console.log(`inventory.id: ${inventory.inventory.id}`);
    // console.log(`inventory.productCode: ${inventory.inventory.productCode}`);
    const res = await fetch(
      'http://inventory-demo-davidcampuzano.us-e2.cloudhub.io/api/orders',
      {
        method: 'POST',
        body: JSON.stringify({
          productId: id,
          productCode,
          size,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        }),
        headers: {
          'Content-Type': 'application/json',
          client_id: '367cd6b6e0e34c048e8f050e75813850',
          client_secret: '2BF177d2c3d347A58e6e74c841dc2C67',
        } as HeadersInit,
      }
    );

    if (!res?.ok) {
      toast({
        title: 'Error',
        description: 'Oops! Something went wrong.',
        variant: 'destructive',
      });
    } else {
      router.refresh();
      toast({
        title: 'Success',
        description: 'Order Successfully Created',
        variant: 'default',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='text-left space-y-5'>
          {/* <FormField
            control={form.control}
            
            name='client_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>client_id</FormLabel>
                <FormControl>
                  <Input placeholder='username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='client_secret'
            render={({ field }) => (
              <FormItem>
                <FormLabel>client_secret</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your client_secret' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-'>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your First Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your Last Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='email@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Order
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
