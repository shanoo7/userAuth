import { useState } from 'react';
import {Link, Outlet } from 'react-router-dom';
import { CgWebsite } from "react-icons/cg";
import { 
  HiHome,
  HiChevronLeft,
  HiChevronRight
} from "react-icons/hi";



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const menuItems = [
    { icon: HiHome, text:<Link to={"/homePage"}>Homepage</Link> },
    { icon: CgWebsite, text:<Link to={"/portfolio"}>Portfolio</Link> },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div 
        className={`bg-gray-100 dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out
          ${isOpen || hover ? 'w-64' : 'w-20'} 
          fixed h-full z-2`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Logo Section */}
          <div className={`flex mt-[60px] items-center ${isOpen || hover ? 'justify-start' : 'justify-center'}`}>
            <span className={`text-xl font-bold ${isOpen || hover ? 'ml-2' : ''}`}>
              {isOpen || hover ? 'LOGO' : 'L'}
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-6 space-y-1 flex-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                href="#"
                className={`flex items-center px-3 py-3 rounded-lg 
                  transition-colors duration-200
                  hover:bg-blue-50 dark:hover:bg-gray-700
                  ${isOpen || hover ? 'justify-start' : 'justify-center'}`}
              >
                <item.icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span 
                  className={`ml-3 text-sm font-medium text-gray-700 dark:text-gray-200
                    ${isOpen || hover ? 'opacity-100' : 'opacity-0 w-0'} 
                    transition-opacity duration-300`}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </nav>

          {/* Toggle Button */}
          <div className="mt-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isOpen ? (
                <HiChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <HiChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Main Content Area */}
      <div 
        className={`flex-1 bg-gray-50 dark:bg-gray-500 pt-0 pl-0 mt-16  transition-margin duration-300 ease-in-out
          ${isOpen || hover ? 'ml-64' : 'ml-20'}`}
      >
      
         <Outlet/>
          
        
      </div>
    </div>
  );
};

export default Sidebar;
