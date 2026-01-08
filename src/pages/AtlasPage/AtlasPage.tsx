import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { TopSCDataInfo } from '../../data/top-sc';
import './AtlasPage.scss';
import { SupercentenariansList } from '../../common/components/SupercentenariansList/SupercentenariansList';
import { Button, Collapse } from '@chakra-ui/react';
import { FilteringForm } from './components/FilteringForm';
import _ from 'lodash';
import MapChart from '../Map/MapChart';
import { configuration } from '../../services/configuration';
import { useNavigate } from 'react-router-dom';

interface AtlasPageProps {
  queryUrl: string;
  title: string;
  children?: ReactNode;
  isAboutGeography?: boolean;
  defaultFilters?: string[];
  urlParams?: URLSearchParams;
  showHeader?: boolean;
  showFilter?: boolean;
  showValidationDate?: boolean;
}

export const AtlasPage: FunctionComponent<AtlasPageProps> = props => {
  const [data, setData] = useState<TopSCDataInfo>();
  const [prefectureData, setPrefectureData] = useState<any[]>([]);
  const navigate = useNavigate();
  const showHeader = props.showHeader ?? true;
  const showFilter = props.showFilter ?? true;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  window.document.title = `${props.title} - LongeviQuest Atlas`;

  useEffect(() => {
    if (props.title !== 'Japan') {
      const fetch = async () => {
        setIsFetching(true);
        await fetchData();
        setIsFetching(false);
      };
      fetch();
    }
  }, [props.urlParams]);

  useEffect(() => {
    if (props.title === 'Japan') {
      const transformPrefectureName = (name: string): string => {
        if (!name || name === 'Unknown') return name;
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        return `${capitalized}`;
      };

      const fetchPrefectureData = async () => {
        const country = props.title.toLowerCase();
        const url = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/sc-count-by-prefecture/${country}`;
        const response = await fetch(url);
        const apiData = await response.json();
        const transformedData = apiData.content.map((item: any) => ({
          _id: transformPrefectureName(item._id),
          count: item.count,
        }));

        setPrefectureData(transformedData);
      };
      fetchPrefectureData();
    }
  }, [props.title]);

  const fetchData = async () => {
    const filter: string[] = [];
    _.forEach(Array.from(props.urlParams?.entries() ?? []), x => {
      filter.push(`${x[0]}=${x[1]}`);
    });

    const queryUrl =
      filter.length > 0
        ? `${props.queryUrl}?${filter.join('&')}`
        : props.queryUrl;

    const response = await fetch(queryUrl);
    const data = await response.json();
    console.log('Fetched data:', data);
    setData(data);
  };

  const handlePrefectureClick = (prefectureName: string) => {
    const prefectureForApi = prefectureName
      .replace(' To', '')
      .replace(' Fu', '')
      .replace(' Do', '')
      .replace(' Ken', '')
      .replace(/\s+/g, '')
      .toLowerCase();

    const country = props.title.toLowerCase();
    navigate(`/atlas/country/${country}/${prefectureForApi}`);
  };
  const handleCountryAll = () => {
    const country = props.title.toLowerCase();
    navigate(`/atlas/country/${country}/all`);
    console.log('country', country);
  };

  // Render filter (only if not Japan)
  const renderFilter = () => {
    if (props.title === 'Japan') return null;
    if (!showFilter) return null;

    return (
      <div>
        <Button
          className="filter"
          colorScheme={'blue'}
          onClick={() => setShowFilterForm(!showFilterForm)}
        >
          Filter Results
        </Button>
        <Collapse in={showFilterForm}>
          <FilteringForm
            defaultFilters={props.defaultFilters}
            country={props.title}
          />
        </Collapse>
      </div>
    );
  };

  // Render results (only if not Japan)
  const renderResults = () => {
    if (props.title === 'Japan') return null;

    return (
      <>
        {renderFilter()}
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
      </>
    );
  };

  return (
    <div className="results">
      {showHeader && (
        <div className="title_section">
          <h1>{props.title}</h1>
        </div>
      )}
      {props.children}

      {/* If Japan, show map only */}
      {props.title === 'Japan' ? (
        <>
          <Button
            className="filter"
            colorScheme={'blue'}
            onClick={handleCountryAll}
          >
            Oldest People in {props.title}
          </Button>
          <MapChart
            data={prefectureData}
            config={{
              center: [130, 35],
              scale: 1500,
            }}
            height={600}
            location="Japan"
            onRegionClick={handlePrefectureClick}
          />
        </>
      ) : (
        renderResults()
      )}
    </div>
  );
};
