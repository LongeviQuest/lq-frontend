import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { TopSCDataInfo } from '../../data/top-sc';
import './AtlasPage.scss';
import { SupercentenariansList } from '../../common/components/SupercentenariansList/SupercentenariansList';
import { Button, Collapse } from '@chakra-ui/react';
import { FilteringForm } from './components/FilteringForm';
import _ from 'lodash';
import MapChart from '../Map/MapChart';
import { configuration } from '../../services/configuration';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const showHeader = props.showHeader ?? true;
  const showFilter = props.showFilter ?? true;
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(100);

  const updateUrlParams = (page: number, limit: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    params.set('limit', limit === -1 ? 'all' : limit.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1) {
      setCurrentPage(page);
      updateUrlParams(page, itemsPerPage);
    }
  };

  const handleLimitChange = (limit: number) => {
    const currentFirstItem = (currentPage - 1) * itemsPerPage + 1;
    const newPage = limit === -1 ? 1 : Math.ceil(currentFirstItem / limit);
    setItemsPerPage(limit);
    setCurrentPage(newPage);
    updateUrlParams(newPage, limit);
  };

  window.document.title = `${props.title} - LongeviQuest Atlas`;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1');
    const limitParam = params.get('limit') || '100';
    const limit = limitParam === 'all' ? -1 : parseInt(limitParam);

    if (page !== currentPage) setCurrentPage(page);
    if (limit !== itemsPerPage) setItemsPerPage(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (props.title !== 'Japan') {
      const fetch = async () => {
        setIsFetching(true);
        await fetchData();
        setIsFetching(false);
      };
      fetch();
    }
  }, [props.urlParams, currentPage, itemsPerPage]);

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
      if (x[0] !== 'page' && x[0] !== 'limit') {
        filter.push(`${x[0]}=${x[1]}`);
      }
    });

    filter.push(`page=${currentPage}`);
    const limitParam = itemsPerPage === -1 ? 'all' : itemsPerPage;
    filter.push(`limit=${limitParam}`);

    const queryUrl = `${props.queryUrl}?${filter.join('&')}`;

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
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
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
