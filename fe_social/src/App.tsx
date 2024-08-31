import { useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import pix from "./assets/pix.jpg";
import Notify from "./Notify";
const Component = () => {
  const [state, setState] = useState<number>(1);

  const randColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div>
      <div
        className={`
       min-h-[400px] rounded-sm
      `}
        style={{
          // backgroundColor: `${randColor()}`,
          borderRadius: "5px",
          color: "black",
        }}
      >
        <div className="flex flex-col">
          <div className="w-full h-[300px] relative  ">
            <div
              className="w-full h-[300px] absolute opacity-0 hover:opacity-100 transition-all duration-200
              hover:cursor-pointer 
            
            "
            >
              <div className="absolute top-[50%] right-1 bg-[rgba(255,255,255,0.8)] p-3 rounded-[50%]  hover:bg-white hover:scale-[1.05] hover:cursor-pointer transition-all duration-300">
                <FaGreaterThan />
              </div>

              <div className="absolute top-[50%] left-1 bg-[rgba(255,255,255,0.8)] p-3 rounded-[50%] rotate-180 hover:bg-white hover:scale-[1.05] hover:cursor-pointer transition-all duration-300 ">
                <FaGreaterThan />
              </div>
            </div>

            <img
              src={pix}
              className="w-full h-[300px] object-cover rounded-[15px] "
            />
          </div>

          <div className="flex justify-between mt-2 ">
            <h2 className="font-bold capitalize text-[17px] ">name</h2>
            <p className="text-gray-500">3 Friends</p>
          </div>

          <span>Profile</span>

          <div className="w-full">
            <button className="mt-4 py-3 px-4 text-[15px] text-white bg-purple-600 rounded-sm ">
              Add Friend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <div className="fixed ml-4 z-10 ">
        <Notify />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-4 ">
        <Component />

        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </div>
    </div>
  );
};

export default App;
