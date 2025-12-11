import { useParams, useSearchParams } from 'react-router-dom';
import { AtlasPage } from '../AtlasPage/AtlasPage';
import { configuration } from '../../services/configuration';

export const AllByPrefecturePage = () => {
  let { country, prefecture } = useParams();
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/prefecture/${country}/${prefecture}`;
  const [params] = useSearchParams();

  const prefectureName = prefecture
    ? prefecture.charAt(0).toUpperCase() + prefecture.slice(1)
    : '';

  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={prefectureName}
        isAboutGeography={true}
      />
    </div>
  );
};
