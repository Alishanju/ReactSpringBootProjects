import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addProductApi } from "../api/productApi";

export default function AdminProducts() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });

  const mutation = useMutation({
    mutationFn: addProductApi,
    onSuccess: () => alert("Product added"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...product,
      price: Number(product.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-10 gap-5 ">
      <h2 className="font-semibold underline">Add Product</h2>

      <input
        placeholder="Name"
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      className="border border-black pl-2"
      />

      <input
        placeholder="Price"
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
           className="border border-black pl-2"
      />

      <input
        placeholder="Image URL"
        onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
           className="border border-black pl-2"
      />

      <button type="submit" className="text-white bg-black rounded-sm px-3 py-1">Add</button>
    </form>
  );
}
