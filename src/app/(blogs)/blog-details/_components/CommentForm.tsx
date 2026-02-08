"use client";

import { useEmailService } from "@/constant/useEmailService";
import { useRef } from "react";

const CommentForm = () => {
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
    <form
      ref={form}
      onSubmit={handleSubmit}
      method="post"
      id="comments_form"
      className="comment-form"
      noValidate
    >
      <p className="comment-form-author">
        <input name="author" placeholder="Author" type="text" />
      </p>

      <p className="comment-form-email">
        <input name="email" required placeholder="Email" type="email" />
      </p>

      <p className="comment-form-comment">
        <textarea
          name="comment"
          placeholder="Type Comment Here"
          cols={45}
          rows={3}
          required
        />
      </p>

      <p className="form-submit">
        <button type="submit" className="submit btn btn-primary btn-lg filled">
          Submit Now
        </button>
      </p>
    </form>
  );
};

export default CommentForm;





