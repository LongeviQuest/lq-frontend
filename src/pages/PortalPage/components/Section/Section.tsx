import { FC, ReactNode } from 'react';
import cx from 'classnames';
import './Section.scss';

interface SectionProps {
  id?: string;
  backgroundColor?: 'primary';
  backgroundImg?: string;
  children?: ReactNode;
}

export const Section: FC<SectionProps> = ({
  id,
  children,
  backgroundColor,
  backgroundImg,
}) => {
  return (
    <section
      id={id}
      className={cx('customSection', [backgroundColor])}
      style={
        backgroundImg ? { backgroundImage: `url("${backgroundImg}")` } : {}
      }
    >
      <div className="content">{children}</div>
    </section>
  );
};
