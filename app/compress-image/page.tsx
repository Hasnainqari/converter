import { Converter } from "../../components/converter";
import { Header } from "../../components/header";

export const metadata = {
  title: "Compress Image",
  description:
    "Compress images online with adjustable output quality and batch processing.",
};
export default function Page() {
  return (
    <>
      <Header />
      <main className="container toolpage">
        <section className="hero">
          <div className="eyebrow">IMAGE COMPRESSION</div>
          <h1>Compress image files.</h1>
          <p>
            Use quality and output format controls to reduce image size for
            websites and sharing.
          </p>
        </section>
        <Converter defaultFormat="webp" />
      </main>
    </>
  );
}
