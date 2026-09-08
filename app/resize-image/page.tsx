import { Converter } from "../../components/converter";
import { Header } from "../../components/header";

export const metadata = {
  title: "Resize Image",
  description: "Resize images by maximum width while preserving aspect ratio.",
};
export default function Page() {
  return (
    <>
      <Header />
      <main className="container toolpage">
        <section className="hero">
          <div className="eyebrow">IMAGE RESIZER</div>
          <h1>Resize images.</h1>
          <p>
            Set a maximum output width and preserve the original aspect ratio.
          </p>
        </section>
        <Converter defaultFormat="webp" />
      </main>
    </>
  );
}
