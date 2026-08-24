import Header from "@/components/layout/header/Header";
import ProductPresentation from "@/components/layout/main/ProductPresentation";
import GridCards from "@/components/layout/main/GridCards";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <ProductPresentation></ProductPresentation>
      <GridCards></GridCards>
    </div>
  );
}
