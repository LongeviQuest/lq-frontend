import { useSearchParams } from 'react-router-dom';
import { configuration } from '../../services/configuration';
import { AtlasPage } from '../AtlasPage/AtlasPage';

export const MenPage = () => {
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/men`;
  const defaultFilters: string[] = ['men'];
  const [params] = useSearchParams();
  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={'Male Supercentenarians'}
        defaultFilters={defaultFilters}
      />
    </div>
  );
};
