import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Dynamic',
    Svg: require('@site/static/img/dynamic.svg').default,
    description: (
      <>
        The world's first & only true smart modules. Chainable and linkable.
      </>
    ),
  },
  {
    title: 'Universal',
    Svg: require('@site/static/img/universal.svg').default,
    description: (
      <>
        Works with various devices including desktops, laptops, phones, and Raspberry Pi.  
      </>
    ),
  },
  {
    title: 'Extensible',
    Svg: require('@site/static/img/extensible.svg').default,
    description: (
      <>
        Supports multiple languages like Python, JavaScript & .NET, 
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
