import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import GridCards from "@/components/layout/main/GridCards";
import ProductPresentation from "@/components/layout/main/ProductPresentation";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <ProductPresentation></ProductPresentation>
      <GridCards></GridCards>
      <Footer></Footer>

    </div>
  );
}
