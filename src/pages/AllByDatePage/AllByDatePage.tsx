import { useParams } from 'react-router-dom';
import { AtlasPage } from '../AtlasPage/AtlasPage';

export const AllByDatePage = () => {
  let { date } = useParams();
  const queryUrl = `https://api.longeviquest.com/v1/queries/sc-by-date/${date}`;

  const renderDate = () => {
    return (
      <div>
        <div>Select Date</div>
      </div>
    );
  };

  return (
    <div className="results">
      <AtlasPage
        queryUrl={queryUrl}
        title={date ?? 'This Year'}
        children={renderDate()}
      />
    </div>
  );
};
