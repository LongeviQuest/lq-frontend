import { useSearchParams } from 'react-router-dom';
import { configuration } from '../../services/configuration';
import { AtlasPage } from '../AtlasPage/AtlasPage';

export const WorldPage = () => {
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/`;
  const [params] = useSearchParams();
  const defaultFilters: string[] = [];

  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={'World Supercentenarians'}
        defaultFilters={defaultFilters}
      />
    </div>
  );
};
