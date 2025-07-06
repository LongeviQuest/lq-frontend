import { Link, Outlet, useNavigate } from 'react-router-dom';
import './EmbedLayout.scss';

interface FooterData {
  label: string;
  items: {
    label: string;
    link: string;
  }[];
}

export const EmbedLayout = () => {
  return (
    <div className="embed-layout">
        <Outlet />
    </div>
  );
};
