import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import api from "../api/api.jsx";
import { MyStore } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const {setAccessToken, setUser} = useContext(MyStore);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLoginSubmit = async (data) => {
    const response = await api.post("/auth/login", data);

    const accessToken = response.data.data.accessToken;

    const userResponse = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setAccessToken(accessToken);
    setUser(userResponse.data.data.user);

    reset();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-bold text-zinc-950">
              C
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Sign in to continue to your account
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8">
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-200"
                >
                  Email
                </label>

                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
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
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs text-zinc-400 transition hover:text-white"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="Enter your password"
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
                Sign in
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-medium text-white transition hover:underline"
              >
                Create account
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

export default Login;
