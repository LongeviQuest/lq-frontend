import { Flex, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import './ProfileInfoBox.scss';

export interface ProfileInfoBoxProps {
  title: string;
  firstDetail?: string;
  secondDetail?: string;
}

export const ProfileInfoBox: FunctionComponent<ProfileInfoBoxProps> = props => {
  return (
    <Flex className="ProfileInfoBox" flexDir={'column'}>
      <h2 className="BoxTitle">{props.title}</h2>
      <span className="BoxDetail">{props.firstDetail}</span>
      <span className="BoxDetail">{props.secondDetail}</span>
    </Flex>
  );
};
