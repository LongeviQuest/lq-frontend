import { FunctionComponent } from 'react';
import { MapInfo, Supercentenarian } from '../../../data/map-info';
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
import './SupercentenariansList.scss';
import { countryNameToCountryCode } from '../../Countries';
import { FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { TablePlaceholder } from '../TablePlaceholder/TablePlaceholder';
import { FlagComponent } from '../FlagComponent/FlagComponent';
import { Pagination } from '../Pagination/Pagination';

export const SupercentenariansList: FunctionComponent<MapInfo> = props => {
  const navigate = useNavigate();
  const hideCount = props.hideCount ?? false;

  const getTimeZoneFormatted = (date: string, timeZone: string) => {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: timeZone,
    }).format(new Date(date));
  };

  const buildDeathplaceOrResidenceCell = (value: Supercentenarian) => {
    let flag = null;
    let country = '';
    const personalInfo = value.acf.personal_information;
    if (!personalInfo.is_dead) {
      flag = (
        <FlagComponent
          countryCode={countryNameToCountryCode(
            personalInfo.residence.country.name
          )}
        />
      );
      country = personalInfo.residence.country.name;
    } else {
      flag = (
        <FlagComponent
          countryCode={countryNameToCountryCode(
            personalInfo.death_place.country.name
          )}
        />
      );
      country = personalInfo.death_place.country.name;
    }
    return (
      <>
        {flag} {country}
      </>
    );
  };

  const formatLink = (link: string) => {
    return link;
  };

  const renderQueryListResultsTable = () => {
    return (
      <TableContainer>
        <Table variant="striped" colorScheme={'gray'}>
          <Thead bgColor={'#003058'}>
            <Tr>
              <Th width={'5rem'} textColor={'#ffffff'}>
                Rank
              </Th>
              <Th width={'15rem'} textColor={'#ffffff'}>
                Name
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Born
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Died
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Years
              </Th>
              <Th width={'10rem'} textColor={'#ffffff'}>
                Days
              </Th>
              <Th width={'8rem'} textColor={'#ffffff'}>
                Gender
              </Th>
              <Th width={'8rem'} textColor={'#ffffff'}>
                Birthplace
              </Th>
              <Th width={'8rem'} textColor={'#ffffff'}>
                <div style={{ textAlign: 'left' }}>
                  Deathplace/
                  <br />
                  Residence
                </div>
              </Th>
              {!props.showValidationDate ? (
                <Th width={'10rem'} textColor={'#ffffff'}>
                  Status
                </Th>
              ) : (
                <Th width={'10rem'} textColor={'#ffffff'}>
                  Validation Date
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {!props.isLoaded ? <TablePlaceholder /> : <></>}
            {props.isLoaded &&
              props.content.map((value, index) => {
                const personalInfo = value.acf.personal_information;
                if (personalInfo === null) {
                  return null;
                }
                const rankNumber = ((props.currentPage || 1) - 1) * (props.itemsPerPage || 25) + index + 1;
                return (
                  <Tr id={value.slug} key={index}>
                    <Td id="Rank" width={'5rem'}>
                      <a className="circle" href={formatLink(value.link)}>
                        {rankNumber}
                      </a>
                    </Td>
                    <Td id="Name" width={'15rem'}>
                      <a
                        className="human-name link midFontSize"
                        href={formatLink(value.link)}
                      >
                        {personalInfo.name + ' ' + personalInfo.lastname}
                      </a>
                    </Td>
                    <Td id="Born" width={'10rem'}>
                      <span className="midFontSize">
                        {getTimeZoneFormatted(personalInfo.birth, 'UTC')}
                      </span>
                    </Td>
                    <Td id="Died" width={'10rem'}>
                      <span className="midFontSize">
                        {!personalInfo.is_dead
                          ? 'Living'
                          : personalInfo.date_of_death
                          ? getTimeZoneFormatted(
                              personalInfo.date_of_death,
                              'UTC'
                            )
                          : 'N/A'}
                      </span>
                    </Td>
                    <Td id="Years" width={'10rem'}>
                      <span className="midFontSize">
                        {value.time_components?.years ?? 'N/A'}
                      </span>
                    </Td>
                    <Td id="Days" width={'10rem'}>
                      <span className="midFontSize">
                        {value.time_components?.days ?? 'N/A'}
                      </span>
                    </Td>

                    <Td id="Gender" width={'10rem'}>
                      <span className="midFontSize">
                        {personalInfo.sex.name}
                      </span>
                    </Td>
                    <Td id="Birthplace" width={'8rem'}>
                      <span className="midFontSize">
                        {personalInfo.birth_place.country.name !== '' ? (
                          <>
                            <FlagComponent
                              countryCode={countryNameToCountryCode(
                                personalInfo.birth_place.country.name
                              )}
                            />
                            {' ' + personalInfo.birth_place.country.name}
                          </>
                        ) : (
                          'N/A'
                        )}
                      </span>
                    </Td>
                    <Td id="Deathplace" width={'8rem'}>
                      <span className="midFontSize">
                        {buildDeathplaceOrResidenceCell(value)}
                      </span>
                    </Td>
                    {!props.showValidationDate ? (
                      <Td id="Status" width={'10rem'}>
                        <span className="midFontSize">
                          {value.acf.sc_validated
                            ? 'Validated'
                            : 'Not Validated'}
                        </span>
                      </Td>
                    ) : (
                      <Td id="ValidationDate" width={'10rem'}>
                        <span className="midFontSize">
                          {getTimeZoneFormatted(
                            value.acf.validation_information.validation_date,
                            'UTC'
                          )}
                        </span>
                      </Td>
                    )}
                    {props.showDetails && (
                      <Td id="action-detail" width={'10rem'}>
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

  const renderGeographyEmpty = () => {
    return (
      <div className="emptyList">
        <img src="https://i.imgur.com/FlhqJ8X.png" alt="empty results" />
        <p>
          <strong>There aren't known Supercentenarians from this area.</strong>{' '}
          Do you know someone that's about to reach this impressive milestone?
          Submit your friend or loved one to our directory.
        </p>
        <a href="https://longeviquest.com/submit-claim/">Submit Claim</a>
      </div>
    );
  };

  const renderGeographyRequest = () => {
    return (
      <div className="emptyList">
        <img src="https://i.imgur.com/FlhqJ8X.png" alt="empty results" />
        <p>
          We rely on our users to identify and document supercentenarians,
          ensuring their legacy is known to the world. If you know someone that
          is 110+, let us know and we'll begin our validation process to add
          them to our database.
        </p>
        <a href="https://longeviquest.com/submit-claim/">Submit Claim</a>
      </div>
    );
  };

  const renderNormalEmpty = () => {
    return (
      <div className="emptyList">
        <img src="images/sc_placeholder.png" alt="empty results" />
        <p>
          <strong>There aren't Supercentenarians matching this criteria</strong>
        </p>
        <a href="/atlas/">Go back to Atlas</a>
      </div>
    );
  };

  const getEmptyView = () => {
    if (props.isLoaded && props.count === 0) {
      return props.isAboutGeography
        ? renderGeographyEmpty()
        : renderNormalEmpty();
    }
  };

  const renderTools = () => {
    if (hideCount) {
      return null;
    }
    return (
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
    );
  };

  return (
    <>
      {props.isLoaded && props.count === 0 ? (
        getEmptyView()
      ) : (
        <Flex
          className="QueryResultListWrapper"
          width={'100%'}
          minH={'33.5rem'}
          direction={'column'}
          overflowX={'hidden'}
          gap={1}
        >
          {renderTools()}
          {props.onPageChange && props.onLimitChange && (
            <Pagination
              currentPage={props.currentPage || 1}
              totalItems={props.count}
              itemsPerPage={props.itemsPerPage || 25}
              onPageChange={props.onPageChange}
              onLimitChange={props.onLimitChange}
            />
          )}
          <Box
            className="TableWrapper"
            height={props.panelInfo ?? 'calc(100vh - 200px)'}
            width={'100%'}
            marginBottom={10}
            overflowY={'auto'}
          >
            {renderQueryListResultsTable()}
            {props.isAboutGeography && renderGeographyRequest()}
          </Box>
          <Flex gap={'2rem'} width={'100%'}></Flex>
        </Flex>
      )}
    </>
  );
};
