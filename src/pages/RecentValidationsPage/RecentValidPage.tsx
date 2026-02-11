import { useSearchParams } from 'react-router-dom';
import { AtlasPage } from '../AtlasPage/AtlasPage';

import './RecentValidPage.scss';
import { configuration } from '../../services/configuration';

export const RecentValidPage = () => {
  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/recent_validations`;
  const defaultFilters: string[] = ['validated'];
  const [params] = useSearchParams();
  return (
    <div className="results">
      <AtlasPage
        urlParams={params}
        queryUrl={queryUrl}
        title={'Recent Validations '}
        defaultFilters={defaultFilters}
        showValidationDate={true}
        useStaticTitle={true}
      />
    </div>
  );
};
