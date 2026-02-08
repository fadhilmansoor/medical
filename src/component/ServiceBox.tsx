"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, Scissors, Sparkles, Waves } from "lucide-react";

const serviceboxdata = [
  {
    id: 1,
    title: "Weight Loss",
    description: "Medical weight care",
    delay: "0.2s",
    Icon: Scale,
  },
  {
    id: 2,
    title: "Plastic Surgery",
    description: "Advanced cosmetic care",
    delay: "0.4s",
    Icon: Scissors,
  },
  {
    id: 3,
    title: "Derma",
    description: "Healthy glowing skin",
    delay: "0.6s",
    Icon: Sparkles,
  },
  {
    id: 4,
    title: "Hair Treatment",
    description: "Hair growth solutions",
    delay: "0.8s",
    Icon: Waves,
  },
];

function ServiceBox() {
  const [active, setActive] = useState(1);

  return (
    <>
      
      <div className="row service-box-container">
        {serviceboxdata.map((data, i) => {
          const Icon = data.Icon;

          return (
            <div
              className="col-xl-3 col-md-6 m-b30 wow fadeInUp"
              data-wow-delay={data.delay}
              data-wow-duration="0.8s"
              key={i}
            >
              <div
                className={`icon-bx-wraper style-3 box-hover ${
                  active === data.id ? "active" : ""
                }`}
                onMouseEnter={() => setActive(data.id)}
              >
                {/* ================= HEADER ================= */}
                <div className="icon-bx-head">
                  <div className="icon-content">
                    <div className="d-flex align-items-center gap-3">
                      <div className="icon-bx">
                        <span className="icon-cell">
                          <Icon size={36} strokeWidth={2.5} />
                        </span>
                      </div>

                      <h3 className="dz-title mb-0" style={{ fontWeight: 600 }}>
                        {data.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-muted" style={{ fontWeight: 300 }}>
                      {data.description}
                    </p>
                  </div>

                  <span className="icon-bg">
                    <Icon size={120} strokeWidth={2} />
                  </span>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="icon-bx-footer">
                  <Link
                    href="/service-detail"
                    className="btn btn-square btn-primary rounded-circle"
                  >
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ServiceBox;