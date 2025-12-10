import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { TopSCDataInfo } from '../../data/top-sc';
import './AtlasPage.scss';
import { SupercentenariansList } from '../../common/components/SupercentenariansList/SupercentenariansList';
import { Button, Collapse } from '@chakra-ui/react';
import { FilteringForm } from './components/FilteringForm';
import _ from 'lodash';
import MapChart from '../Map/MapChart';

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
    setData(data);
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
          <FilteringForm defaultFilters={props.defaultFilters} />
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
        <MapChart
          config={{
            center: [130, 35],
            scale: 1500,
          }}
          height={600}
          location="Japan"
        />
      ) : (
        renderResults()
      )}
    </div>
  );
};
