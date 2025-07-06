import { Flex } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import './AdBox.scss';

export interface AdBoxProps {
  title: string;
  link: string;
}

export const AdBox: FunctionComponent<AdBoxProps> = props => {
  return (
    <Flex flexDir={'column'} className="AdBox">
      <h2 className="AdBoxTitle">{props.title}</h2>
      <a
        className="ButtonLink"
        href={props.link}
        target="_blank"
        rel="noreferrer"
      >
        Learn More
      </a>
    </Flex>
  );
};
