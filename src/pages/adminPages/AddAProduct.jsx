import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/productSlice/createProduct";
import { BeatLoader } from "react-spinners";
import SmallModel from "../../components/compos/SmallModel";
import { getAllCatagories } from "../../redux/catagorySlice/addACatagory";
import { getAllSubCatagory } from "../../redux/catagorySlice/addASubCatagory";
import toast from "react-hot-toast";

function AddAProduct() {
  let dispatch = useDispatch();

  let [name, setName] = useState("");
  let [price, setPrice] = useState(Number);
  let [catagory, setCatagory] = useState("");
  let [description, setDescription] = useState("");
  let [stock, setStock] = useState(Number);
  let [images, setImages] = useState([]);
  let [localImg, setLocalImg] = useState([]);
  let [size, setSize] = useState("");
  let [discount, setDiscount] = useState(Number);
  let [color, setColor] = useState("");
  let [colors, setColors] = useState([]);
  let [sizes, setSizes] = useState([]);
  let [subCatagory, setSubCatagory] = useState("");

  //states for adding new catagory and sub catagory
  let [showCat, setShowCat] = useState(false);
  let [showSubCat, setSubShowCat] = useState(false);
  let [modelText, setModelText] = useState("");
  let [placeholderText, setPlaceholderText] = useState("");

  // get catagories and sub Catagories
  useEffect(() => {
    dispatch(getAllCatagories()).then((res) => {
      console.log(res);
    });
  }, [showCat]);
  useEffect(() => {
    dispatch(getAllSubCatagory()).then((res) => {
      console.log(res);
    });
  }, [showSubCat]);

  //get all catagories and sub catagory

  let { createdSubCatagory } = useSelector((state) => state.createSubCatagory);
  let { createdCatagory } = useSelector((state) => state.createCatagory);
  console.log(createdCatagory);
  console.log(createdSubCatagory);

  let loadfiles = (e) => {
    let files = e.target.files;
    setImages(files);
    let newLocalUrl = [...localImg];
    for (let i = 0; i < files.length; i++) {
      let url = URL.createObjectURL(e.target.files[i]);
      newLocalUrl.push(url);
    }
    setLocalImg(newLocalUrl);
  };

  let handleCreateProduct = (e) => {
    e.preventDefault();
    if (catagory==="---select option---" ||catagory=== "") {
      return toast.error("add catagory");
    }
    if (subCatagory==="---select option---" ||subCatagory=== "") {
      return toast.error("add sub catagory");
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("catagory", catagory);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("discount", discount);
    formData.append("colors", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("subCatagory", subCatagory);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(createProduct(formData)).then((res) => {
      console.log(res);
    });
  };
  let { loading } = useSelector((state) => state.createProductss);

  //functions to send catagory and sub catagory

  //function to change catagory and sub catagory state
  let changeCat = () => {
    setSubShowCat(false);
    setShowCat(true);
    setModelText("Add Catagory");
    setPlaceholderText("Catagory");
  };
  let changeSubCat = () => {
    setShowCat(false);
    setSubShowCat(true);
    setModelText("Add Sub Catagory");
    setPlaceholderText("Sub Catagory");
  };
  let hideModel = () => {
    setShowCat(false);
    setSubShowCat(false);
  };
  console.log(catagory)
  console.log(subCatagory)
  return (
    <div className="ml-[70px]">
      {showCat || showSubCat ? (
        <SmallModel
          placeholder={placeholderText}
          showCat={showCat}
          showSubCat={showSubCat}
          text={modelText}
          func1={hideModel}
        />
      ) : (
        <div className="w-full h-fitt flex justify-center items-center ">
          <form
            onSubmit={handleCreateProduct}
            className="w-[70%] h-fit bg-primary p-3"
          >
            <p className="text-xl text-center font-bold mb-6 text-black dark:text-white">
              Add Product
            </p>
            <p className="text-white">upload image of size 600*720</p>
            {images.length ? (
              <div className="border border-black flex overflow-scroll gap-x-2">
                {localImg.map((image, i) => {
                  return (
                    <img
                      className="h-[300px] w-full object-cover border border-white"
                      key={i}
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
                  required
                />
              </div>
            )}

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
                    <span
                      onClick={changeCat}
                      className="bg-red-600 ml-3 px-2 py-1 rounded-md"
                    >
                      add Catagory
                    </span>
                  </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setCatagory(e.target.value);
                    }}
                    id="Catatgory"
                  >
                    <option value="---select option---">---select option---</option>
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
                    <span
                      onClick={changeSubCat}
                      className="bg-red-600 ml-3 px-2 py-1 rounded-md"
                    >
                      add Sub Catagory
                    </span>
                  </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setSubCatagory(e.target.value);
                    }}
                    id="SubCatatgory"
                  >
                    <option value="---select option---">---select option---</option>
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

                    <div className="flex items-center gap-x-3 text-white">
                      <span className="text-lg">Sizes: </span>
                      {sizes?.map((size) => {
                        return (
                          <span className="font-thin text-sm">
                            {size?.size}
                          </span>
                        );
                      })}
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
                      <div className="flex items-center gap-x-2 mt-3">
                        <span className="text-lg text-white">Colors: </span>
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

              {loading ? (
                <BeatLoader
                  className="float-right mt-4 text-white px-5 py-2.5"
                  color="#ffffff "
                />
              ) : (
                <button
                  type="submit"
                  className="mt-4 float-right text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddAProduct;
