import { FunctionComponent } from 'react';
import ReactCountryFlag from 'react-country-flag';

interface FlagComponentProps {
  countryCode?: string;
}

export const FlagComponent: FunctionComponent<FlagComponentProps> = props => {
  return props.countryCode ? (
    <ReactCountryFlag svg countryCode={props.countryCode} />
  ) : (
    <>🏳</>
  );
};
