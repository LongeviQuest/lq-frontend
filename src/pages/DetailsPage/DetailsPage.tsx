import { Flex, Spinner } from '@chakra-ui/react';
import './DetailsPage.scss';
import { HeroData } from './components/HeroData/HeroData';
import { ProfileInfo } from './components/ProfileInfo/ProfileInfo';
import { useDataFetcher } from '../../hooks/use-data-fetcher';
import {
  FastActionsCard,
  defaultLinks,
} from './components/FastActionsCard/FastActionsCard';
import { humanDetailService } from '../../services/human-detail-service';
import { useParams } from 'react-router-dom';
import { Supercentenarian } from '../../data/map-info';
import parse from 'html-react-parser';
import { ReadSection } from './components/ReadSection/ReadSection';
import { AdBox } from './components/AdBox/AdBox';
import { ImagesSection } from './components/ImagesSection/ImagesSection';
import { LinksSection } from './components/LinksSection/LinksSection';
import { getFormattedProfileDate } from '../../helpers/date-helper';
import { useState } from 'react';

export const DetailsPage = () => {
  const { slug } = useParams();

  const [heroDetail, isLoading] = useDataFetcher<Supercentenarian>({
    serviceCall() {
      if (!slug) {
        throw new Error('Slug is needed');
      }
      return humanDetailService.getHumanBySlug(slug);
    },
    onFinish(response) {
      console.log('response', response);
    },
  });

  const [isDead, setIsDead] = useState<boolean | undefined>(
    heroDetail?.acf.personal_information.is_dead ?? undefined
  );

  const fixAge = (milliseconds: number) => {
    return Math.floor(milliseconds / 31556952000);
  };

  const getHeroSection = () => {
    return (
      <Flex className="HeroContainer" flexDir={'column'}>
        <Flex className="ColumnsContainer" w={'100%'} gap={'1rem'}>
          <ProfileInfo
            image={heroDetail?.acf.personal_information.photo ?? ''}
            validated={heroDetail?.acf.sc_validated}
            profileInfo={[
              {
                title: 'Birth',
                firstDetail: getFormattedProfileDate(
                  heroDetail?.acf.personal_information.birth.split('T')[0] ?? ''
                ),
                secondDetail: `${heroDetail?.acf.personal_information.birth_place.city}, ${heroDetail?.acf.personal_information.birth_place.country.name}`,
              },
              {
                title: isDead ? 'Death' : 'Age',
                firstDetail:
                  isDead && heroDetail
                    ? getFormattedProfileDate(
                      heroDetail?.acf.personal_information.date_of_death
                    )
                    : fixAge(heroDetail?.ageInMilliseconds ?? 0).toString(),

                secondDetail: isDead
                  ? `${heroDetail?.acf.personal_information.death_place.city}, ${heroDetail?.acf.personal_information.death_place.country.name}`
                  : '',
              },
              {
                title: isDead ? 'Age' : 'Current Residence',
                firstDetail:
                  isDead && heroDetail
                    ? fixAge(heroDetail?.ageInMilliseconds ?? 0).toString()
                    : `${heroDetail?.acf.personal_information.residence.city}, ${heroDetail?.acf.personal_information.residence.country.name}`,

                secondDetail:
                  isDead && heroDetail
                    ? `${heroDetail?.acf.personal_information.death_place.city}, ${heroDetail?.acf.personal_information.death_place.country.name}`
                    : '',
              },
            ]}
          />
          <HeroData
            name={heroDetail?.title.rendered ?? ''}
            lastUpdated={heroDetail?.modified ?? ''}
            description={parse(heroDetail?.content.rendered ?? '')}
          />
        </Flex>
      </Flex>
    );
  };

  const getBiographySection = () => {
    return (
      <Flex className="Container">
        <Flex className="RowContainer">
          <Flex className="ColumnContainer">
            <ReadSection
              title="Biography"
              paragraphs={
                heroDetail?.acf.biography.map(bio => {
                  return parse(bio.paragraph);
                }) ?? []
              }
            />
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const getRecognitionSection = () => {
    return (
      <Flex className="Container">
        <Flex className="RowContainer">
          <Flex className="ColumnContainer">
            <AdBox
              link="https://advertising.longeviquest.com/"
              title="Advertise With Us"
            />
            <ReadSection
              title="Recognition"
              paragraphs={
                heroDetail?.acf.recognition.map(recognition => {
                  return parse(recognition.paragraph);
                }) ?? []
              }
            />
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const getGallerySection = () => {
    return (
      <Flex className="Container">
        <Flex className="RowContainer">
          <Flex className="ColumnContainer">
            <ImagesSection
              title="Gallery"
              images={
                heroDetail?.acf.gallery_section.map(section => {
                  return section.link;
                }) ?? []
              }
            />
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const getRecommendedSection = () => {
    return (
      <Flex className="Container">
        <Flex className="RowContainer">
          <Flex className="ColumnContainer">
            <LinksSection
              title="Recommended"
              recommendedEntry={[
                {
                  title: 'Back to Top',
                  links: [{ name: heroDetail?.title.rendered ?? '', href: '' }],
                },
              ]}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex justify={'center'} flexDir={'column'} className="DetailsPageWrapper">
      {isLoading ? (
        <Flex w={'100%'} h={'70vh'} justify={'center'} align={'center'}>
          <Spinner size={'xl'} />
        </Flex>
      ) : (
        <>
          <Flex flexDir={'column'} className="HeroSection">
            {getHeroSection()}
            <Flex className="ContainerFluid">
              <Flex className="RowContainer">
                <Flex className="ColumnContainer">
                  <FastActionsCard links={defaultLinks} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            id="biography-section"
            role="section"
            className="BiographySection"
          >
            {getBiographySection()}
          </Flex>

          <Flex
            id="recognition-section"
            role="section"
            className="RecognitionSection"
          >
            {getRecognitionSection()}
          </Flex>

          <Flex id="gallery-section" role="section" className="GallerySection">
            {getGallerySection()}
          </Flex>
          <Flex
            id="recommended-section"
            role="section"
            className="RecommendedSection"
          >
            {getRecommendedSection()}
          </Flex>
        </>
      )}
    </Flex>
  );
};
