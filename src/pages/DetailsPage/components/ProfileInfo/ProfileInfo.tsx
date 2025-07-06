import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import './ProfileInfo.scss';
import { IoShareSocialOutline } from 'react-icons/io5';
import {
  ProfileInfoBox,
  ProfileInfoBoxProps,
} from './components/ProfileInfoBox/ProfileInfoBox';

export interface ProfileInfoProps {
  image: string;
  profileInfo: ProfileInfoBoxProps[];
  validated?: boolean;
  onShareClick?: () => void;
}

export const ProfileInfo: FunctionComponent<ProfileInfoProps> = props => {
  return (
    <Flex className="ProfileInfo">
      <Flex className="ImageContainer">
        <Image className="ProfileImage" src={props.image} alt="Profile Image" />
      </Flex>
      <Button className="ShareButton" onClick={() => props.onShareClick?.()}>
        <IoShareSocialOutline /> <span>Share</span>
      </Button>
      <Flex className="ProfileInfoContainer">
        {props.profileInfo.map((box, index) => {
          return (
            <ProfileInfoBox
              key={`${index}`}
              title={box.title}
              firstDetail={box.firstDetail}
              secondDetail={box.secondDetail}
            />
          );
        })}
        {props.validated && (
          <Flex className="ProfileValidated">
            <Image src="https://longeviquest.com/wp-content/themes/longeviquest-theme/img/validated.png" alt="Validated Profile" />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
