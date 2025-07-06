import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import './PortalMap.scss';

import { FC } from 'react';
import { Tooltip } from 'react-tooltip';
import _ from 'lodash';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';

interface PortalMapProps {
  geoUrl: Object;
  totalCount: number;
  data?: any;
}

export const PortalMap: FC<PortalMapProps> = ({ geoUrl, totalCount, data }) => {
  const mapData = _.keyBy(data, x => x._id);
  const unknownCount = mapData['Unknown'].count;

  const renderPopover = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <Button className="text-info">Info</Button>
        </PopoverTrigger>
        <PopoverContent ml={'0.25rem'} w={'14rem'}>
          <PopoverArrow />
          <PopoverBody display={'flex'} flexDir={'column'} gap={'1rem'}>
            <div>
              <span>
                <strong>{totalCount}</strong> {' total supercentenarians'}
              </span>
            </div>
            <div>
              <span>
                <strong>{unknownCount}</strong>
                {' supercentenarians with undisclosed location'}
              </span>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="portal-map-container">
      <ComposableMap
        projection={'geoOrthographic'}
        projectionConfig={{ rotate: [-135, -35, 0], scale: 1400 }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const prefecture = geo.properties.NAME_1;
                const lqData = mapData[prefecture];

                const count = lqData ? lqData.count : 0;
                const lineStr = `${prefecture} - ${count}`;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-tooltip-id={'portalMapToolTip'}
                    data-tooltip-content={lineStr}
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
        </ZoomableGroup>
      </ComposableMap>
      {renderPopover()}
      <Tooltip id="portalMapToolTip" />
    </div>
  );
};
