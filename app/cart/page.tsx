import ProtectedRouteUserAuth from "@/utils/Errors/UserAuthenticatedRoute";
import CartContent from "./components/Cart";
export const metadata = {
  title: "Cart",
};
export default async function Cart() {
  return (
    <ProtectedRouteUserAuth>
      <CartContent />
    </ProtectedRouteUserAuth>
  );
}
