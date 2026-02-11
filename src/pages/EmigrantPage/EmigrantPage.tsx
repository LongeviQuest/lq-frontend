import { useSearchParams } from 'react-router-dom';
import { configuration } from '../../services/configuration';
import { AtlasPage } from '../AtlasPage/AtlasPage';

export const EmigrantPage = () => {
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/emigrants`;
  const [params] = useSearchParams();
  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={'Emigrants'}
        useStaticTitle={true}
      />
    </div>
  );
};
