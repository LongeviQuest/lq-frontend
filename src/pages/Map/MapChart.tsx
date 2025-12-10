import { FunctionComponent, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from 'react-simple-maps';
import _ from 'lodash';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import './MapChart.scss';
import JapanFeatures from './japan-features.json';

const geoUrl = 'features.json';

export interface IMapProps {
  data?: any;
  config: any;
  title?: string;
  height?: number;
  sphere?: boolean;
  location?: string;
}

export const MapChart: FunctionComponent<IMapProps> = props => {
  const mapData = _.keyBy(props.data, x => x._id);
  const [content, setContent] = useState<string>();
  const navigate = useNavigate();

  return (
    <div className="MapContainer">
      <h2 id={props.title?.toLocaleLowerCase().replace(' ', '-') + '-section'}>
        {props.title}
      </h2>
      <div className="Map">
        <ComposableMap
          height={props.height ?? 400}
          projectionConfig={props.config}
        >
          {props.sphere && (
            <Sphere stroke="#fff" strokeWidth={0.5} id={''} fill={'#f2f2f2'} />
          )}
          <Graticule stroke="#f2f2f2" strokeWidth={1} />

          <Geographies
            geography={props.location === 'Japan' ? JapanFeatures : geoUrl}
          >
            {({ geographies }) =>
              geographies.map((geo: any) => {
                const countryName = geo.properties.name;
                const lqData = mapData[countryName];
                const count = lqData ? lqData.count : 0;
                const lineStr = `${countryName} - ${count}`;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-tooltip-id={'mapToolTip'}
                    data-tooltip-content={lineStr}
                    fill={count > 0 ? 'green' : '#fff'}
                    onClick={() => {
                      navigate('/atlas/country/' + countryName);
                    }}
                    onMouseEnter={event => {}}
                    onMouseLeave={() => {
                      setContent('');
                    }}
                    style={
                      {
                        default: {
                          fill: '#D2EDF0',
                          stroke: '#003058',
                          color: '#000',
                          strokeWidth: 0.5,
                        },
                        hover: {
                          fill: '#003058',
                          outline: 'white',
                          cursor: 'pointer',
                        },
                        pressed: {
                          fill: '#E42',
                          outline: 'none',
                        },
                      } as any
                    }
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <Tooltip id="mapToolTip" />
      </div>
    </div>
  );
};

export default MapChart;
