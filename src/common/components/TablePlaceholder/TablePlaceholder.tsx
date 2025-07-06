import { Skeleton, Td, Tr } from '@chakra-ui/react';
import _ from 'lodash';
import { FC } from 'react';

interface TablePlaceholderProps {
  columns?: number;
  rows?: number;
}

export const TablePlaceholder: FC<TablePlaceholderProps> = props => {
  return (
    <>
      {_.map(new Array(props.rows ?? 10), () => {
        return (
          <Tr key={`row-skeleton-${Math.random()}`}>
            {_.map(new Array(props.columns ?? 10), () => {
              return (
                <Td key={`row-skeleton-${Math.random()}`}>
                  <Skeleton height={'1rem'} />
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </>
  );
};
