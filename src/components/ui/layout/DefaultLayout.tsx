import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";

export const DefaultLayout: React.FC = ({ children }) => (
  <div>
    <Header />
    <div className="py-8">{children}</div>
    <Footer />
  </div>
);
