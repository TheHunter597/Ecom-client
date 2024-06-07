import { IProduct } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function SearchProduct({
  product,
  setActive,
}: {
  product: IProduct;
  setActive: Function;
}) {
  return (
    <div className=" border-b border-b-gray-600 py-2 cursor-pointer hover:bg-blue-400 duration-300">
      <Link
        href={`/products/product/${product.id}`}
        className="flex flex-row gap-2 items-center justify-center px-1 m-auto"
        onClick={() => {
          setActive(() => false);
        }}
      >
        <Image
          src={product.image}
          width={100}
          height={100}
          alt="product image"
        />
        <div>
          <h5 className="text-4sb secondary-color">
            {product.title.slice(0, 36)}
          </h5>
        </div>
      </Link>
    </div>
  );
}
