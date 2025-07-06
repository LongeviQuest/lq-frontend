import { FunctionComponent } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import './ImagesSection.scss';

export interface ImagesSectionProps {
  title: string;
  images: string[];
}

export const ImagesSection: FunctionComponent<ImagesSectionProps> = props => {
  return (
    <Flex className="ImagesSection" flexDir={'column'}>
      <h2 className="ImagesSectionTitle">{props.title}</h2>
      <Box className="GalleryGrid">
        {props.images.map((image, index) => {
          return (
            <Box className="GalleryContainerImage">
              <Image
                className="GalleryImage"
                key={`DetailsImage-${index}`}
                src={image}
                alt="Gallery Image"
              />
            </Box>
          );
        })}
      </Box>
    </Flex>
  );
};
