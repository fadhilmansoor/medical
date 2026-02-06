"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import PageBanner from "@/component/PageBanner";
import {
  aiServicedetails,
  worldclasslistdata,
  serviceCategoryMap,
} from "@/constant/alldata";
import Image from "next/image";
import AccordionBlog from "./_components/AccordionBlog";
import SurgeryBlog from "./_components/SurgeryBlog";
import HairTransplantPage from "@/app/ai/service/sevicehair";

function ServiceDetail() {
  // ✅ default selected = first AI item (Hair)
  const [selectedService, setSelectedService] = useState<string>(
    aiServicedetails?.[0]?.title || "Hair"
  );

  // ✅ find AI config based on selected title
  const aiConfig = useMemo(() => {
    return serviceCategoryMap.find((x) => x.title === selectedService) || null;
  }, [selectedService]);

  return (
    <>
      <Header />

      <main className="page-content">
        <PageBanner title="Service Detail" bnrimage={IMAGES.bnr2.src} />

        <section className="content-inner service-single">
          <div className="container">
            <div className="row">
              {/* LEFT CONTENT */}
              <div className="col-lg-8 single-inner order-lg-1">
                {/* AI WIDGET */}
                <div
                  className="single-media dz-media height-sm radius-lg wow fadeInUp d-flex align-items-center justify-content-center"
                  data-wow-delay="0.1s"
                  data-wow-duration="0.7s"
                >
                  <div style={{ width: "700px", maxWidth: "100%" }}>
                    {aiConfig ? (
                      <HairTransplantPage
                        selectedService={selectedService}
                        aiConfig={aiConfig}
                      />
                    ) : (
                      <div className="ht-error">
                        AI preview not available for {selectedService}
                      </div>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className="content-item wow fadeInUp"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.7s"
                >
                  <h2>{selectedService}</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s.
                  </p>
                </div>

                <div
                  className="content-item wow fadeInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="0.7s"
                >
                  <h3>Steps in {selectedService}</h3>
                  <ul className="list-check text-secondary grid-2 m-b30">
                    {worldclasslistdata.map((item, i) => (
                      <li key={i}>{item.title}</li>
                    ))}
                  </ul>
                </div>

                <div
                  className="content-item wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="0.7s"
                >
                  <h3>Available Doctors</h3>
                  <SurgeryBlog />
                </div>

                <div
                  className="content-item wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="0.7s"
                >
                  <h3>Frequently asked questions</h3>
                  <AccordionBlog />
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="col-lg-4 m-b30">
                <aside className="side-bar sticky-top left">
                  {/* AI SERVICES MENU */}
             <div
  className="widget service_menu_nav bg-secondary wow fadeInUp"
  data-wow-delay="0.2s"
  data-wow-duration="0.7s"
>
  <div className="widget-title">
    <h4 className="title">All Services</h4>
  </div>

  <ul className="ai-service-list">
    {aiServicedetails.map((item, i) => {
      const isActive = item.title === selectedService;

      // simple emoji icons (optional)
      const icon =
        item.title === "Hair"
          ? "💇"
          : item.title === "Beard"
          ? "🧔"
          : item.title === "Skin"
          ? "✨"
          : item.title === "Teeth"
          ? "🦷"
          : item.title === "Eyes"
          ? "👁️"
          : "•";

      return (
        <li key={i} className={`ai-service-item ${isActive ? "is-active" : ""}`}>
          <button
            type="button"
            onClick={() => setSelectedService(item.title)}
            className="ai-service-btn"
            aria-current={isActive ? "page" : undefined}
          >
            <span className="ai-service-icon" aria-hidden="true">
              {icon}
            </span>
            <span className="ai-service-text">{item.title}</span>
            <span className="ai-service-arrow" aria-hidden="true">
              ›
            </span>
          </button>
        </li>
      );
    })}
  </ul>
</div>


                  {/* CONTACT WIDGET */}
                  <div
                    className="widget_contact wow fadeInUp"
                    style={{ backgroundImage: `url(${IMAGES.bg3png.src})` }}
                    data-wow-delay="0.4s"
                    data-wow-duration="0.7s"
                  >
                    <div className="widget-content">
                      <Image src={IMAGES.question} width={80} alt="" />
                      <h4 className="title">Do you need any help?</h4>

                      <div className="phone-number">
                        <Link href="tel:+11234567890">+1 123 456 7890</Link>
                      </div>

                      <div className="email">
                        <Link href="mailto:info@support.com">
                          info@support.com
                        </Link>
                      </div>

                      <div className="link-btn">
                        <Link
                          href="#"
                          scroll={false}
                          className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow"
                        >
                          Contact Us{" "}
                          <span className="right-icon">
                            <i className="feather icon-arrow-right" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              {/* END SIDEBAR */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ServiceDetail;
