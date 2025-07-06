import { Flex, Text } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';
import './FastActionsCard.scss';
import { FaUser } from 'react-icons/fa';
import { RiArticleFill, RiCameraLensFill } from 'react-icons/ri';
import { IoDocumentText } from 'react-icons/io5';

export interface FastActionsLinks {
  title: string;
  href: string;
  icon?: ReactNode;
}
export interface FastActionsCardProps {
  links: FastActionsLinks[];
}

export const defaultLinks: FastActionsLinks[] = [
  {
    title: 'Biography',
    href: '#biography-section',
    icon: <FaUser />,
  },
  {
    title: 'Recognition',
    href: '#recognition-section',
    icon: <RiArticleFill />,
  },
  {
    title: 'Gallery',
    href: '#gallery-section',
    icon: <RiCameraLensFill />,
  },
  {
    title: 'Recommended',
    href: '#recommended-section',
    icon: <IoDocumentText />,
  },
];

export const FastActionsCard: FunctionComponent<
  FastActionsCardProps
> = props => {
  return (
    <Flex className="FastActions" gap={'1rem'}>
      <Text className="Label">Jump to:</Text>
      <Flex
        className="LinksContainer"
        justifyContent={'center'}
        gap={'0.75rem'}
      >
        {props.links.map((link, index) => {
          return (
            <a
              className="LinkEntry"
              key={`${link.title}-${index}`}
              href={link.href}
            >
              {link.icon} <span>{link.title}</span>
            </a>
          );
        })}
      </Flex>
    </Flex>
  );
};
