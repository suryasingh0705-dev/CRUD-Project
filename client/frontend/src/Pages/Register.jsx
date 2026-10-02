import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import api from "../api/api.jsx";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegisterSubmit = async (data) => {
    const response = await api.post("/auth/register", data);
    reset();
    sessionStorage.setItem("justRegistered", "true");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-bold text-zinc-950">
              C
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Get started by creating your account
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8">
            <form
              onSubmit={handleSubmit(handleRegisterSubmit)}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-zinc-200"
                >
                  Name
                </label>

                <input
                  {...register("name", {
                    required: "name is required",
                  })}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-2 focus:ring-white/10"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-200"
                >
                  Email
                </label>

                <input
                  {...register("email", {
                    required: "email is required",
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-2 focus:ring-white/10"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-zinc-200"
                >
                  Password
                </label>

                <input
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-2 focus:ring-white/10"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.98]"
              >
                Create account
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-white transition hover:underline"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            Your data is securely protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
