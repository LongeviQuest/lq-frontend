import { configuration } from '../../services/configuration';
import { useEffect, useState } from 'react';
import { TopSCDataInfo } from '../../data/top-sc';
import { TableEmbed } from '../../common/components/TableEmbed/TableEmbed';

export const OldestLivingMenEmbedPage = () => {
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/men`;
  const defaultParams: { key: string; value: string }[] = [
    { key: 'gender', value: 'Male' },
    { key: 'validation', value: 'validated' },
    { key: 'living', value: 'living' },
    { key: 'status', value: 'publish' },
  ];

  const [data, setData] = useState<TopSCDataInfo>();

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      await fetchData();
      setIsFetching(false);
    };

    fetch();

    let interval = setInterval(() => {
      fetch();
    }, 60 * 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchData = async () => {
    const filter: string[] = [];
    defaultParams.map(param => {
      return filter.push(`${param.key}=${param.value}`);
    });

    const queryUrlWithFilter =
      filter.length > 0 ? `${queryUrl}?${filter.join('&')}` : queryUrl;

    const response = await fetch(queryUrlWithFilter);
    const data = await response.json();
    setData(data);
  };

  return (
    <div className="results">
      <TableEmbed
        content={data?.content ?? []}
        title="Oldest Living Men"
        link="https://atlas.longeviquest.com/atlas/men"
        isLoaded={!isFetching}
      />
    </div>
  );
};
