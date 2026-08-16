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
