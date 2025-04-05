"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import productImage from "@/public/product.jpg";
import { useSelector } from 'react-redux';

interface RootState {
  user: {
    currentUser: {
      email: string
      loginTime?: string
    } | null
    isAuthenticated: boolean
  }
}

interface RegisteredUser {
  email: string
  registeredAt: string
}

export default function ProductPage() {
  const pricePerSquareMeter = 114.03;
  const baseWidth = 100;
  const baseHeight = 100;
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(50);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const data = await res.json();
          setRegisteredUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const area = (width * height) / 10000;
  const totalPrice = (area * pricePerSquareMeter).toFixed(2);
  const wasteArea = ((baseWidth * baseHeight) / 10000 - area).toFixed(3);
  const productWeight = (area * 59).toFixed(2); // Example weight calculation

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* User Info */}
      {user && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Welcome, {user.email}</h2>
          {user.loginTime && (
            <p className="text-sm text-gray-500">
              Login time: {new Date(user.loginTime).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* Registered Users List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Registered Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registeredUsers.map((user) => (
                <tr key={user.email}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.registeredAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculator Content */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1 flex justify-center">
          <div
            className="border p-4 flex justify-center w-96 items-center bg-white shadow-md"
          >
            <div
              style={{
                position: 'relative',
                width: `${width * 2}px`,
                height: `${height * 2}px`,
              }}
            >
              <Image
                src={productImage}
                alt="Product"
                fill
                style={{
                  objectFit: "cover",
                  border: '1px solid #ccc'
                }}
              />
            </div>
          </div>
        </div>

        {/* Product Details & Inputs */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">INOX AISI 304 LAMIERA SPESSORE 1,5 MM</h1>
          <p className="text-xl font-semibold text-gray-700">€114,03 Prezzo al m²</p>
          <p className="text-gray-600">Foglio lamiera cm 100×100</p>
          <p className="mt-1 text-gray-500">Se hai bisogno di dimensioni superiori <strong>Contattaci</strong></p>

          {/* Input Box */}
          <div className="border p-4 rounded-lg shadow-md bg-gray-50 mt-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Height Input */}
              <div>
                <label className="block text-sm font-medium">Altezza (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="border p-2 w-full rounded"
                  min="1"
                  max={baseHeight}
                />
              </div>

              {/* Width Input */}
              <div>
                <label className="block text-sm font-medium">Larghezza (cm)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="border p-2 w-full rounded"
                  min="1"
                  max={baseWidth}
                />
              </div>
            </div>

            {/* Calculated Details */}
            <div className="mt-4 text-sm text-gray-700">
              <div className="flex justify-between py-1">
                <span className="font-semibold">Totale Area (m²)</span>
                <span>{area}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold">Totale scarto (m²)</span>
                <span>{wasteArea}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-lg">
                <span>Prezzo prodotto</span>
                <span>€{totalPrice}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold">Peso prodotto (Kg)</span>
                <span>{productWeight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
