import { Outlet } from 'react-router-dom';
import './EmptyLayout.scss';

export const EmptyLayout = () => {
  return (
    <div className="EmptyLayout">
      <Outlet />
    </div>
  );
};
