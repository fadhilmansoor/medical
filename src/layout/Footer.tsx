"use client"
import Link from "next/link";
import { IMAGES } from "../constant/theme";
import { footerdata1, footerdata2 } from "../constant/alldata";
import { useRef } from "react";
import Image from "next/image";
import { useEmailService } from "@/constant/useEmailService";


function Footer() {
    let year =  new Date().getFullYear();
    const form = useRef<HTMLFormElement | null>(null);
    const { sendEmail } = useEmailService();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;
        const result = await sendEmail(form.current);
        if (result.success) {
            console.log('SUCCESS!', result.message);
        } else {
            console.error('FAILED...', result.message);
        }
    };
    return (
        <>
            <footer className="site-footer style-1 overlay-primary-light" style={{ backgroundImage: `url(${IMAGES.bg4.src})` }} >
            
                <div className="footer-top">
                    <div className="container">
               <div className="row">
  {/* Logo column */}
  <div className="col-xl-3 col-md-6 col-sm-12 wow fadeInUp">
    <div className="widget widget_about me-2">
      <div className="footer-logo logo-white">
        <Link href="/">
          <Image src={IMAGES.logo} alt="" />
        </Link>
      </div>
      <p>
        <span className="text-primary">ClinicMaster</span> Ipsum Dolor Sit Amet,
        Consectetuer Adipiscing Elit, Sed Diam Nonummy...
      </p>
    </div>
  </div>

  {/* Footer links */}
  {footerdata2.map((data, i) => (
    <div
      className="col-xl-3 col-md-3 col-6 wow fadeInUp"
      data-wow-delay={data.delay}
      key={i}
    >
      <div className="widget widget_services">
        <h2 className="footer-title">{data.title}</h2>
        <ul className="list-hover1">
          <li><Link href={data.link1}>{data.span1}</Link></li>
          <li><Link href={data.link2}>{data.span2}</Link></li>
          <li><Link href={data.link3}>{data.span3}</Link></li>
          <li><Link href={data.link4}>{data.span4}</Link></li>
          <li><Link href={data.link5}>{data.span5}</Link></li>
        </ul>
      </div>
    </div>
  ))}
</div>

                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="fb-inner">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 text-start">
                                    <p className="copyright-text">© <span className="current-year">{year}</span> 
                                    <Link href="https://themeforest.net/user/dexignzone" target="_blank"> DexignZone</Link> Theme. All Rights Reserved.</p>
                                </div>
                                <div className="col-lg-6 col-md-12 text-end">
                                    <div className="d-flex align-items-center justify-content-center justify-content-md-center justify-content-xl-end">
                                        <div className="widget-rating1">
                                            <Image src={IMAGES.google} alt="google" />
                                            <ul className="star-list">
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                                <li><i className="fa fa-star" /></li>
                                            </ul>
                                            <span className="rating">(4.8)</span>
                                            <span className="text">12k+ ratings on google</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item1">
                    <div className="info-widget style-4">
                        <div className="widget-media">
                            <Image src={IMAGES.smallavatar6} alt="" />
                        </div>
                        <div className="widget-content">
                            <h6 className="title">Have a Question?</h6>
                            <Link href="mailto:info@example.com">info@example.com</Link>
                            <span className="text">John Cane</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;