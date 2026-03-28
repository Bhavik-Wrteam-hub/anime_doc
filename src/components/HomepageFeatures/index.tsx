import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  iconStyle: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Social & Community',
    icon: '\u{1F3A8}',
    iconStyle: 'featureIconSocial',
    description: (
      <>
        Connect with anime artists and fans worldwide. Share artwork, follow
        creators, and build your fandom community with real-time feeds and
        interactive profiles.
      </>
    ),
  },
  {
    title: 'Marketplace & Merch',
    icon: '\u{1F6CD}\u{FE0F}',
    iconStyle: 'featureIconMarket',
    description: (
      <>
        Buy and sell exclusive anime merchandise, digital art, and collectibles.
        Integrated payments with Stripe and in-app purchases for a seamless
        shopping experience.
      </>
    ),
  },
  {
    title: 'IoT & Smart Devices',
    icon: '\u{1F4F1}',
    iconStyle: 'featureIconIoT',
    description: (
      <>
        Transfer artwork directly to IoT display devices via Bluetooth Low
        Energy. Real-time progress tracking and smart device management built
        right in.
      </>
    ),
  },
];

function Feature({title, icon, iconStyle, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className={clsx(styles.featureIcon, styles[iconStyle])}>
        {icon}
      </div>
      <div className="padding-horiz--md">
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
