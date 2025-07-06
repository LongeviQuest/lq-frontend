import { useParams, useSearchParams } from 'react-router-dom';
import './AllByCountryPage.scss';
import { AtlasPage } from '../AtlasPage/AtlasPage';
import { configuration } from '../../services/configuration';

export const AllByCountryPage = () => {
  let { country } = useParams();
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/country/${country}`;
  const [params] = useSearchParams();

  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={country ?? ''}
        isAboutGeography={true}
      />
    </div>
  );
};
