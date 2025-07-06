import { FunctionComponent } from 'react';
import { MapInfo } from '../../../data/map-info';
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  Button,
} from '@chakra-ui/react';
import './SearchResultList.scss';
import { countryNameToCountryCode } from '../../Countries';
import { FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { TablePlaceholder } from '../TablePlaceholder/TablePlaceholder';
import { FlagComponent } from '../FlagComponent/FlagComponent';

export const SearchResultList: FunctionComponent<MapInfo> = props => {
  const navigate = useNavigate();

  const fixAge = (milliseconds: number) => {
    return Math.floor(milliseconds / 31556952000);
  };

  const getQueryListResultsTable = () => {
    return (
      <TableContainer>
        <Table variant="striped" colorScheme={'gray'}>
          <Thead bgColor={'#003058'}>
            <Tr>
              <Th width={'20rem'} textColor={'#ffffff'}>
                Name
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Born
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Died
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Age
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Gender
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Birthplace
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Deathplace/Residence
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Status
              </Th>
              {props.showDetails && (
                <Th width={'5rem'} textColor={'#ffffff'}>
                  Actions
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {!props.isLoaded ? <TablePlaceholder /> : <></>}
            {props.content.map((value, index) => {
              const deathAndResidence = [];
              return (
                <Tr key={index}>
                  <Td width={'20rem'}>
                    {value.acf.personal_information.name +
                      ' ' +
                      value.acf.personal_information.lastname}
                  </Td>
                  <Td width={'10rem'}>
                    {new Date(
                      value.acf.personal_information.birth
                    ).toLocaleDateString('en-GB', {
                      timeZone: 'UTC',
                    })}
                  </Td>
                  <Td width={'10rem'}>
                    {!value.acf.personal_information.is_dead
                      ? 'Living'
                      : value.acf.personal_information.date_of_death
                      ? new Date(
                          value.acf.personal_information.date_of_death
                        ).toLocaleDateString('en-GB', {
                          timeZone: 'UTC',
                        })
                      : 'N/A'}
                  </Td>
                  <Td width={'10rem'}>
                    {fixAge(value.ageInMilliseconds).toString()}
                  </Td>
                  <Td width={'10rem'}>
                    {value.acf.personal_information.sex.name}
                  </Td>
                  <Td width={'10rem'}>
                    {value.acf.personal_information.birth_place.country.name !==
                    '' ? (
                      <>
                        <FlagComponent
                          countryCode={countryNameToCountryCode(
                            value.acf.personal_information.birth_place.country
                              .name
                          )}
                        />
                        {' ' +
                          value.acf.personal_information.birth_place.country
                            .name}
                      </>
                    ) : (
                      'N/A'
                    )}
                  </Td>
                  <Td width={'10rem'}>
                    {!value.acf.personal_information.is_dead ? (
                      'Living'
                    ) : value.acf.personal_information.death_place.country
                        .name ? (
                      <>
                        <FlagComponent
                          countryCode={countryNameToCountryCode(
                            value.acf.personal_information.residence.country
                              .name
                          )}
                        />
                        {' ' +
                          value.acf.personal_information.death_place.country
                            .name}
                      </>
                    ) : (
                      'N/A'
                    )}
                  </Td>
                  <Td width={'10rem'}>
                    {!value.acf.sc_validated ? 'Validated' : 'Not Validated'}
                  </Td>
                  {props.showDetails && (
                    <Td width={'10rem'}>
                      <Button
                        onClick={() => {
                          navigate(`/detail?id=` + value._id);
                        }}
                      >
                        Details
                      </Button>
                    </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const downloadData = () => {
    window.open(props.url + '?csv=1', '_blank');
  };

  if (props.count === 0) {
    return <span>There is no data matching that criteria</span>;
  }

  return (
    <Flex
      className="QueryResultListWrapper"
      width={'100%'}
      direction={'column'}
      overflowY={'auto'}
      gap={1}
    >
      <Flex
        width={'100%'}
        className="QueryResultListTitle"
        direction={'row'}
        gap={1}
        alignItems={'center'}
        justifyContent={'end'}
        marginEnd={1}
      >
        <Text
          className="QueryEditorTitle"
          textColor={'#003058'}
          display={'inline'}
          fontSize={'1rem'}
          fontWeight={'700'}
          lineHeight={'1rem'}
          padding={'0.5rem'}
        >
          Total: <strong>{props.count}</strong>
        </Text>
        {props.url && (
          <IconButton
            icon={<FiDownload />}
            onClick={downloadData}
            aria-label={''}
          />
        )}
      </Flex>
      <Box
        className="TableWrapper"
        height={props.panelInfo ?? 'calc(100vh - 200px)'}
        width={'100%'}
        overflowY={'scroll'}
      >
        {getQueryListResultsTable()}
      </Box>
      <Flex gap={'2rem'} width={'100%'}></Flex>
    </Flex>
  );
};
