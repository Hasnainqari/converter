import { Header } from "../../components/header";

export const metadata = {
  title: "Pricing",
  description: "Simple pricing architecture for Convertly.",
};
export default function Page() {
  return (
    <>
      <Header />
      <main className="container">
        <section className="hero">
          <div className="eyebrow">PRICING</div>
          <h1>Simple plans.</h1>
          <p>
            Monetization-ready structure. Connect Stripe and usage quotas when
            you're ready.
          </p>
        </section>
        <section className="pricing">
          <div className="price">
            <h3>Free</h3>
            <strong>$0</strong>
            <ul>
              <li>50 MB files</li>
              <li>50 files/batch</li>
              <li>Core formats</li>
            </ul>
          </div>
          <div className="price featured">
            <h3>Pro</h3>
            <strong>$9</strong>
            <ul>
              <li>Higher limits</li>
              <li>Priority queue</li>
              <li>Advanced formats</li>
            </ul>
          </div>
          <div className="price">
            <h3>Team</h3>
            <strong>$29</strong>
            <ul>
              <li>Shared quotas</li>
              <li>API access</li>
              <li>Team billing</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
