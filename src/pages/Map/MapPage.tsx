import { useEffect, useState } from 'react';
import MapChart from './MapChart';
import './MapPage.scss';
import { configuration } from '../../services/configuration';

export const MapPage = () => {
  const [countriesCountData, setCountriesCountData] = useState<any>();
  const [_isFetching, setIsFetching] = useState<boolean>(false);
  window.document.title = 'Map - LongeviQuest Atlas';

  const countriesCountUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/sc-count-by-country`;

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      await fetchData();
      setIsFetching(false);
    };
    fetch();
  }, []);

  const fetchData = async () => {
    const response = await fetch(countriesCountUrl);
    const data = await response.json();
    setCountriesCountData(data);
  };

  return (
    <div className="map">
      <MapChart
        title="World"
        data={countriesCountData?.content}
        config={{
          scale: 150,
        }}
      />
      <MapChart
        title="Europe"
        data={countriesCountData?.content}
        config={{
          center: [15, 55],
          scale: 700,
        }}
      />
      <MapChart
        title="Africa"
        data={countriesCountData?.content}
        config={{
          center: [20, 0],
          scale: 300,
        }}
      />
      <MapChart
        title="North America"
        data={countriesCountData?.content}
        config={{
          center: [-100, 40],
          scale: 400,
        }}
      />{' '}
      <MapChart
        title="Central America"
        data={countriesCountData?.content}
        config={{
          center: [-85, 15],
          scale: 700,
        }}
      />
      <MapChart
        title="South America"
        data={countriesCountData?.content}
        config={{
          center: [-60, -20],
          scale: 300,
        }}
      />
      <MapChart
        title="Middle East"
        data={countriesCountData?.content}
        config={{
          center: [45, 30],
          scale: 500,
        }}
      />
      <MapChart
        title="Asia"
        data={countriesCountData?.content}
        config={{
          center: [100, 30],
          scale: 300,
        }}
      />
      <MapChart
        title="Oceania"
        data={countriesCountData?.content}
        config={{
          center: [140, -25],
          scale: 500,
        }}
      />
    </div>
  );
};
