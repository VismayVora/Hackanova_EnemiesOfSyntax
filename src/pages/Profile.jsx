import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ data, setPackages }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const deletePackage = () => {
    var config = {
      method: "delete",
      url:
        "http://vismayvora.pythonanywhere.com/tourist_app/tourpackage" +
        "/" +
        data.id +
        "/",
      headers: {
        Authorization: "Token " + user.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast.success("Package Deleted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getPackages();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getPackages = () => {
    var config = {
      method: "get",
      url: "http://vismayvora.pythonanywhere.com/tourist_app/tourpackage",
      headers: {
        Authorization: "Token " + user.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setPackages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div key={data.id} className="w-full rounded-xl shadow-lg border">
      <img className="rounded-t-xl h-[35vh] w-full" src={data.image} alt="" />
      <div className="px-4 py-6">
        <h1 className="text-gray-600 text-xl font-bold mb-2">
          {data.package_name}
        </h1>
        <h1 className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <HiOutlineLocationMarker className="text-lg" /> {data.location.name}
        </h1>
        <div className="border-t border-b p-3 flex justify-between items-center">
          <h1 className="text-gray-400">Price:</h1>
          <h1 className="text-gray-600 text-2xl font-bold">₹ {data.price}</h1>
        </div>
        <h1 className="text-sm text-gray-600 py-4">{data.description}</h1>
        <button
          onClick={() => deletePackage()}
          className="flex items-center gap-2 text-white font-semibold uppercase rounded-full px-6 py-2 bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    name: "",
    price: "",
    description: "",
    location: "",
    image: "",
  });
  const [addPackage, setAddPackage] = useState(false);
  const [edit, setEdit] = useState(false);
  const [packages, setPackages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    getProfile();
    getPackages();
  }, []);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const paymentHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    const options = {
      key: 'rzp_test_P5uGKApOVIZYNS',
      amount: parseInt(packageData.price) * 10,
      name: "Payments",
      description: "Donate yourself some time",
      handler: (response) => {
        addPackageHandler()
      },
      prefill: {
        name: "Shashank Shekhar",
        email: "example@email.com",
      },
      notes: {
        address: "Patna,India",
      },
      theme: {
        color: "#3b82f6",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const getProfile = () => {
    var config = {
      method: "get",
      url: "http://vismayvora.pythonanywhere.com/account/profile",
      headers: {
        Authorization: "Token " + user.token,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        setProfile(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getPackages = () => {
    var config = {
      method: "get",
      url: "http://vismayvora.pythonanywhere.com/tourist_app/tourpackage",
      headers: {
        Authorization: "Token " + user.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setPackages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addPackageHandler = () => {
    console.log(packageData);
    if (
      packageData.name &&
      packageData.price &&
      packageData.description &&
      packageData.location &&
      packageData.image
    ) {
      var data = new FormData();
      data.append("price", packageData.price);
      data.append("package_name", packageData.name);
      data.append("description", packageData.description);
      data.append("image", packageData.image);
      data.append("location", packageData.location);
      var config = {
        method: "post",
        url: "http://vismayvora.pythonanywhere.com/tourist_app/tourpackage",
        headers: {
          Authorization: "Token " + user.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setAddPackage(false);
          toast.success("Package Added Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          getPackages();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const editHandler = () => {
    var config = {
      method: "patch",
      url: "http://vismayvora.pythonanywhere.com/account/profile/",
      headers: {
        Authorization: "Token " + user.token,
      },
      data: profile,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setEdit(false);
      })
      .catch(function (error) {
        console.log(error);
        setEdit(false);
      });
  };
  return (
    <div className="w-full">
      <Navbar />
      <ToastContainer />
      <div className="px-36 py-8 bg-gradient-to-r from-cyan-400 to-blue-800">
        <h1 className="text-2xl text-gray-600 font-bold">Profile</h1>
        <div className="flex justify-between bg-white rounded-lg shadow-lg p-6 mt-4">
          <div className="">
            <h1 className="text-xl font-bold">{profile?.name}</h1>
            <h1 className="text-gray-400">Email: {profile?.email}</h1>
            <h1 className="text-gray-400">Phone: {profile?.phone_no}</h1>
            {profile?.website_link && (
              <a
                className="text-blue-400"
                href={profile?.website_link}
                target="_blank"
              >
                View Website
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEdit(true)}
              className="text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600"
            >
              Edit Profile
            </button>
            <button
              onClick={() => logout()}
              className="bg-red-500 text-white px-4 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="px-36 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-gray-600 font-bold">Your Packages</h1>
          <button
            onClick={() => setAddPackage(true)}
            className="bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-full"
          >
            + Add Package
          </button>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-6">
          {packages.length > 0 &&
            packages.map((item) => (
              <Card data={item} setPackages={setPackages} />
            ))}
        </div>
      </div>
      <Modal
        isOpen={addPackage}
        onRequestClose={() => setAddPackage(false)}
        className="w-screen h-screen flex items-center justify-center"
      >
        <div className="w-1/2 px-8 py-8 bg-white rounded border flex flex-col">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl text-gray-600 font-semibold">
              Add Package
            </h1>
            <div onClick={() => setAddPackage(false)} className="cursor-pointer">
              <h1 className="text-xl">x</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Name</h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="Treking in Nepal"
                value={packageData.name}
                onChange={(e) =>
                  setPackageData({ ...packageData, name: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Price</h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="1000"
                value={packageData.price}
                onChange={(e) =>
                  setPackageData({ ...packageData, price: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">
                Enter Location
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="Nepal"
                value={packageData.location}
                onChange={(e) =>
                  setPackageData({ ...packageData, location: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Image</h1>
              <input
                type="file"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                onChange={(e) =>
                  setPackageData({ ...packageData, image: e.target.files[0] })
                }
              />
            </div>
            <div className="col-span-2">
              <h1 className="text-gray-800 font-semibold mb-3">
                Enter Description
              </h1>
              <textarea
                rows={4}
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder=""
                value={packageData.description}
                onChange={(e) =>
                  setPackageData({
                    ...packageData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button
              onClick={() => paymentHandler()}
              className="col-span-2 focus:outline-none px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={edit}
        onRequestClose={() => setEdit(false)}
        className="w-screen h-screen flex items-center justify-center"
      >
        <div className="w-1/2 px-8 py-8 bg-white rounded border flex flex-col">
          <h1 className="text-3xl text-gray-600 font-semibold">Edit Profile</h1>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Name</h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="Mihir Shinde"
                value={profile?.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Email</h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="abc@gmail.com"
                value={profile?.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">
                Enter Phone Number
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="1234567890"
                value={profile?.phone_no}
                onChange={(e) =>
                  setProfile({ ...profile, phone_no: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">
                Enter Website Link
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="1234567890"
                value={profile?.website_link}
                onChange={(e) =>
                  setProfile({ ...profile, website_link: e.target.value })
                }
              />
            </div>
            <button
              onClick={() => editHandler()}
              className="col-span-2 focus:outline-none px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
