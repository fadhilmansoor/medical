"use client";

import { useState } from "react";
import Link from "next/link";
import { serviceboxdata } from "../constant/alldata";

function ServiceBox() {
  const [active, setActive] = useState(1);

  return (
    <div className="row">
      {serviceboxdata.map((data) => (
        <div
          className="col-xl-3 col-md-6 m-b30 wow fadeInUp"
          data-wow-delay={data.delay}
          data-wow-duration="0.8s"
          key={data.id}
        >
          <div
            className={`icon-bx-wraper style-3 box-hover ${
              active === data.id ? "active" : ""
            }`}
            onMouseEnter={() => setActive(data.id)}
          >
            <div className="icon-bx-head">
              <div className="icon-bx">
                <span
                  className="icon-cell"
                  dangerouslySetInnerHTML={{ __html: data.svg1 }}
                />
              </div>

              <span
                className="icon-bg"
                dangerouslySetInnerHTML={{ __html: data.svg2 }}
              />

              <div className="icon-content">
                <h3 className="dz-title">{data.title}</h3>

                {/* ✅ Sub-headings as attractive buttons */}
                <div className="d-flex flex-wrap gap-2 m-t10">
                  {data.sub?.map((s: any, idx: number) => (
<Link
  key={idx}
  href={s.to}
  className="btn btn-sm btn-outline-primary rounded-pill fw-bold"
  style={{
    fontSize: "12px",        // larger text
    fontWeight: 700,         // thicker / bold
    padding: "6px 14px",
    lineHeight: "20px",
    color: "#000",           // solid black
    borderColor: "#000",     // optional: darker outline
  }}
>
  {s.label}
</Link>


                  ))}
                </div>
              </div>
            </div>

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
      ))}
    </div>
  );
}

export default ServiceBox;
