'use client'
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { setUser } from '../store';
import Link from "next/link"; 
import AuthLayout from "../authLayout";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password: string) => {
        return password.length >= 6; // Example: minimum 6 characters
    };

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(password)) {
            setMessage("Password must be at least 6 characters long.");
            return;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            // Store user in Redux
            dispatch(setUser({
                email: data.user.email,
                loginTime: new Date().toISOString()
            }));

            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => router.push("/login"), 2000);
        } else {
            setMessage(data.error || 'Registration failed');
        }
    };

    return (
        <AuthLayout>
            <h2 className="text-3xl font-bold text-center text-gray-900">Register</h2>
            <form onSubmit={handleRegister} className="mt-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
                >
                    Register
                </button>
                {message && (
                    <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {message}
                    </p>
                )}
                <p className="mt-4 text-center">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </form>
        </AuthLayout>
    );
}
