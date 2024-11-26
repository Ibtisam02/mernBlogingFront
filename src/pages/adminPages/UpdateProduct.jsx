import React, { useEffect } from "react";
import { BeatLoader, HashLoader } from "react-spinners";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSingleProduct } from "../../redux/productSlice/getSingleProduct";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateProduct } from "../../redux/productSlice/updateProduct";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { getAllCatagories } from "../../redux/catagorySlice/addACatagory";
import { getAllSubCatagory } from "../../redux/catagorySlice/addASubCatagory";

function UpdateProduct() {
  let dispatch = useDispatch();
  let { id } = useParams();
  let { SingleProduct, loading } = useSelector(
    (state) => state.getSingleProductt
  );

  useEffect(() => {
    dispatch(getAllCatagories()).then((res) => {
      console.log(res);
    });
  }, []);
  useEffect(() => {
    dispatch(getAllSubCatagory()).then((res) => {
      console.log(res);
    });
  }, []);
  let [name, setName] = useState("");
  let [price, setPrice] = useState(Number);
  let [catagory, setCatagory] = useState("");
  let [description, setDescription] = useState("");
  let [stock, setStock] = useState(Number);
  let [images, setImages] = useState(SingleProduct?.images);
  let [localImg, setLocalImg] = useState([]);
  let [newImages, setNewImages] = useState([]);
  let [size, setSize] = useState("");
  let [discount, setDiscount] = useState(Number);
  let [color, setColor] = useState("");
  let [colors, setColors] = useState([]);
  let [sizes, setSizes] = useState([]);
  let [prvSizes, setPrvSizes] = useState([]);
  let [prvColors, setPrvColors] = useState([]);
  let [subCatagory, setSubCatagory] = useState("");
  let [rmColors,setRmColors]=useState([])
  let [rmSizes,setRmSizes]=useState([])
  useEffect(() => {
    dispatch(getSingleProduct(id)).then((res) => {
      let data = res?.payload?.product;
      console.log(data);
      setName(data?.name);
      setCatagory(data?.catagory);
      setDescription(data?.description);
      setPrice(data?.price);
      setStock(data?.stock);
      setImages(data?.images);
      setPrvColors(data?.colors);
      setPrvSizes(data?.sizes);
      setDiscount(data?.discount);
      setSubCatagory(data?.subCatagory);
    });
  }, [dispatch]);
console.log(price)
  let loadfiles = (e) => {
    let files = e.target.files;
    if (files.length > 10 - images.length) {
      toast.error(
        `one product can only have 10 images 😕 you can upload just ${
          10 - images.length
        } more images`
      );
      return null;
    }
    setNewImages(files);
    let newLocalUrl = [...localImg];
    for (let i = 0; i < files.length; i++) {
      let url = URL.createObjectURL(e.target.files[i]);
      newLocalUrl.push(url);
    }
    setLocalImg(newLocalUrl);
  };

  let { createdSubCatagory } = useSelector((state) => state.createSubCatagory);
  let { createdCatagory } = useSelector((state) => state.createCatagory);
  console.log(createdCatagory);
  console.log(createdSubCatagory);

  let handleCreateProduct = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("catagory", catagory);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("discount", discount);
    formData.append("colors", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("rmColors", JSON.stringify(rmColors));
    formData.append("rmSizes", JSON.stringify(rmSizes));
    formData.append("subCatagory", subCatagory);
    formData.append("id", id);
    for (let i = 0; i < newImages.length; i++) {
      formData.append("images", newImages[i]);
    }
    dispatch(updateProduct(formData)).then((res) => {
      console.log(res);
    });
  };
  let { isLoading } = useSelector((state) => state.updateProductt);

 console.log(catagory,subCatagory)
  return (
    <div className="ml-[70px] ">
      <div className="w-full h-fitt flex justify-center items-center ">
        <form
          onSubmit={handleCreateProduct}
          className="w-[70%] h-fit bg-primary p-3"
        >
          <p className="text-xl text-center font-bold mb-6 text-black dark:text-white">
            Update Product
          </p>
          <p className="text-white">upload image of size 600*720 and webp</p>
          <span className="text-white">you can upoad toatal of 10 images</span>
          <p className="text-white text-center text-xl">previous images</p>
          <div className="overflow-scroll flex  gap-x-3  h-[300px]">
            {images?.map((image, i) => {
              return (
                <img
                  key={image?._id}
                  className="h-full  w-full object-cover  "
                  src={image?.url}
                  alt={`image ${i}`}
                />
              );
            })}
          </div>
          <p className="text-white text-center text-xl">New images</p>
          {localImg.length > 0 ? (
            <div className="border border-black flex overflow-scroll gap-x-2">
              {localImg.map((image, i) => {
                return (
                  <img
                    key={i}
                    className="h-[300px] w-full object-cover border border-white relative opacity-25"
                    src={image}
                    alt={`image ${i}`}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full h-[40vh] bg-red-500 ">
              <label
                className="w-full  h-full text-center flex flex-col justify-center items-center "
                htmlFor="images"
              >
                <span className="text-9xl">+</span>
                <span className="text-2xl">click to upload photos</span>
              </label>
              <input
                id="images"
                onChange={loadfiles}
                type="file"
                className="hidden"
                multiple
                accept="image/*"
              />
            </div>
          )}

          {loading ? (
            <div className="sweet-loading w-full h-screen flex justify-center items-center">
              <HashLoader
                color="#ff0000"
                cssOverride={{}}
                loading={loading}
                size={60}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    maxLength={200}
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="laptop"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Price
                  </label>
                  <input
                    onChange={(e) => {
                      setPrice(Number.parseInt(e.target.value));
                    }}
                    type="number"
                    id="last_name"
                    min={1}
                    value={price}
                    max={99999999}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="9999999"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Catatgory"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Catatgory
                    
                  </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setCatagory(e.target.value);
                    }}
                    id="Catatgory"
                  >
                    <option value={catagory}>{catagory}</option>
                    {
                      createdCatagory?.map((cata)=>{
                        return (
                          <option key={cata?._id} value={cata?.catagory}>{cata?.catagory}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="SubCatatgory"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sub Catatgory
                  </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setSubCatagory(e.target.value);
                    }}
                    id="SubCatatgory"
                  >
                    <option value={subCatagory}>{subCatagory}</option>
                    {
                      createdSubCatagory?.map((cata)=>{
                        return (
                          <option key={cata?._id} value={cata?.subCatagory}>{cata?.subCatagory}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="Stock"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setStock(Number.parseInt(e.target.value));
                    }}
                    min={1}
                    max={5000}
                    id="Stock"
                    value={stock}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="stock"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Discount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Discount
                  </label>
                  <input
                    value={discount}
                    type="number"
                    onChange={(e) => {
                      setDiscount(Number.parseInt(e.target.value));
                    }}
                    min={1}
                    max={price-1}
                    id="Discount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Discount"
                  />
                </div>
                <div className="flex flex-col gap-y-3">
                  <div>
                    <div>
                      <label
                        htmlFor="Sizes"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Sizes
                      </label>
                      <div className="relative">
                        <input
                          value={size}
                          type="text"
                          onChange={(e) => {
                            setSize(e.target.value);
                          }}
                          min={1}
                          max={5000}
                          id="Sizes"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Sizes"
                        />
                        {size.length > 0 ? (
                          <input
                            onClick={() => {
                              setSizes([...sizes, { size }]);
                              setSize("");
                            }}
                            className="absolute top-1/2 -translate-y-1/2 right-1 bg-red-600 px-3 rounded-md py-1 text-white"
                            type="button"
                            value="add"
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="my-4 flex flex-col gap-y-4">
                      <div className="flex items-center gap-x-3 text-white">
                        <span className="text-md">Previous Sizes: </span>
                        {prvSizes?.map((size, i) => {
                          return (
                            <div className="relative" key={size?._id}>

                            <span  className="font-thin text-sm">
                              {size?.size}
                            </span>
                            <RxCross2 id={size?._id}  onClick={(e)=>{setRmSizes([...rmSizes,e.target.id]);setPrvSizes(prvSizes.filter(item => item._id !== e.target.id))}}  className="absolute cursor-pointer -top-2 -right-1 text-black bg-white text-[5px] h-5 w-5 rounded-full bg-opacity-85" />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-x-3 text-white">
                        <span className="text-md">New Sizes: </span>
                        {sizes?.map((size, i) => {
                          return (
                            <span key={i} className="font-thin text-sm">
                              {size?.size}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label
                        htmlFor="Color"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Color{" "}
                        <span className="font-thin">
                          (select color and double Click on selected color)
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={`${color}`}
                          onChange={(e) => {
                            setColor(e.target.value);
                          }}
                          min={1}
                          max={5000}
                          id="Color"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Color"
                        />
                        {color.length > 0 ? (
                          <input
                            value="add"
                            onClick={() => {
                              setColors([...colors, { color }]);
                              setColor("");
                            }}
                            className="absolute top-1/2 -translate-y-1/2 right-1 bg-red-600 px-3 rounded-md py-1 text-white"
                            type="button"
                          />
                        ) : (
                          <input
                            className="absolute top-1/2 -translate-y-1/2 right-1"
                            onDoubleClick={(e) => {
                              setColor(e.target.value);
                            }}
                            type="color"
                          />
                        )}
                      </div>
                      <div className="my-4 flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-2 mt-3">
                          <span className="text-md text-white">
                            Previous Colors:{" "}
                          </span>
                          {prvColors?.map((color, i) => {
                            return (
                              <div className="relative" key={color?._id}>
                              <input
                              
                              type="color"
                              value={color?.color}
                              readOnly
                            />
                            <RxCross2 id={color?._id} onClick={(e)=>{setRmColors([...rmColors,e.target.id]);setPrvColors(prvColors.filter(item => item._id !== e.target.id));}}  className="absolute cursor-pointer -top-2 -right-1 bg-white text-[3px] h-5 w-5 rounded-full bg-opacity-85" />

                            </div>
                              
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-x-2 mt-3">
                          <span className="text-md text-white">
                            New Colors:{" "}
                          </span>
                          {colors?.map((color, i) => {
                            return (
                              <input
                                key={i}
                                type="color"
                                value={color?.color}
                                readOnly
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  rows={5}
                  maxLength={1000}
                  name=""
                  className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Description"
                  required
                  id="email"
                ></textarea>
                <p className="float-right pr-6 text-black dark:text-white ">
                  {description.length}/1000
                </p>
              </div>

              {isLoading ? (
                <BeatLoader
                  className="float-right mt-4 text-white px-5 py-2.5"
                  color="#ffffff "
                />
              ) : (
                <button
                  type="submit"
                  className="mt-4 float-right text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                >
                  Update
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
