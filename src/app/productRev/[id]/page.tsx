"use client";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useParams } from "next/navigation";
import { getProducts, getProductById } from "@/Redux/sliceProducts";
import { createReview } from "@/Redux/Actions";
import { Review, ProductReview } from "@/components/interfaces";
import { Rating } from "flowbite-react";

export default function ProductRev() {
  const dispatch = useAppDispatch();
  const productos = useAppSelector(getProducts);
  const params = useParams();
  const productID = params.id;

  const [rev, setRev] = useState<Review>({
    rating: 0,
    content: "",
  });

  const [product, setProduct] = useState<ProductReview>({
    image: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const productFind = await getProductById(productID);
        console.log("productFind", productFind);
        setProduct(productFind);
      } catch (error) {
        console.error("Error en render componente de detalle producto", error);
      }
    }
    fetchData();
  }, [productID]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setRev({
      ...rev,
      [event.target.name]: inputValue,
    });
  };

  const handleCalificacion = (value: number) => {
    setRev({
      ...rev,
      rating: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!rev.content || !rev.rating) {
      window.alert("Faltan completar datos");
    } else {
      dispatch(createReview(rev));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white mt-4 shadow-lg rounded-lg flex flex-col">
      <div className="text-center mb-2">
        {product && (
          <img
            width={240}
            height={240}
            src={product.image}
            alt="Image not found"
            className="mx-auto"
          />
        )}
      </div>
      <div className="flex justify-center items-center mb-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star text-gray-500 cursor-pointer text-4xl ${
              value <= rev.rating ? "text-yellow-500" : ""
            }`}
            onClick={() => handleCalificacion(value)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div className="flex flex-col mt-auto">
        <h2 className="text-2xl font-bold mb-2">Deja un comentario sobre este producto</h2>
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <textarea id="comentario" name="content" onChange={handleChange}></textarea>
          <button
            type="button"
            className="my-2 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full w-full"
          >
            Comentar
          </button>
        </form>
      </div>
    </div>
  );
}




