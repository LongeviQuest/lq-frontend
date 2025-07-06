import { Flex, Text } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';
import './ReadSection.scss';

export interface ReadSectionProps {
  title: string;
  paragraphs: ReactNode[];
}

export const ReadSection: FunctionComponent<ReadSectionProps> = props => {
  return (
    <Flex className="ReadSection" flexDir={'column'}>
      <h2 className="ReadSectionTitle">{props.title}</h2>
      <Flex className="ReadSectionParagraphs" flexDir={'column'} gap={'1rem'}>
        {props.paragraphs.map(entry => {
          return entry;
        })}
      </Flex>
    </Flex>
  );
};
