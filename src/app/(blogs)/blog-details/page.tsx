import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import Link from "next/link";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Sidebar from "@/component/Sidebar";
import CommentForm from "./_components/CommentForm";

type Frontmatter = {
  title: string;
  date: string;
  author: string;
  cover: string;
  tags: string[];
};

async function getPost() {
  const filePath = path.join(process.cwd(), "src/app/(blogs)/blog-details/posts/blog-1.md");
  const file = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);

  return {
    frontmatter: data as Frontmatter,
    contentHtml: processed.toString(),
  };
}

export default async function BlogDetail() {
  const { frontmatter, contentHtml } = await getPost();

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="section-full post-header blog-single style-1 mb-0">
          <div className="dz-card text-center">
            <div className="dz-media overlay-secondary-light">
              {/* Keep same structure, use cover from md */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={frontmatter.cover} alt={frontmatter.title} />
            </div>

            <div className="dz-info">
              <h1 className="dz-title text-white mx-auto">{frontmatter.title}</h1>

              <div className="dz-meta style-1">
                <ul className="justify-content-center">
                  <li className="post-date">{frontmatter.date}</li>
                  <li className="dz-user">
                    <i className="fa-solid fa-user" />
                    By <Link href={"#"} scroll={false}>{frontmatter.author}</Link>
                  </li>
                  <li className="dz-comment">
                    <i className="fa-solid fa-message" />
                    <Link href={"#"} scroll={false}>24 Comments</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="content-inner-3">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 pe-xl-5 m-b30">
                <div className="dz-blog blog-single sidebar style-1">
                  <div className="dz-info">
                    <div
                      className="dz-post-text"
                      dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />

                    <div className="dz-share-post meta-bottom">
                      <div className="post-tags">
                        <strong>Tags:</strong>
                        {frontmatter.tags?.map((t) => (
                          <Link key={t} href={"#"} scroll={false}>
                            {t}
                          </Link>
                        ))}
                      </div>
                      <div className="dz-social-icon primary-light">
                        <ul>
                          <li><Link href="https://www.facebook.com/dexignzone" target="_blank"><i className="fa-brands fa-facebook-f" /></Link></li>
                          <li><Link href="https://www.instagram.com/dexignzone" target="_blank"><i className="fa-brands fa-instagram" /></Link></li>
                          <li><Link href="https://x.com/dexignzone" target="_blank"><i className="fa-brands fa-x-twitter" /></Link></li>
                          <li><Link href="https://www.linkedin.com/showcase/dexignzone" target="_blank"><i className="fa-brands fa-linkedin" /></Link></li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="clear" id="comment-list">
                  <div className="post-comments comments-area style-1 clearfix">
                    <h4 className="comments-title mb-2">Comments (02)</h4>
                    <p className="dz-title-text">There are many variations of passages of Lorem Ipsum available.</p>

                    <div className="default-form comment-respond style-1" id="respond">
                      <h4 className="comment-reply-title mb-2" id="reply-title">Good Comments</h4>
                      <p className="dz-title-text">There are many variations of passages of Lorem Ipsum available.</p>
                      <div className="clearfix">
                        <CommentForm />
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              <div className="col-xl-3">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
