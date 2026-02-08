"use client";

import Link from "next/link";
import { IMAGES } from "../constant/theme";
import { headerdata, headerinfo, HeaderItem } from "../constant/alldata";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useEmailService } from "@/constant/useEmailService";

function Header() {
  const [show, setShow] = useState<number | null>(null);

  const handleclick = (index: number) => setShow(index);

  const isOffcanvasOpen = show === 1;
  const isMobileMenuOpen = show === 2;

  // ✅ close menu helper (IMPORTANT)
  const closeAllMenus = () => {
    setShow(null);
  };

  const [isActive, setIsActive] = useState<number | null>(null);
  function menuHandler(index: number) {
    setIsActive((prev) => (prev === index ? null : index));
  }

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  function scrollHandler() {
    setScroll(window.scrollY >= 90);
  }

  // ✅ lock body scroll when offcanvas open
  useEffect(() => {
    document.body.style.overflow = isOffcanvasOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOffcanvasOpen]);

  // email
  const form = useRef<HTMLFormElement | null>(null);
  const { sendEmail } = useEmailService();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const result = await sendEmail(form.current);
    if (result.success) {
      console.log("SUCCESS!", result.message);
    } else {
      console.error("FAILED...", result.message);
    }
  };

  return (
    <>
      <header className="site-header header style-1">
        <div className="header-info-bar d-none d-xxl-block">
          <div className="container-fluid">
            <div className="row">
              {headerinfo.map((data, i) => (
                <div className="col" key={i}>
                  <div className="icon-bx-wraper style-5">
                    <div className="icon-bx">
                      <span className="icon-cell">
                        <Image src={data.image} alt="" />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h2 className="dz-title text-primary">{data.title}</h2>
                      <p>{data.paragraph}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`sticky-header main-bar-wraper ${scroll ? "is-fixed" : ""}`}>
          <div className="main-bar clearfix bg-secondary text-white">
            <div className="container-fluid clearfix inner-bar">
              <div className="logo-header logo-dark">
                <Link href="/" onClick={closeAllMenus}>
                  <Image src={IMAGES.logowhite} alt="logo" />
                </Link>
              </div>

              {/* ✅ toggler open ONLY when mobile menu open */}
              <button
                onClick={() => handleclick(2)}
                className={`w3menu-toggler navicon ${isMobileMenuOpen ? "open" : ""}`}
                type="button"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              {/* ✅ overlay should close menu */}
              <div onClick={closeAllMenus} className="menu-close fade-overlay"></div>

              <div
                className={`header-nav w3menu w3menu-end mo-left ${isMobileMenuOpen ? "show" : ""}`}
                id="W3Menu"
              >
                <div className="logo-header logo-dark">
                  <Link href="/" onClick={closeAllMenus}>
                    <Image src={IMAGES.logo} alt="" />
                  </Link>
                </div>

                <ul className="nav navbar-nav">
                  {headerdata.map((data: HeaderItem, i: number) => {
                    const menuClassName = data.classChange;

                    if (menuClassName === "has-mega-menu") {
                      return (
                        <li
                          key={i}
                          className={`has-mega-menu sub-menu-down auto-width menu-left ${i === isActive ? "open" : ""}`}
                        >
                          <Link href="#" onClick={(e) => { e.preventDefault(); menuHandler(i); }}>
                            <span>{data.title}</span>{" "}
                            <i className="fas fa-chevron-down tabIndex" />
                          </Link>

                          <div className="mega-menu">
                            <ul className="demo-menu">
                              {data.content?.map((item, index) => (
                                <li key={index}>
                                  {/* ✅ close menu when click */}
                                  <Link href={item.to} onClick={closeAllMenus}>
                                    <Image src={item.image as string} alt={item.title} />
                                    <span className="menu-title">{item.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      );
                    }

                    if (menuClassName === "sub-menu-down") {
                      return (
                        <li key={i} className={`sub-menu-down ${i === isActive ? "open" : ""}`}>
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              menuHandler(i);
                            }}
                          >
                            <span>{data.title}</span>{" "}
                            <i className="fas fa-chevron-down tabIndex" />
                          </Link>

                          <ul className="sub-menu">
                            {data.content?.map((item, index) => (
                              <li key={index}>
                                {/* ✅ close menu when click */}
                                <Link href={item.to} onClick={closeAllMenus}>
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    }

                    return (
                      <li key={i}>
                        {/* ✅ close menu when click */}
                        <Link href={data.to as string} onClick={closeAllMenus}>
                          <span>{data.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="dz-social-icon">
                  <ul>
                    <li>
                      <Link href="https://www.facebook.com/dexignzone" target="_blank">
                        <i className="fa-brands fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://x.com/dexignzone" target="_blank">
                        <i className="fa-brands fa-x-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.linkedin.com/showcase/dexignzone" target="_blank">
                        <i className="fa-brands fa-linkedin" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.instagram.com/dexignzone" target="_blank">
                        <i className="fa-brands fa-instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
                  <div className={`extra-nav mobile-bottom-nav ${scroll ? 'active' : ''}`}>
  <div className="extra-cell">
    <ul className="header-right mobile-nav-list">
      <li className="nav-item mobile-nav-item">
        <Link href="/appointment" className="btn btn-primary btn-hover1 mobile-appointment-btn">
          Appointment
        </Link>
      </li>
      <li className="nav-item mobile-nav-item">
        <button 
          onClick={() => handleclick(1)} 
          type="button" 
          className="toggle-nav-btn mobile-toggle-btn" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#headerSidebar" 
          aria-controls="offcanvasLeft"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </li>
    </ul>
  </div>
</div>
            </div>
          </div>
        </div>

        {/* ✅ backdrop */}
        {isOffcanvasOpen && (
          <div className="dz-offcanvas-backdrop" onClick={closeAllMenus} />
        )}

        {/* ✅ offcanvas */}
        <div
          className={`offcanvas dz-offcanvas offcanvas-end ${isOffcanvasOpen ? "show" : ""}`}
          tabIndex={-1}
          id="headerSidebar"
          aria-hidden={!isOffcanvasOpen}
          style={{ visibility: isOffcanvasOpen ? "visible" : "hidden" }}
        >
          <button
            onClick={closeAllMenus}
            type="button"
            className="btn-close m-t10 m-l10"
            aria-label="Close"
          />

          <div className="offcanvas-body">
            <div className="widget">
              <div className="sidebar-header m-b20">
                <Link href="/" onClick={closeAllMenus}>
                  <Image src={IMAGES.logo} alt="/" />
                </Link>
              </div>
              <p>
                ClinicMaster is a modern and responsive Bootstrap HTML template designed for health and medical websites.
                Ideal for clinics, hospitals, and healthcare professionals seeking a professional online presence with an
                elegant and user-friendly design.
              </p>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">Contact Us</h4>
              </div>
              <ul className="list-check">
                <li>785 15h Street, Office 478 Berlin, De 81566</li>
                <li>
                  <Link href="mailto:email@domain.com" className="text-body">
                    email@domain.com
                  </Link>
                </li>
                <li>
                  <Link href="tel:+11234567890" className="text-body">
                    +1 123 456 7890
                  </Link>
                </li>
              </ul>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">Newsletter</h4>
              </div>
              <form className="dzSubscribe style-2" ref={form} onSubmit={handleSubmit}>
                <div className="dzSubscribeMsg"></div>
                <div className="form-group">
                  <div className="input-group mb-0">
                    <input
                      name="dzEmail"
                      required
                      type="email"
                      className="form-control"
                      placeholder="Your Email Address"
                    />
                    <div className="input-group-addon">
                      <button
                        name="submit"
                        value="Submit"
                        type="submit"
                        className="btn text-primary btn-transparent p-2"
                      >
                        <i className="fa-solid fa-paper-plane" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">Follow Us</h4>
              </div>
              <div className="dz-social-icon style-1">
                <ul>
                  <li>
                    <Link href="https://www.linkedin.com/showcase/dexignzone" target="_blank">
                      <i className="fa-brands fa-linkedin" />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/dexignzone" target="_blank">
                      <i className="fa-brands fa-instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.facebook.com/dexignzone" target="_blank">
                      <i className="fa-brands fa-facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://x.com/dexignzone" target="_blank">
                      <i className="fa-brands fa-x-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.youtube.com/@dexignzone" target="_blank">
                      <i className="fa-brands fa-youtube" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
