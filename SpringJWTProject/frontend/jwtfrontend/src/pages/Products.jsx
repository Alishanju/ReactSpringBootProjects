import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/productApi";

export default function Products() {
  const { data = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl underline mb-10">Products</h2>
      <div  className="flex flex-wrap justify-center items-center gap-2 " >
      {data.map((p) => (
        <div key={p.id} className="flex flex-col w-[300px] h-[200px] border-2 items-center justify-center gap-3" >
          <img src={p.imageUrl} alt={p.name} className="h-3/5" />
          <p>{p.name} - ₹{p.price}</p>
        </div>
      ))}
      </div>
    </div>
  );
}
