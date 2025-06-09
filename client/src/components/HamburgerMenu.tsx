import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const lineVariants = {
    open: {
      rotate: 45,
      y: [0, 8, 8],
      transition: { duration: 0.2 }
    },
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  const line2Variants = {
    open: {
      opacity: 0,
      transition: { duration: 0.2 }
    },
    closed: {
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  const line3Variants = {
    open: {
      rotate: -45,
      y: [-0, -8, -8],
      transition: { duration: 0.2 }
    },
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 focus:outline-none"
      >
        <motion.div
          variants={lineVariants}
          animate={isOpen ? "open" : "closed"}
          className="w-6 h-0.5 bg-purple-500 mb-1.5"
        />
        <motion.div
          variants={line2Variants}
          animate={isOpen ? "open" : "closed"}
          className="w-6 h-0.5 bg-purple-500 mb-1.5"
        />
        <motion.div
          variants={line3Variants}
          animate={isOpen ? "open" : "closed"}
          className="w-6 h-0.5 bg-purple-500"
        />
      </button>

      <motion.div
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
      >
        <div className="py-1">
          <button
            onClick={() => {
              navigate('/admin');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 hover:text-purple-500"
          >
            Administrador
          </button>
          <button
            onClick={() => {
              navigate('/cliente');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 hover:text-purple-500"
          >
            Cliente
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HamburgerMenu; 