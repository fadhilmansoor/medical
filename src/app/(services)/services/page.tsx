import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import ServiceBox from "@/component/ServiceBox";
import Whychoose from "@/component/WhyChoose";
import Pricing from "@/component/Pricing";
import RealPatient from "@/component/RealPatient";
import Frequently from "@/component/Frequently";

function Services() {
    return (
        <>
            <Header />
            <main className="page-content">
                <PageBanner title="Services" bnrimage={IMAGES.bnr2.src} />
                <section className="content-inner bg-light" style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}>
                    <div className="container">
                        <ServiceBox />
                    </div>
                </section>
                <section className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden" style={{ backgroundImage: `URL(${IMAGES.bg1.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right center' }}>
                    <div className="container">
                        <Whychoose />
                    </div>
                </section>
                <Frequently />
            </main>
            <Footer />            
        </>
    );
}
export default Services;