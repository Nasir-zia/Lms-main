import { Menu, X } from "lucide-react";
import { useState } from "react";

const signup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            LMS
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#" className="hover:text-blue-600">
              Courses
            </a>
            <a href="#" className="hover:text-blue-600">
              Instructors
            </a>
            <a href="#" className="hover:text-blue-600">
              About
            </a>
            <a href="#" className="hover:text-blue-600">
              Contact
            </a>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Login
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#" className="hover:text-blue-600">
              Courses
            </a>
            <a href="#" className="hover:text-blue-600">
              Instructors
            </a>
            <a href="#" className="hover:text-blue-600">
              About
            </a>
            <a href="#" className="hover:text-blue-600">
              Contact
            </a>

            <button className="bg-blue-600 text-white py-2 rounded-lg">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default signup;