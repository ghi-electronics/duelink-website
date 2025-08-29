import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Dynamic',
    Svg: require('@site/static/img/dynamic.svg').default,
    description: (
      <>
        Chainable and linkable over USB, I2C and UART, running with a host or standalone!
      </>
    ),
  },
  {
    title: 'Universal',
    Svg: require('@site/static/img/universal.svg').default,
    description: (
      <>
        Works with desktops, laptops, phones, and Raspberry Pi and more!
      </>
    ),
  },
  {
    title: 'Extensible',
    Svg: require('@site/static/img/extensible.svg').default,
    description: (
      <>
        Supports Python, JavaScript & .NET, with block-coding options like MicroBlocks and more!
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

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
