import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [siteOptions, setSiteOptions] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserAuthentication = (data) => {
    const apiUrl = `http://evantage.ddns.net/react_web/authenticate_login.php?login_id=${encodeURIComponent(
      data.loginId
    )}&password=${encodeURIComponent(
      data.password
    )}&site_cd=${encodeURIComponent(data.category)}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((authenticationResult) => {
        if (authenticationResult.status === "SUCCESS") {
          localStorage.setItem(
            "authenticated",
            JSON.stringify(authenticationResult.data)
          );
          navigate("/dashboard", {replace:true});
        } else {
          toast.error("Invalid username or password");
        }
      })
      .catch((error) => console.error("Error during authentication:", error));
  };

  useEffect(() => {
    fetch("http://evantage.ddns.net/react_web/get_sitecode.php")
      .then((response) => response.json())
      .then((data) => {
        setSiteOptions(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      ;
      <form
        className=" container mx-auto mt-8 space-y-6"
        onSubmit={handleSubmit(handleUserAuthentication)}
      >
        <div className="-space-y-px w-3/6 mx-auto">
          <div className="mb-5">
            <input
              {...register("loginId", { required: true })}
              type="text"
              name="loginId"
              placeholder="Enter your Login Id"
              className="rounded-md appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            />

            {errors.loginId && (
              <p className="text-red-700 mt-3 text-left">
                This field is required
              </p>
            )}
          </div>

          <div className="mb-5">
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              placeholder="Enter your Password"
              className=" rounded-md appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-700 mt-3 text-left">
                This field is required
              </p>
            )}
          </div>

          <div className="mb-5">
            <select
              {...register("category")}
              className="mt-5 rounded-md appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            >
              <option value="">Choose Site</option>
              {siteOptions.map((option, index) => (
                <option key={index} value={option.site_cd}>
                  {option.site_name}
                </option>
              ))}
            </select>
          </div>

          <div className="block mx-auto">
            <button className="group relative w-full flex justify-center text-md py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
