"use client";

import { useState } from "react";
import { Upload, Sparkles, RotateCcw } from "lucide-react";

type AIConfig = {
  title: string;
  category: string;
  prompt: string;
};

type HairTransplantPageProps = {
  selectedService: string;
  aiConfig: AIConfig | null;
};

export default function HairTransplantPage({
  selectedService,
  aiConfig,
}: HairTransplantPageProps) {
  const [image, setImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const generateResult = async () => {
    if (!image) return;

    // ✅ if service has no AI prompt
    if (!aiConfig?.prompt) {
      setError(`AI preview is not available for ${selectedService}.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/serviceai/hairtranpland", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiConfig.prompt,
          image,
          history: [],
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Image generation failed");
      }

      setResultImage(data.image);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate result.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResultImage(null);
    setError(null);
  };

  return (
    <div className="ht-wrap">
      <div className="ht-box">
        <div className="ht-topbar">
          <div className="ht-title">
            {selectedService} Preview <span className="ht-dim">(700×500)</span>
          </div>
        </div>

        <div className="ht-body">
          {!image && (
            <label className="ht-upload">
              <Upload className="ht-icon" />
              <div className="ht-upload-text">Upload a clear front-facing photo</div>
              <div className="ht-upload-sub">JPG/PNG • Best quality</div>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
            </label>
          )}

          {image && !resultImage && (
            <div className="ht-grid">
              <div className="ht-panel ht-imagePanel">
                <img src={image} alt="Before" className="ht-img" />
              </div>

              <div className="ht-panel ht-controls">
                <div>
                  <div className="ht-meta">
                    Selected: <b>{selectedService}</b>
                  </div>
                  <div className="ht-note">This is a preview simulation.</div>
                </div>

                <div className="ht-actions">
                  <button
                    type="button"
                    className="ht-btn ht-btnPrimary"
                    onClick={generateResult}
                    disabled={loading}
                  >
                    <Sparkles className="ht-btnIcon" />
                    {loading ? "Generating..." : "Generate"}
                  </button>

                  <button type="button" className="ht-btn ht-btnOutline" onClick={reset}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {resultImage && (
            <div className="ht-resultWrap">
              <div className="ht-resultGrid">
                <div className="ht-panel ht-resultCard">
                  <div className="ht-cardHead">Before</div>
                  <img src={image!} alt="Before" className="ht-img ht-cardImg" />
                </div>

                <div className="ht-panel ht-resultCard">
                  <div className="ht-cardHead">After</div>
                  <img src={resultImage} alt="After" className="ht-img ht-cardImg" />
                </div>
              </div>

              <div className="ht-resultFooter">
                <button type="button" className="ht-btn ht-btnOutline" onClick={reset}>
                  <RotateCcw className="ht-btnIcon" />
                  Try Another
                </button>
              </div>
            </div>
          )}

          {error && <div className="ht-error">{error}</div>}
        </div>
      </div>

      <div className="ht-footnote">
        * AI-generated simulation for preview only. Actual results may vary.
      </div>
    </div>
  );
}
