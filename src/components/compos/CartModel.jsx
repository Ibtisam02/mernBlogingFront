import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa"; // Import pencil icon

const CartModel = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open Modal Handler
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal Handler
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* Product UI */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
        <div>
          <h2 className="text-lg font-semibold">{product.productDetails.name}</h2>
          <p className="text-gray-600">Price: ${product.productDetails.price}</p>
        </div>

        {/* Pencil Icon */}
        <button
          onClick={openModal}
          className="text-blue-500 hover:text-blue-700"
          title="Edit Product"
        >
          <FaPencilAlt size={20} />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Modal Content */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>

            {/* Colors Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Available Colors:</h3>
              <div className="flex gap-2">
                {product.productDetails.colors.length > 0 ? (
                  product.productDetails.colors.map((color) => (
                    <div
                      key={color._id}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.color }}
                      title={`Color: ${color.color}`}
                    ></div>
                  ))
                ) : (
                  <p className="text-gray-500">No colors available</p>
                )}
              </div>
            </div>

            {/* Sizes Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Available Sizes:</h3>
              <div className="flex gap-2">
                {product.productDetails.sizes.length > 0 ? (
                  product.productDetails.sizes.map((size) => (
                    <span
                      key={size._id}
                      className="px-2 py-1 bg-gray-200 rounded text-gray-700"
                    >
                      {size.size}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No sizes available</p>
                )}
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModel