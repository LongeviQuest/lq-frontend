import { Flex, Text } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';
import { FiCalendar } from 'react-icons/fi';
import './HeroData.scss';
import { getFormattedProfileDate } from '../../../../helpers/date-helper';

export interface HeroDataProps {
  name: string;
  lastUpdated: Date | string;
  description: ReactNode;
}

export const HeroData: FunctionComponent<HeroDataProps> = props => {
  return (
    <Flex className="HeroData" flexDir={'column'} gap={'1rem'}>
      <Text className="HeroTitle">{props.name}</Text>
      <Flex className="HeroUpdate" align={'center'} gap={'0.25rem'}>
        <FiCalendar color="#43bcab" size={'1.0625rem'} />
        <span>{`Last update: ${getFormattedProfileDate(
          props.lastUpdated
        )}`}</span>
      </Flex>
      <Flex className="HeroDescription">{props.description}</Flex>
    </Flex>
  );
};
