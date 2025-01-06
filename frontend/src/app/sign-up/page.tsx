"use client";

import { useState } from "react";
import Link from "next/link";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      email: e.currentTarget.email.value.trim(),
      name: e.currentTarget.name.valueOf,
      password: e.currentTarget.password.value,
    };

    // Client-side validation
    if (!formData.email || !formData.name || formData.password.length < 6) {
      setError("All fields are required, and password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setError(null);
        window.location.href = "/welcome";
      } else {
        setError("Failed to create an account. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-center text-3xl font-semibold text-gray-800">Sign Up for an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              aria-invalid={!!error}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              aria-invalid={!!error}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              aria-invalid={!!error}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <div className="mt-5 space-y-4">
            <Link href="/sign-in" className="text-blue-500 block text-center hover:text-blue-700">
              Already registered? Sign In
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
