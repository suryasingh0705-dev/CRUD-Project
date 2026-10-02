import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { setEditingProduct, logout } = useContext(MyStore);

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          CRUD Application
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              navigate("/create");
            }}
            className="rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition duration-200 hover:bg-white hover:shadow-md active:scale-95 sm:px-5"
          >
            Create
          </button>
          <button
            onClick={logout}
            type="button"
            className="rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition duration-200 hover:bg-white hover:shadow-md active:scale-95 sm:px-5"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
