import React, { useState, useEffect } from "react";
import { Product, ProductCard } from "../";
import { apiGetProducts, apiGetProductsRecomendation } from "../../apis";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const [productRecommendation, setProductRecommendation] = useState([]);
  const user = useSelector((state) => state.user);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, sort: "-totalRatings" });
    if (response.success) setProducts(response.products);
  };

  const fetchData = async () => {
    const idUserrq = user.idUser;
    // const tokenID = user.token;
    // console.log({ idUserrq });
    // console.log("fetch line 21");
    const response = await apiGetProductsRecomendation(idUserrq);
    const data = await response.json();
    setProductRecommendation(data.productData);
  };

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="w-main">
      {/* recomendation */}
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        SUGGESTED FOR YOU
      </h3>
      <div className="mt-5 mb-5 mx-[-10px]">
        <Slider {...settings}>
          {productRecommendation?.map((el) => (
            <Product key={el._id} pid={el._id} productData={el}></Product>
          ))}
        </Slider>
      </div>
      {/* recomendation */}
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        YOU&#39;LL PROBABLY LIKE
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {products?.map((el) => (
          <ProductCard key={el._id} pid={el._id} image={el.thumb} {...el} />
        ))}
      </div>

      {/* banner bottom home */}
      <div className="grid-cols-4 hidden lg:grid grid-rows-2 gap-4 cursor-pointer mt-10">
        <img
          src="https://cdn.hoanghamobile.com/Uploads/2024/12/11/vong-xoay.gif;trim.threshold=0;trim.percentpadding=0;width=480;"
          alt=""
          className="w-full h-full object-cover col-span-2 row-span-2"
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/H7_298_454_364efb1f59.png"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
        <img
          src="https://img.pikbest.com/origin/09/06/42/153pIkbEsTA94.jpg!w700wp"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-2"
        />
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/H7_298_454_1_5fffaa2e70.png"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
