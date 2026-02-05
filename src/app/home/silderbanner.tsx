"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Modal } from "react-bootstrap";

// Sample slides with video URLs
const slides: Array<{ video?: string; src?: string }> = [
  { video: "https://www.youtube.com/watch?v=YcxiUn7k0Ks" },
  {
    src: "https://images.unsplash.com/photo-1769624515276-203ad4e1abcb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1769633062146-cd681463d442?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Extract YouTube video ID from URL (supports watch?v=, youtu.be/, embed/)
const getYoutubeId = (url: string) => {
  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch?.[1]) return watch[1];

  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short?.[1]) return short[1];

  const embed = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embed?.[1]) return embed[1];

  return "";
};

const SliderBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // ✅ Modal state
  const [show, setShow] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const handleClose = () => {
    setShow(false);
    setActiveVideoUrl(null); // ✅ stops video
  };

  const openVideoModal = (videoUrl: string) => {
    setActiveVideoUrl(videoUrl);
    setShow(true);
  };

  const clickNext = () => setActiveSlide((p) => (p === slides.length - 1 ? 0 : p + 1));
  const clickPrev = () => setActiveSlide((p) => (p === 0 ? slides.length - 1 : p - 1));

  const activeVideoId = useMemo(() => {
    return activeVideoUrl ? getYoutubeId(activeVideoUrl) : "";
  }, [activeVideoUrl]);

  return (
    <>
      <div className="slider-banner-container">
        <div
          className="slider-banner-wrapper"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((item, idx) => (
            <div key={idx} className="slider-banner-image">
              {/* Video slide */}
              {item.video ? (
                <div className="media-inner">
                  <Image
                    src={`https://img.youtube.com/vi/${getYoutubeId(item.video)}/maxresdefault.jpg`}
                    alt={`Video ${idx}`}
                    width={1200}
                    height={500}
                    className="slider-banner-img"
                  />

                  <div className="video-bx1">
                    <button
                      type="button"
                      onClick={() => openVideoModal(item.video!)}
                      className="video-btn bg-primary"
                    >
                      <i className="fa fa-play" />
                    </button>
                    <span>Watch The Video</span>
                  </div>
                </div>
              ) : item.src ? (
                // Image slide
                <div className="media-inner">
                  <Image
                    src={item.src}
                    alt={`Slide ${idx}`}
                    width={1200}
                    height={500}
                    className="slider-banner-img"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <button onClick={clickPrev} className="nav-button prev" type="button">
          <i className="feather icon-arrow-left" />
        </button>
        <button onClick={clickNext} className="nav-button next" type="button">
          <i className="feather icon-arrow-right" />
        </button>
      </div>

      
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          {activeVideoId ? (
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SliderBanner;
