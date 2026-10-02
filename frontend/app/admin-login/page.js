
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                setLoading(false);
                return;
            }

            // Save JWT token
            localStorage.setItem("adminToken", data.token);

            // Save admin information
            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            // Go to admin dashboard
            router.push("/admin");

        } catch (error) {
            console.log("Login error:", error);

            setError(
                "Unable to connect to server"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Heading */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Admin Login
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to manage your food shop
                    </p>

                </div>


                {/* Error */}

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-5">
                        {error}
                    </div>
                )}


                {/* Login Form */}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    {/* Email */}

                    <div>

                        <label className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black"
                            required
                        />

                    </div>


                    {/* Password */}

                    <div>

                        <label className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black"
                            required
                        />

                    </div>


                    {/* Login Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}

