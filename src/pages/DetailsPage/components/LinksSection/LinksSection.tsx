import { Flex } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import './LinksSection.scss';

export interface LinkEntry {
  href: string;
  name: string;
}

export interface RecommendedSection {
  title: string;
  links: LinkEntry[];
}

export interface LinksSectionsProps {
  title: string;
  recommendedEntry: RecommendedSection[];
}

export const LinksSection: FunctionComponent<LinksSectionsProps> = props => {
  return (
    <Flex className="LinksSection" flexDir={'column'} gap={'1rem'}>
      <h2 className="LinksSectionTitle">{props.title}</h2>
      {props.recommendedEntry.map((entry, index) => {
        return (
          <>
            <h3
              className="LinksSectionSubheading"
              key={`${entry.title}-${index}`}
            >
              {entry.title}
            </h3>
            <Flex className="LinksContainer">
              {entry.links.map((link, index) => {
                return (
                  <a
                    className="Link"
                    key={`${link.name}-${index}`}
                    href={link.href}
                  >
                    {link.name}
                  </a>
                );
              })}
            </Flex>
          </>
        );
      })}
    </Flex>
  );
};
