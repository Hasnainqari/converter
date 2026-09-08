import Link from "next/link";
import { Converter } from "../components/converter";
import { Header } from "../components/header";
export default function Home() {
  return (
    <>
      <Header />
      <main className="container">
        <section className="hero">
          <div className="eyebrow">PRIVATE · FAST · BATCH READY</div>
          <h1>
            Every image tool.
            <br />
            <em>One clean workflow.</em>
          </h1>
          <p>
            Convert, compress and resize images with professional controls.
            Built for creators, teams and modern websites.
          </p>
        </section>
        {/* <div className="ad">ADVERTISEMENT</div> */}
        <Converter />
        <section className="section">
          <div className="eyebrow">TOOLS</div>
          <h2>More than a converter.</h2>
          <div className="grid">
            {[
              [
                "01",
                "Format conversion",
                "JPG, PNG, WebP, AVIF, TIFF and more.",
              ],
              [
                "02",
                "Compression",
                "Reduce file size while keeping quality under control.",
              ],
              [
                "03",
                "Resize",
                "Set an exact maximum width without accidental enlargement.",
              ],
              [
                "04",
                "Batch ZIP",
                "Process many images and get one downloadable archive.",
              ],
            ].map((x) => (
              <article className="feature" key={x[0]}>
                <small>{x[0]}</small>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="eyebrow">POPULAR</div>
          <h2>Purpose-built pages.</h2>
          <div className="steps">
            <Link className="step" href="/jpg-to-webp">
              <b>1</b>
              <h3>JPG → WebP</h3>
              <p>Modern web-friendly output.</p>
            </Link>
            <Link className="step" href="/heic-to-jpg">
              <b>2</b>
              <h3>HEIC → JPG</h3>
              <p>Make iPhone images broadly compatible.</p>
            </Link>
            <Link className="step" href="/compress-image">
              <b>3</b>
              <h3>Compress image</h3>
              <p>Reduce file size for sharing and websites.</p>
            </Link>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">© 2026 Convertly · Next.js + Sharp</div>
      </footer>
    </>
  );
}
