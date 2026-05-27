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
        <div className={styles.heroBanner}>
          <img src="/img/duelink-modules.webp" alt="A row of DUELink modules" />
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          Smart modules that speak plain text
        </Heading>
        <p className={styles.heroSubtitle}>
          Add sensors, displays, and motors to any board you already have.
          <br />
          No soldering, no drivers, no datasheets.
        </p>

        <div className={styles.heroVisual}>
          <img
            src="/img/duelink-supported-hardware.webp"
            alt="DUELink works with PCs, phones, tablets, and SBCs"
          />
        </div>

        <div className={styles.heroOptions}>
          <p>
            <strong>Any hardware</strong> — PC, Raspberry Pi, Arduino, micro:bit, phone.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <img
            src="/img/main-languages.webp"
            alt="DUELink works with Python, JavaScript, .NET, Arduino, MicroPython, and more"
          />
        </div>

        <div className={styles.heroOptions}>
          <p>
            <strong>Any language</strong> — Python, JavaScript, .NET, MicroPython.
          </p>
        </div>

        <div className={styles.heroShowcase}>
          <div className={styles.heroColumn}>
            <Link className="button button--primary button--lg" to="/docs/start">
              Get Started
            </Link>
            <Link className={styles.heroSecondary} to="/docs/what-is">
              What is DUELink? →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function CapabilityTile({ image, alt, title, body, ctaLabel, ctaLink }) {
  return (
    <Link to={ctaLink} className={styles.capabilityTile}>
      <div className={styles.capabilityImage}>
        <img src={image} alt={alt} />
      </div>
      <Heading as="h3">{title}</Heading>
      <p>{body}</p>
      <span className={styles.capabilityCta}>{ctaLabel} →</span>
    </Link>
  );
}

function CapabilityStrip() {
  return (
    <section className={styles.capability}>
      <div className="container">
        <div className={styles.capabilityHeader}>
          <Heading as="h2">Plain text. Surprising power.</Heading>
          <p>
            The same simple commands that blink an LED also read files on a USB stick and push
            video to a 50&quot; HDMI screen.
          </p>
        </div>
        <div className={styles.capabilityGrid}>
          <CapabilityTile
            image="/img/usbhost.webp"
            alt="DUELink USB Host module"
            title="Access USB memory"
            body="Mount a USB stick, open a file, write bytes. The FAT16/FAT32 file system is built into the module — no driver hunt, no filesystem library to integrate."
            ctaLabel="USB Host"
            ctaLink="/docs/products/stusbhost-b"
          />
          <CapabilityTile
            image="/img/hdmi.webp"
            alt="DUELink HDMI module"
            title="Output to HDMI"
            body={'The same tiny JST connector that drives an OLED can drive a 50" HDMI screen. Any host that can send text now has a high-definition display.'}
            ctaLabel="HDMI"
            ctaLink="/docs/products/dshdmi-b"
          />
        </div>
      </div>
    </section>
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
        <CapabilityStrip />
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
          image="/img/duino-options.webp"
          eyebrow="On-module code"
          title="100s of *duino options"
          body="Every DUELink module can be programmed in the Arduino IDE — making the whole catalog a family of *duino boards in every shape, with every feature. For full toolchain control, bare-metal C++ works too with STM32CubeIDE, Keil, or any other ARM toolchain."
          ctaLabel="On-module code →"
          ctaLink="/docs/language/standalone"
        />
        <ProductLineSection
          image="/img/catalog/ktessen-a-1.webp"
          eyebrow="Browse the catalog"
          title="Sensors, displays, motors, kits, and more"
          body="Mix and match across categories — every module speaks the same plain-text protocol, so the code you wrote for one works the same for the next. Not sure where to start? The Essentials Kit is a hand-picked starter set."
          ctaLabel="Browse modules →"
          ctaLink="/docs/catalog/products"
        />
      </main>
      <hr />
      <ForumFeed />
    </Layout>
  );
}
