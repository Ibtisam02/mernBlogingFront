import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchProductsOrFilter } from "../redux/productSlice/searchProductsOrfilter";
import { HashLoader } from "react-spinners";
import ProductCard from "../components/compos/ProductCard";

function ShopByCatagory() {
  const { catagory } = useParams();
  let dispatch = useDispatch();
  let { products, loading } = useSelector((state) => state.searchProduct);
  let resultPerPage = useSelector((state) => state.searchProduct.resultPerPage);
  let [pagination, setPagination] = useState(Array);
  let [curPage, setCurPage] = useState(1);
  useEffect(() => {
    dispatch(searchProductsOrFilter({ catagory: catagory })).then((res) => {
      console.log(res);
      let toatalProducts = res?.payload?.products?.length;
      let pages = toatalProducts / resultPerPage;
      pages = Math.ceil(pages);
      let pageArr = [];
      for (let i = 0; i < pages; i++) {
        pageArr.push(i + 1);
      }
      setPagination(pageArr);
    });
  }, []);

  return (
    <div>
      <div>
      {loading ? (
            <div className="sweet-loading w-full h-screen flex justify-center items-center -z-30">
              <HashLoader
                color="#ff0000"
                cssOverride={{}}
                loading={loading}
                size={60}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-11 mb-4 ">
              {products?.map((product) => {
                return (
                  <ProductCard key={product?._id + "hdfds"} product={product} />
                );
              })}
            </div>
          )}
      {pagination>1 ? (
            <div className="px-6 flex items-center gap-x-3 my-4">
              <p className="text-2xl font-bold">Pages: </p>
              {pagination?.map((page, i) => {
                return (
                  <div
                    onClick={() => {
                      setCurPage(page);
                    }}
                    className={`text-xl p-3 cursor-pointer underline  ${
                      page === curPage
                        ? "bg-white border-black border text-black"
                        : "bg-primary text-white"
                    }`}
                    key={i}
                  >
                    {page}
                  </div>
                );
              })}
            </div>
          ) : null}
      </div>
    </div>
  );
}

export default ShopByCatagory;
