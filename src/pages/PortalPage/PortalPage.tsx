import { FC, ReactNode, useEffect, useState } from 'react';
import { TopSCDataInfo } from '../../data/top-sc';
import './PortalPage.scss';
import { SupercentenariansList } from '../../common/components/SupercentenariansList/SupercentenariansList';
import _ from 'lodash';
import { Section } from './components/Section/Section';
import { Flex, Link, Spinner } from '@chakra-ui/react';
import { PortalMap } from './components/PortalMap/PortalMap';
import { countryNameToCountryCode } from '../../common/Countries';
import ReactCountryFlag from 'react-country-flag';
import geoUrl from './data/maps/gadm41_JPN_1.json';
import cx from 'classnames';
import { configuration } from '../../services/configuration';

interface PortalPageProps {
  queryUrl: string;
  title: string;
  children?: ReactNode;
  isAboutGeography?: boolean;
  urlParams?: URLSearchParams;
  showValidationDate?: boolean;
}

interface FeaturedSC {
  name: string;
  profileUrl: string;
}

export const PortalPage: FC<PortalPageProps> = props => {
  window.document.title = `${props.title} - LongeviQuest Atlas`;
  const [data, setData] = useState<TopSCDataInfo>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [prefecturesCountData, setPrefectureCountData] = useState<any>();
  const summary = '';
  const posterImage = '';
  const backgroundImage = '';
  const prefectureCountUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/sc-count-by-prefecture/japan`;

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      await fetchData();
      setIsFetching(false);
    };
    const fetchMap = async () => {
      setIsFetching(true);
      await fetchMapData();
      setIsFetching(false);
    };

    fetch();
    fetchMap();
  }, [props.urlParams]);

  const fetchData = async () => {
    const filter: string[] = [];
    _.forEach(Array.from(props.urlParams?.entries() ?? []), x => {
      const filterElement = `${x[0]}=${x[1]}`;
      filter.push(filterElement);
    });

    const queryUrl =
      filter.length > 0
        ? `${props.queryUrl}?${filter.join('&')}`
        : props.queryUrl;
    const response = await fetch(queryUrl);
    const data = await response.json();
    setData(data);
  };

  const fetchMapData = async () => {
    const response = await fetch(prefectureCountUrl);
    const data = await response.json();
    setPrefectureCountData(data);
  };

  const renderMap = () => {
    const countryName =
      data?.content[0].acf.personal_information.nationality.name;

    return (
      <div className="map-section">
        <Flex flexDir={'column'} gap={'0.5rem'} textAlign={'center'}>
          <ReactCountryFlag
            svg
            className="country-flag"
            style={{ width: '100%', height: 'auto' }}
            countryCode={countryNameToCountryCode(countryName) ?? ''}
          />
          <h1 className="country-name">{countryName}</h1>
        </Flex>
        <PortalMap
          geoUrl={geoUrl}
          data={prefecturesCountData?.content}
          totalCount={data?.count ?? 0}
        />
      </div>
    );
  };

  const renderFeaturedSC = (index: number) => {
    if (!data) return <></>;
    if (data.content[index]) {
      const personalInfo = data.content[index].acf.personal_information;
      const featuredSC: FeaturedSC = {
        name: `${personalInfo.name} ${personalInfo.lastname}`,
        profileUrl: `${data.content[index].link}`,
      };

      return (
        <Link
          className={cx('buttonLink', `link-${index + 1}`)}
          href={featuredSC.profileUrl}
          isExternal
        >
          {featuredSC.name}
        </Link>
      );
    }

    return;
  };

  const renderSummary = () => {
    return (
      <div className="summaryGrid">
        {renderFeaturedSC(0)}
        {renderFeaturedSC(1)}
        {renderFeaturedSC(2)}
        {summary && <p className="summary">{summary}</p>}
        {posterImage && (
          <img className="poster-image" src={posterImage} alt="" />
        )}
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div className="resultsTable">
        <SupercentenariansList
          isAboutGeography={props.isAboutGeography}
          panelInfo="auto"
          url={props.queryUrl}
          content={data?.content ?? []}
          count={data?.count ?? 0}
          hideCaptions={true}
          hideCount={true}
          isLoaded={!isFetching}
          showValidationDate={props.showValidationDate}
        />
      </div>
    );
  };

  const loadingSpinner = () => {
    return (
      <div className="loadingSpinner">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  };

  return (
    <div className="results">
      {!isFetching && data ? (
        <>
          <Section>{renderMap()}</Section>
          <Section backgroundColor="primary">{renderSummary()}</Section>
          {props.children}
          <Section>{renderResults()}</Section>
          {backgroundImage && <Section backgroundImg={backgroundImage} />}
        </>
      ) : (
        <> {loadingSpinner()}</>
      )}
    </div>
  );
};
