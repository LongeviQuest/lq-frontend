import { useSearchParams } from 'react-router-dom';
import { AtlasPage } from '../AtlasPage/AtlasPage';
import { configuration } from '../../services/configuration';

export const LivingPage = () => {
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/all-living`;
  const defaultFilters: string[] = ['living'];
  const [params] = useSearchParams();

  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={'Living'}
        defaultFilters={defaultFilters}
      />
    </div>
  );
};
