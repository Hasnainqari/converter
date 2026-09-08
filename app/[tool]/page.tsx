
import { notFound } from "next/navigation";
import { Header } from "../../components/header";
import { Converter } from "../../components/converter";
const tools: Record<string, [string, string, string]> = {
  "jpg-to-webp": [
    "JPG to WebP Converter",
    "Convert JPG images to WebP with quality controls and batch ZIP downloads.",
    "webp",
  ],
  "png-to-jpg": [
    "PNG to JPG Converter",
    "Convert PNG images to JPG quickly with batch processing.",
    "jpg",
  ],
  "heic-to-jpg": [
    "HEIC to JPG Converter",
    "Convert HEIC and HEIF images to JPG using server-side processing.",
    "jpg",
  ],
  "webp-to-jpg": [
    "WebP to JPG Converter",
    "Convert WebP images to JPG with adjustable quality.",
    "jpg",
  ],
  "png-to-webp": [
    "PNG to WebP Converter",
    "Convert PNG images to smaller WebP files.",
    "webp",
  ],
};
export async function generateStaticParams() {
  return Object.keys(tools).map((tool) => ({ tool }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const t = tools[(await params).tool];
  return t ? { title: t[0], description: t[1] } : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const t = tools[(await params).tool];
  if (!t) return notFound();
  return (
    <>
      <Header />
      <main className="container toolpage">
        <section className="hero">
          <div className="eyebrow">ONLINE IMAGE TOOL</div>
          <h1>{t[0]}</h1>
          <p>{t[1]}</p>
        </section>
        <Converter defaultFormat={t[2]} />
        <section className="section">
          <div className="eyebrow">FAQ</div>
          <div className="faq">
            <details>
              <summary>Are my images stored?</summary>
              <p>
                Files are processed during the request. This starter does not
                persist uploads.
              </p>
            </details>
            <details>
              <summary>Can I convert multiple files?</summary>
              <p>Yes. Up to 50 files can be submitted in one batch.</p>
            </details>
            <details>
              <summary>Can I download a ZIP?</summary>
              <p>Yes. Multi-file batches are returned as a ZIP archive.</p>
            </details>
          </div>
        </section>
      </main>
    </>
  );
}
