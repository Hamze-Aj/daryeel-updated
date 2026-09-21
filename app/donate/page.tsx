export default function DonatePage() {
  return (
    <main className="donate-page">
      <section className="donate-section section" aria-labelledby="donate-heading">
        <div className="container text-center">
          <h1 id="donate-heading">Support Daryeel&apos;s Work</h1>
          <p className="donate-intro">
            Your contribution helps expand dormitories, support girls&apos; education, plant shade trees, and build modern WASH facilities at Shaykosh Boarding School.
          </p>
          <div className="donate-amounts">
            <div className="donate-amount"><span className="donate-amount__value">$50</span><span className="donate-amount__desc">School supplies for a girl</span></div>
            <div className="donate-amount"><span className="donate-amount__value">$200</span><span className="donate-amount__desc">Twenty fruit trees</span></div>
            <div className="donate-amount"><span className="donate-amount__value">$500</span><span className="donate-amount__desc">A student&apos;s dormitory bed and meals</span></div>
          </div>
          <p className="trust-note">To arrange a contribution, contact Eng. Hamza at <a href="mailto:daryeerlural@gmail.com">daryeerlural@gmail.com</a> or <a href="tel:+251704737473">+251 704 737 473</a>.</p>
          <a href="/contact" className="btn-secondary">Contact the Daryeel Team</a>
        </div>
      </section>
    </main>
  );
}