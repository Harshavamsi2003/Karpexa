import PageHero from '../components/PageHero';
import { CapabilityGrid } from '../components/CardGrid';
import ContactCTA from '../components/ContactCTA';
import CustomersShowcase from '../components/CustomersShowcase';
import useReveal from '../hooks/useReveal';
import { Link } from 'react-router-dom';

export default function AllCapabilities() {
  useReveal();

  return (
    <>
      <PageHero
        crumb={[{ label: 'Home', to: '/' }, { label: 'Capabilities' }]}
        kicker="Capabilities"
        title="Everything we build, run and stand behind"
        tagline="Ten practices that cover an estate end to end — from the socket in the wall to the dashboard in the boardroom."
        aside="Most engagements begin with one of these and grow. Nothing here is contingent on buying the rest."
        actions={<Link to="/contact" className="btn btn--primary">Scope an engagement <span className="arw" aria-hidden="true">→</span></Link>}
      />

      {/* ---------------------------------------------------------------
          Unique introduction.

          This block exists so /capabilities is a page in its own right
          rather than a grid of links that repeat the homepage. Search
          engines skip hub pages whose only text already appears
          elsewhere on the site, so the wording here is deliberately
          different from the cards below and from the home page.

          If you rewrite this copy, update DEFAULT_LASTMOD or add a
          '/capabilities' entry to LASTMOD in scripts/prerender.mjs.
          --------------------------------------------------------------- */}
      <section className="section" data-theme="light">
        <div className="container">
          <div className="about-full reveal">
            <p className="eyebrow eyebrow--accent">What this page covers</p>
            <h2 className="about-full__title">
              Ten practices, built to be bought one at a time
            </h2>
            <p className="lead">
              An IT estate is rarely replaced in one go. It is inherited, patched, outgrown and
              inherited again. So Karpexa is organised as ten separate practices rather than a
              single bundled offer — hardware and data centre work, public cloud, day-to-day
              operations, security, data and reporting, the end-user environment, business
              applications, engineering talent, hardware maintenance, and print and device
              lifecycle.
            </p>
            <p className="lead">
              Each practice has its own engineers, its own scope document and its own commercial
              terms. You can hand us one problem and keep the rest of your estate exactly where it
              is. Nothing on this page requires you to buy anything else on this page.
            </p>
            <p className="lead">
              What connects them is the delivery discipline rather than the product catalogue. The
              same engineers who design a system are the ones who run it afterwards. Capacity, cost
              and recovery targets go in writing before build starts. Documentation, credentials and
              configuration stay yours throughout, so moving a practice back in-house or to another
              firm is a handover rather than a hostage negotiation.
            </p>
            <p className="lead">
              We work with mid-sized organisations and India-based capability centres from our base
              in Bengaluru, with on-site delivery across the country. If you are not sure which of
              the ten applies to you, the practical route is to describe the symptom — the audit
              finding, the slow application, the bill that keeps climbing — and let us point at the
              capability that actually addresses it.
            </p>
          </div>
        </div>
      </section>

      <section className="section" data-theme="light">
        <div className="container">
          <CapabilityGrid columns={2} />
        </div>
      </section>

      <section className="section" data-theme="tint">
        <div className="container">
          <div className="s-head s-head--split reveal">
            <div>
              <p className="eyebrow eyebrow--accent">How they combine</p>
              <h2>Separate practices, one delivery discipline</h2>
            </div>
            <p className="lead">
              Combining two capabilities with us costs less coordination than buying them from two
              firms — the same engineers, ticket queue and monthly report cover both.
            </p>
          </div>

          <div className="model__grid">
            <article className="model__item reveal">
              <span className="model__k">Start narrow</span>
              <h3>One capability, properly done</h3>
              <p>Most relationships begin with a single problem — a failing service desk, an audit finding, a migration that stalled. We solve that before proposing anything else.</p>
            </article>
            <article className="model__item reveal">
              <span className="model__k">Extend</span>
              <h3>Add without re-onboarding</h3>
              <p>Because your estate is already documented on our side, a second capability starts with context instead of another discovery exercise.</p>
            </article>
            <article className="model__item reveal">
              <span className="model__k">Consolidate</span>
              <h3>One agreement, one invoice</h3>
              <p>Capabilities can be merged onto a single contract with blended commercials, rather than accumulating as separate line items.</p>
            </article>
            <article className="model__item reveal">
              <span className="model__k">Exit</span>
              <h3>Leave whenever you like</h3>
              <p>Each capability can be withdrawn independently on notice, with its documentation, credentials and code handed back intact.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--sm" data-theme="light">
        <div className="container">
          <CustomersShowcase />
        </div>
      </section>

      <ContactCTA
        eyebrow="Where to start"
        title="Not sure which of these you need?"
        text="Describe the symptom rather than the solution — slow systems, a failed audit, a bill that keeps climbing. We will tell you which capability actually addresses it."
        primary="Describe your situation"
        secondary={{ label: 'About Karpexa', to: '/company' }}
      />
    </>
  );
}
