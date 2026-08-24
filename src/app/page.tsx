import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductPresentation from "@/components/layout/ProductPresentation";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <ProductPresentation></ProductPresentation>
      <Footer></Footer>
    </div>
  );
}
