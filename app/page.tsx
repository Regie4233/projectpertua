'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser, getCurrentUser } from '@/lib/pocketbase';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            await authenticateUser(email, password);
            const currentUser = await getCurrentUser();
            if (currentUser) {
                router.push('/home');
            } else {
                setError('Invalid credentials');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#D2E5FF]">
            <div className="bg-[#E8F1FF] rounded-lg p-8 w-96 shadow-md">
                <h2 className="text-[#484848] text-center mb-5 text-2xl font-semibold">Login</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error:</strong> {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-[#484848] text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-[#484848] text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="mr-2"
                        />
                        <label htmlFor="remember" className="text-[#484848] text-sm">
                            Remember Password
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-5 text-center">
                    <a href="#" className="text-[#484848] text-sm hover:underline hover:text-blue-500">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;