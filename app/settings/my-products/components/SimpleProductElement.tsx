import { IProduct } from "@/utils/types";
import Image from "next/image";
import DeleteProductIcon from "@/public/assets/products/DeleteProduct.svg";
import EditProductIcon from "@/public/assets/products/EditProduct.svg";
import Link from "next/link";
export default function SimpleProductElement({
  product,
}: {
  product: IProduct;
}) {
  return (
    <div
      className="p-4 rounded-lg bg-white flex flex-col items-center justify-center gap-4 w-80 shadow-xl
     cursor-pointer h-fit"
    >
      <Image
        width={0}
        height={0}
        sizes="20we"
        style={{ height: "16rem", width: "16rem" }}
        src={product.image}
        alt={product.title}
      />
      <div className="flex flex-col justify-between gap-4 w-full h-full">
        <h5 className="text-2sb primary-color break-all">
          {product.title.slice(0, 80)}
        </h5>
        <div className="flex flex-col gap-2">
          <Link
            href={"/products/edit/" + product.id}
            className="py-3 main-yellow-background-color flex flex-row gap-4 w-full justify-center text-3sb"
          >
            Edit Product
            <Image
              width={30}
              height={30}
              src={EditProductIcon}
              alt="Edit Product"
            />
          </Link>
          <button className="py-3 bg-red-400 flex flex-row gap-4 w-full justify-center text-3sb">
            Delete Product
            <Image
              width={30}
              height={30}
              src={DeleteProductIcon}
              alt="Delete Product"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
