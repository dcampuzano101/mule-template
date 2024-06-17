'use client';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Inventory {
  id: number;
  count: string;
  description: string;
  productCode: string;
  size: string;
  imageUrl: string;
}

// ...

const Page = () => {
  const [inventoryArray, setInventoryArray] = useState<Inventory[]>([]);

  useEffect(() => {
    const getInventory = async () => {
      try {
        const result = await fetch('http://127.0.0.1:8081/api/inventory', {
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
            // Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });

        if (result) {
          const data = await result.json();
          setInventoryArray(data);
        } else {
          console.log('NO RESULT');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getInventory();
  }, []);

  if (inventoryArray) {
    console.log(inventoryArray);
    return (
      <div className='mt-24'>
        <h2>Inventory</h2>

        <ul>
          {inventoryArray.map((inventory: Inventory) => (
            <div key={inventory.id}>
              <p>{inventory.description}</p>
              <p>{inventory.size}</p>
            </div>
          ))}
        </ul>
      </div>
    );
  }
};

export default Page;
