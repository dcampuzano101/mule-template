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
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import Tiptap from '@/components/Tiptap';

const MenuSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  menu: z.string(),
});

const CreateMenu = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof MenuSchema>>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      title: '',
      menu: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof MenuSchema>) => {
    console.log(values);

    const res = await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
        description: 'Menu Successfully Created',
        variant: 'default',
      });
    }
  };

  return (
    <main className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${new Date().toLocaleDateString()}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mt-10'>
            <FormField
              control={form.control}
              name='menu'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu</FormLabel>
                  <FormControl>
                    <Tiptap menu={field.name} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className='w-full mt-6' type='submit'>
            Create Menu
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default CreateMenu;
