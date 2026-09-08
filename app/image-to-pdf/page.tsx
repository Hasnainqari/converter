import { Header } from "../../components/header";

export const metadata = {
  title: "Image to PDF",
  description:
    "Image to PDF workflow placeholder for the next processing module.",
};
export default function Page() {
  return (
    <>
      <Header />
      <main className="container toolpage">
        <section className="hero">
          <div className="eyebrow">COMING MODULE</div>
          <h1>Image → PDF</h1>
          <p>
            The production architecture is ready for a PDF renderer; this module
            is intentionally isolated so it can use a dedicated PDF pipeline.
          </p>
        </section>
      </main>
    </>
  );
}
