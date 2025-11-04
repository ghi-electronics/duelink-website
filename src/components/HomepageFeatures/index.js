import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Engineers',
    Svg: require('@site/static/img/engineers.svg').default,
    description: (
      <>
        Build prototypes and proof of concepts in minutes vs days at an extremely low-cost.<br/>
        <br/>
        <a class="button button--primary" href="/docs/engineers">Engineers</a>
      </>
    ),
  },
  {
    title: 'Makers',
    Svg: require('@site/static/img/makers.svg').default,
    description: (
      <>
        Beginners to experts will turn their dream projects into a reality.<br/>
        <br/>
        <a class="button button--primary" href="/docs/makers">Makers</a>
      </>
    ),
  },
  {
    title: 'Educators',
    Svg: require('@site/static/img/educators.svg').default,
    description: (
      <>
        Write code and instantly see it come alive—just plug, code, and create.<br/>
        <br/>
        <a class="button button--primary" href="/docs/educators">Educators</a>
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
        <Heading as="h2" >
          DUELink is for Everyone!
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <hr></hr>
        <Heading as="h4" >
          What is the latest?
        </Heading>
        <a class="button button--primary" href="/news">See the News!</a>
      </div>
    </section>
  );
}
