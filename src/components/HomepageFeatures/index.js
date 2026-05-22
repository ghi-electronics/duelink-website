import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Engineers',
    Svg: require('@site/static/img/engineers.svg').default,
    description: (
      <>
        Prototype quickly with scriptable modules that work with your existing hardware, in minutes vs days.<br/>
        <br/>
        <a class="button button--primary" href="/docs/engineers">For Engineers</a>
      </>
    ),
  },
  {
    title: 'Makers',
    Svg: require('@site/static/img/makers.svg').default,
    description: (
      <>
        Start with block coding or jump to Python and JavaScript. Use one module or build a chain for your next project.<br/>
        <br/>
        <a class="button button--primary" href="/docs/makers">For Makers</a>
      </>
    ),
  },
  {
    title: 'Educators',
    Svg: require('@site/static/img/educators.svg').default,
    description: (
      <>
        Teach physical computing with MicroBlocks, structured lessons, and hardware that stays approachable in the classroom.<br/>
        <br/>
        <a class="button button--primary" href="/docs/educators">For Educators</a>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}
//<div style={{display: 'block',  justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      
      <div className="container" style={{textAlign: 'center'}}>
        
        
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <hr/>

        <Heading as="h2" >
          Get Started in Minutes!
        </Heading>
        <img src="/img/getting-started.webp" alt="getting started" />
        <p>Connect a module, pick a host and language, and run your first program.</p>
        <a class="button button--primary" href="/docs/start">Start Coding</a>
        <hr/>
        
        <Heading as="h2" >
          Tether one module—or Daisylink many
        </Heading>
        <p><strong>Uplink</strong> connects to your host over USB, I2C, or UART. <strong>Downlink</strong> chains additional modules.</p>
        <img src="/img/daisylink.webp" alt="DUELink" />
        <hr/>
        <Heading as="h2" >
          Each Module is a Microcomputer
        </Heading>
        <p>Run scripts on the module itself, or send commands from tethered hardware. Same board, two workflows.</p>
        <img src="/img/button-led.webp" width ="400px" alt="DUELink" />
        <hr/>
        <Heading as="h2" >
          Versatile Catalog of Options
        </Heading>
        <p>Sensors, actuators, displays, adapters, and kits—designed to work together in one system.</p>
        <img src="/img/duelink-modules.webp" alt="DUELink" />
        <a class="button button--primary" href="/docs/catalog/products">Product Catalog</a>
      </div>
    </section>
  );
}
