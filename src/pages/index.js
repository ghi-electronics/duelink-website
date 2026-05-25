import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ForumFeed from '@site/src/components/ForumFeed';

import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Smart modules that speak plain text
        </Heading>
        <dl className={styles.heroOptions}>
          <dt>Hardware</dt>
          <dd>PC, Raspberry Pi, Arduino, micro:bit, phone, or anything else</dd>
          <dt>Language</dt>
          <dd>Python, JavaScript, .NET, MicroPython, or any other</dd>
        </dl>

        <div className={styles.heroShowcase}>
          <div className={styles.heroColumn}>
            <div className={styles.heroImageWrap}>
              <img
                src="/img/catalog/axholey-4.webp"
                alt="A DUELink project board with chained modules — display, sensors, buttons, slider, and more"
              />
            </div>
            <Link className="button button--primary button--lg" to="/docs/catalog/products">
              Browse Modules
            </Link>
          </div>

          <div className={styles.heroColumn}>
            <Link to="/docs/try" className={styles.terminalMockLink}>
              <div className={styles.terminalMock}>
                <div className={styles.terminalBar}>
                  <span className={styles.terminalDot} style={{background: '#ff5f57'}} />
                  <span className={styles.terminalDot} style={{background: '#febc2e'}} />
                  <span className={styles.terminalDot} style={{background: '#28c840'}} />
                  <span className={styles.terminalTitle}>DUELink — try a command</span>
                </div>
                <div className={styles.terminalBody}>
                  <div className={styles.terminalLine}>
                    <span className={styles.prompt}>&gt;</span> StatLed(200,200,5)
                  </div>
                  <div className={styles.terminalLine}>
                    <span className={styles.ok}>OK</span>
                  </div>
                  <div className={styles.terminalLine}>
                    <span className={styles.prompt}>&gt;</span>
                    <span className={styles.cursor}>&#9608;</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link className="button button--primary button--lg" to="/docs/try">
              Try a Command
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function ProductLineSection({ image, eyebrow, title, body, ctaLabel, ctaLink, reverse }) {
  return (
    <section className={clsx(styles.productLine, reverse && styles.productLineReverse)}>
      <div className={clsx('container', styles.productLineContainer)}>
        <div className={styles.productLineImage}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.productLineBody}>
          {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
          <Heading as="h2">{title}</Heading>
          <p>{body}</p>
          <Link className="button button--primary" to={ctaLink}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="DUELink"
      description="Smart electronic modules controlled by plain text commands from any computer in any language.">
      <Hero />
      <main>
        <ProductLineSection
          image="/img/catalog/mccincobit-e-1.webp"
          eyebrow="In the classroom"
          title="Block coding for students"
          body="CincoBit and other STEM coding boards teach physical computing with MicroBlocks — block coding that runs right on the board, with a complete curriculum included."
          ctaLabel="For educators →"
          ctaLink="/docs/educators"
        />
        <ProductLineSection
          reverse
          image="/img/catalog/adsticker-c-1.webp"
          eyebrow="On-module code"
          title="Run your own code on the module"
          body="Replace the default firmware and run code directly on the module's on-board STM32 — the Arduino IDE is our recommended easy on-ramp, with bare-metal C++ available for full toolchain control. Works on anything from a simple button module to versatile dev boards like Stick and Stamp."
          ctaLabel="On-module code →"
          ctaLink="/docs/language/standalone"
        />
      </main>
      <hr />
      <ForumFeed />
    </Layout>
  );
}
