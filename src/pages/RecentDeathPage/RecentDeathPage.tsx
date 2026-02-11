import { useSearchParams } from 'react-router-dom';
import { configuration } from '../../services/configuration';
import { AtlasPage } from '../AtlasPage/AtlasPage';

export const RecentDeathPage = () => {
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/died_recently`;
  const [params] = useSearchParams();
  const defaultFilters: string[] = ['deceased'];
  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={'Recent Deaths'}
        defaultFilters={defaultFilters}
        useStaticTitle={true}
      />
    </div>
  );
};
