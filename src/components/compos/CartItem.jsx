import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice/AddToCart";
import { getCart } from "../../redux/cartSlice/GetCart";
import toast from "react-hot-toast";
import { removeFromCart } from "../../redux/cartSlice/RemoveFromCart";
import { getNoOfItemsInCart } from "../../redux/cartSlice/NoOfItemsInCart";

function CartItem({ cart, refresh }) {
  let dispatch = useDispatch();
  let { isLoading, message } = useSelector((state) => state.addToCartt);
  let { deleteLoading } = useSelector((state) => state.rmFromCart);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedColor,setSelectedColor]=useState("")
  const [selectedSize,setSelectedSize]=useState("")

  const handleModalOpen = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product?.colorDetails?._id)
    setSelectedSize(product?.sizeDetails?._id)
  };

  const handleDeleteModalOpen = (product) => {
    setProductToDelete(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setProductToDelete(null);
    setSelectedSize("");
    setSelectedColor("");
  };

  const confirmDelete = (productId) => {
    let product = {
      productId: productId,
    };
    dispatch(removeFromCart(product)).then((res) => {
      console.log(res);
      refresh();
      dispatch(getNoOfItemsInCart()).then((res) => {
            console.log(res);
          });
      handleModalClose()
    });
  };

  let increaseQuantity = (productId, quantity) => {
    if (quantity > 10) {
      return toast.error("can't add more then 10");
    }
    if (quantity < 1) {
      return toast.error("can't remove");
    }
    let product = {
      product: {
        productId: productId,
        quantity: quantity,
      },
    };

    dispatch(addToCart(product)).then((res) => {
      console.log(res);
      refresh();
    });
  };
  let handleProductUpdate=(product,color,size)=>{
    
    if (color ===product.colorDetails._id && size=== product.sizeDetails._id) {
      return handleModalClose();
    }
    
    let productToSend = {
      product: {
        "productId": product?.productId,
        "otherDetails":{
            "color":color,
            "size":size
        }
      },
    };

    dispatch(addToCart(productToSend)).then((res) => {
      console.log(res);
      refresh();
      handleModalClose();
    });
  }


  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4">PRODUCT</th>
            <th className="p-4">PRICE</th>
            <th className="p-4 text-center">QUANTITY</th>
            <th className="p-4 text-right">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((cartItem) =>
            cartItem?.products?.map((product) => {
              const {
                productId,
                productDetails,
                colorDetails,
                sizeDetails,
                quantity,
                pricePerUnit,
              } = product;

              const showPencil =
                (productDetails.colors?.length > 1 ||
                  productDetails.sizes?.length > 1) &&
                (colorDetails || sizeDetails);

              return (
                <tr key={product.productId} className="border-b">
                  {/* Product Details */}
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={productDetails?.images?.url}
                      alt={productDetails?.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <div className="font-bold">{productDetails?.name}</div>

                      {/* Size */}
                      {sizeDetails && (
                        <div className="text-sm">
                          Size:{" "}
                          <span className="font-bold">{sizeDetails?.size}</span>
                        </div>
                      )}

                      {/* Color */}
                      {colorDetails && (
                        <div className="text-sm">
                          Color:{" "}
                          <span
                            className="inline-block w-4 h-4 rounded-full"
                            style={{ backgroundColor: colorDetails?.color }}
                          ></span>
                        </div>
                      )}

                      {/* Icons */}
                      <div className="mt-2 flex gap-2">
                        {showPencil && (
                          <button
                            className="text-gray-600 hover:text-black"
                            title="Edit"
                            onClick={() => handleModalOpen(product)}
                          >
                            ✏️
                          </button>
                        )}
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          onClick={() => handleDeleteModalOpen(product)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4">Rs.{pricePerUnit.toLocaleString()}</td>

                  {/* Quantity */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        className="w-8 disabled:cursor-not-allowed h-8 flex items-center justify-center text-xl rounded-full border bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          increaseQuantity(productId, quantity - 1)
                        }
                        disabled={isLoading || quantity < 2}
                      >
                        -
                      </button>
                      <span className="font-bold">{quantity}</span>
                      <button
                        className="w-8 disabled:cursor-not-allowed h-8 flex items-center justify-center text-xl rounded-full border bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          increaseQuantity(productId, quantity + 1)
                        }
                        disabled={isLoading || quantity > 9 ||quantity>=product?.productDetails?.stock}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Total */}
                  <td className="p-4 text-right font-bold">
                    Rs.{(pricePerUnit * quantity).toLocaleString()}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={handleModalClose}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">
              Edit: {selectedProduct.productDetails.name}
            </h2>

            {/* Colors */}
            {selectedProduct.productDetails.colors?.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold">Available Colors:</p>
                <div className="flex gap-2 items-center">
                  {selectedProduct.productDetails.colors.map((color) => (
                    <div
                    onClick={()=>{setSelectedColor(color?._id)}}
                      key={color._id}
                      className={`w-6 h-6 rounded-full  ${color?._id===selectedColor?" border-4  w-7 h-7 border-red-500":"border-none"}`} 
                      style={{ backgroundColor: color.color }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {selectedProduct.productDetails.sizes?.length > 0 && (
              <div>
                <p className="text-sm font-semibold">Available Sizes:</p>
                <div className="flex gap-2">
                  {selectedProduct.productDetails?.sizes?.map((size) => (
                    <span
                    onClick={()=>{setSelectedSize(size?._id)}}
                      key={size._id}
                      className={`px-2 py-1  rounded text-sm ${size?._id===selectedSize?"border-2 border-black":"border"}`}
                    >
                      {size.size}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-x-4 float-end">
            <button
              className="mt-4 px-4 py-2 disabled:cursor-not-allowed rounded bg-gray-200 hover:bg-gray-300"
              onClick={handleModalClose}
              disabled={isLoading}
            >
              Close
            </button>
            <button
              className="mt-4 px-4 disabled:cursor-not-allowed py-2 rounded bg-primary  text-white"
              onClick={()=>handleProductUpdate(selectedProduct,selectedColor,selectedSize)}
              disabled={isLoading}
            >
              Replace
            </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={handleModalClose}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {productToDelete.productDetails.name}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 disabled:cursor-not-allowed rounded bg-gray-200 hover:bg-gray-300"
                onClick={handleModalClose}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 disabled:cursor-not-allowed rounded bg-red-600 text-white hover:bg-red-700"
                onClick={()=>confirmDelete(productToDelete.productId)}
                disabled={deleteLoading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
