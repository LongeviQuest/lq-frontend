import { useParams, useSearchParams } from 'react-router-dom';
import { configuration } from '../../services/configuration';
import { PortalPage } from '../PortalPage/PortalPage';
import PageNotFoundPage from '../PageNotFound/PageNotFound';

export const PortalCountryPage = () => {
  const { country } = useParams();

  const queryUrl = `${configuration.lqDataPlatform.apiUrl}/v1/queries/supercentenarians/country/${country}`;
  const [params] = useSearchParams();

  return (
    <div className="results">
      {country === 'japan' ? (
        <PortalPage
          urlParams={params}
          queryUrl={queryUrl}
          title={country ? `Portal ${country.toUpperCase()}` : ''}
          isAboutGeography={false}
        />
      ) : (
        <PageNotFoundPage />
      )}
    </div>
  );
};
