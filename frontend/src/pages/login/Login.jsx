import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center, min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-700">to Chat</span>
        </h1>

        <form>
          <div>
            <div className="py-5">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Username" />
              </label>
            </div>
          </div>
          <div>
            <div className="py-5">
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full h-15"
              />
            </div>
          </div>

          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
