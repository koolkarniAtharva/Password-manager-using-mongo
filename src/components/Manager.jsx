import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", usernName: "", Password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy!"));
  };

  const showPassword = () => {
    if (ref.current.src.includes("/icons/eyecross.png")) {
      ref.current.src = "/icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    const { site, usernName, Password } = form;

    if (!site || !usernName || !Password) {
      toast.error("All fields are required!");
      return;
    }

    if (site.length < 3 || usernName.length < 3 || Password.length < 3) {
      toast.error("Each field must be at least 3 characters!");
      return;
    }

    if (editId) {
      const res = await fetch(`http://localhost:3000/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, usernName, Password }),
      });
      toast.success("Password updated!");
    } else {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, usernName, Password }),
      });
      toast.success("Password saved!");
    }

    setForm({ site: "", usernName: "", Password: "" });
    setEditId(null);
    getpasswords();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const deletePassword = async (id) => {
    await fetch(`http://localhost:3000/${id}`, { method: "DELETE" });
    toast.success("Password deleted!");
    getpasswords();
  };

  const editPassword = (item) => {
    setForm({
      site: item.site,
      usernName: item.usernName,
      Password: item.Password,
    });
    setEditId(item._id);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-cyan-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-600 opacity-40 blur-[100px]"></div>
      </div>

      <h1 className="text-4xl font-bold text-center">
        <span className="text-cyan-500">&lt;</span> Pass{" "}
        <span className="text-cyan-500">OP/&gt;</span>
      </h1>
      <p className="text-cyan-800 text-center font-bold">
        Your own Password Manager
      </p>

      <div className="flex flex-col gap-4 mt-4 w-full max-w-4xl">
        <input
          value={form.site}
          onChange={handleChange}
          type="text"
          placeholder="Enter website URL"
          className="rounded-full border border-cyan-500 text-black p-2 px-4 w-full"
          name="site"
        />
        <div className="flex gap-4">
          <input
            value={form.usernName}
            onChange={handleChange}
            type="text"
            placeholder="Enter Username"
            className="rounded-full border border-cyan-500 text-black p-2 px-4 flex-grow"
            name="usernName"
          />
          <div className="relative">
            <input
              ref={passwordRef}
              value={form.Password}
              onChange={handleChange}
              type="password"
              placeholder="Enter Password"
              className="rounded-full border border-cyan-500 text-black p-2 px-4 w-full"
              name="Password"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={showPassword}
            >
              <img ref={ref} width={30} src="/icons/eye.png" />
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={savePassword}
        className="mt-6 flex items-center gap-2 text-black bg-cyan-500 rounded-full font-bold px-5 py-2 hover:bg-cyan-300 border-2 border-cyan-900"
      >
        <lord-icon
          src="https://cdn.lordicon.com/sbnjyzil.json"
          trigger="hover"
          state="hover-swirl"
          colors="primary:#121331,secondary:#000000"
        ></lord-icon>
        {editId ? "Update Password" : "Save Password"}
      </button>

      <div className="password w-full max-w-5xl mt-6 overflow-x-auto">
        <h2 className="text-2xl font-bold p-4">Your Passwords</h2>
        {passwordArray.length === 0 ? (
          <div className="p-2 mx-3 text-center text-gray-700">
            No Passwords to Show
          </div>
        ) : (
          <table className="w-full table-auto border-collapse border border-cyan-500 rounded-lg overflow-hidden mb-5">
            <thead className="bg-cyan-700 text-white">
              <tr>
                <th className="p-3 border bg-cyan-800 text-center">Site</th>
                <th className="p-3 border bg-cyan-800 text-center">Username</th>
                <th className="p-3 border bg-cyan-800 text-center">Password</th>
                <th className="p-3 border bg-cyan-800 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item) => (
                <tr key={item._id}>
                  <td
                    className="p-3 border bg-cyan-200 text-center hover:bg-cyan-300 cursor-pointer"
                    onClick={() => copyText(item.site)}
                  >
                    {item.site}
                  </td>
                  <td
                    className="p-3 border bg-cyan-200 text-center hover:bg-cyan-300 cursor-pointer"
                    onClick={() => copyText(item.usernName)}
                  >
                    {item.usernName}
                  </td>
                  <td
                    className="p-3 border bg-cyan-200 text-center hover:bg-cyan-300 cursor-pointer"
                    onClick={() => copyText(item.Password)}
                  >
                    {item.Password}
                  </td>
                  <td className="p-3 border bg-cyan-200 text-center hover:bg-cyan-300 cursor-pointer">
                    <span onClick={() => deletePassword(item._id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="morph"
                        state="morph-trash-full-to-empty"
                      ></lord-icon>
                    </span>
                    <span onClick={() => editPassword(item)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/wkvacbiw.json"
                        trigger="hover"
                      ></lord-icon>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
