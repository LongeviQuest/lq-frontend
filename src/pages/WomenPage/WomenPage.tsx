import { useSearchParams } from 'react-router-dom';
import { configuration } from '../../services/configuration';
import { AtlasPage } from '../AtlasPage/AtlasPage';

export const WomenPage = () => {
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/women`;
  const [params] = useSearchParams();
  const defaultFilters: string[] = ['women'];

  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={'Female Supercentenarians'}
        defaultFilters={defaultFilters}
      />
    </div>
  );
};
