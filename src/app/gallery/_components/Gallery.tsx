"use client"
import React from 'react';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import { gallerydata } from '@/constant/alldata';
import Image from 'next/image';
import Link from 'next/link';

const Gallery = () => {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <section className="content-inner">
            <div className="container">
                <div className="row">
                    <LightGallery
                        onInit={onInit}
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                        elementClassNames="row"
                    >
                        {gallerydata.map((item, index) => (
                            <Link
                                href={item.image.src || ""}
                                key={index}
                                className="col-lg-4 col-md-6 col-sm-6 m-b30 group-item"
                            >
                                <div className="dz-box style-1">
                                    <div className="dz-media">
                                        <Image src={item.image} alt={item.title} />
                                    </div>
                                    <div className="dz-info">
                                        <h4 className="title">{item.title}</h4>
                                        <p>{item.category}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </LightGallery>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
