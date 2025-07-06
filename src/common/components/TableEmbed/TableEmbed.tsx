import {
  Flex,
  Image,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { countryNameToCountryCode } from '../../Countries';
import { TablePlaceholder } from '../TablePlaceholder/TablePlaceholder';
import { Supercentenarian } from '../../../data/map-info';
import { FlagComponent } from '../FlagComponent/FlagComponent';
import { LocalImages } from '../../../assets/images';

interface TableEmbedProps {
  title: string;
  link: string;
  content: Supercentenarian[];
  isLoaded: boolean;
}

export const TableEmbed: FunctionComponent<TableEmbedProps> = props => {
  const [pageIndex, setPageIndex] = useState<string>('1');

  const fixRank = () => {
    if (pageIndex === '1') {
      return 1;
    } else {
      return 6;
    }
  };

  const renderEmbedCell = (value: Supercentenarian, index: number) => {
    const personalInfo = value.acf.personal_information;
    return (
      <Tr key={index}>
        <Td w={'8%'} id="Rank">
          <a className="circle" href={value.link}>
            {index + fixRank()}
          </a>
        </Td>
        <Td id="Name">
          <a
            className="human-name link midFontSize"
            href={value.link}
            rel="noreferrer"
            target="_blank"
          >
            <Flex gap={'0.5rem'} align={'center'}>
              <FlagComponent
                countryCode={countryNameToCountryCode(
                  personalInfo.nationality.name
                )}
              />
              {`${personalInfo.name} ${personalInfo.lastname} `}
            </Flex>
          </a>
        </Td>
        <Td w={'4%'} id="Years">
          <span className="midFontSize">{value.time_components?.years}</span>
        </Td>
        <Td id="Days" width={'5%'}>
          <span className="midFontSize">{value.time_components?.days}</span>
        </Td>
        <Td id="Status" width={'10%'}>
          <span className="midFontSize">
            {value.acf.sc_validated ? 'Validated' : 'Not Validated'}
          </span>
        </Td>
        <Td w={'3%'} textColor={'#ffffff'}></Td>
      </Tr>
    );
  };

  return (
    <Flex
      className="TableEmbed"
      width={'100%'}
      height={'100%'}
      flexDir={'column'}
    >
      <Flex flexDir={'column'} position={'sticky'} top={0}>
        <Flex
          bgColor={'#003058'}
          color={'white'}
          padding={'0.5rem 1rem'}
          justify={'space-between'}
          align={'center'}
          gap={'1rem'}
        >
          <Text fontSize={'xl'} fontWeight={'bold'}>
            {props.title}
          </Text>
          <Link
            display={'flex'}
            gap={'0.5rem'}
            fontSize={'md'}
            fontWeight={'semibold'}
            href={props.link}
            target="_blank"
          >
            See full list
            <Image
              borderRadius={'md'}
              w={'1.5rem'}
              src={LocalImages.LongeviQuestLogoNoBG}
              alt="LongeviQuest Logo"
            />
          </Link>
        </Flex>
        <TableContainer>
          <Table variant="striped" colorScheme={'gray'} size={'sm'}>
            <Thead bgColor={'#003058'}>
              <Tr>
                <Th w={'8%'} textColor={'#ffffff'}>
                  Rank
                </Th>
                <Th textColor={'#ffffff'}>Name</Th>
                <Th w={'4%'} textColor={'#ffffff'}>
                  Years
                </Th>
                <Th width={'5%'} textColor={'#ffffff'}>
                  Days
                </Th>
                <Th width={'10%'} textColor={'#ffffff'}>
                  Status
                </Th>
                <Th w={'3%'} textColor={'#ffffff'}></Th>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme={'gray'} size={'sm'}>
          <Tbody>
            {!props.isLoaded ? (
              <TablePlaceholder columns={1} rows={5} />
            ) : (
              <></>
            )}
            {pageIndex === '1' &&
              props.isLoaded &&
              props.content
                .slice(0, 5)
                .map((value, index) => renderEmbedCell(value, index))}
            {pageIndex === '2' &&
              props.isLoaded &&
              props.content
                .slice(5, 10)
                .map((value, index) => renderEmbedCell(value, index))}
          </Tbody>
        </Table>
      </TableContainer>
      {props.isLoaded && (
        <RadioGroup
          position={'absolute'}
          bottom={'30%'}
          right={0}
          defaultValue="1"
          onChange={setPageIndex}
          value={pageIndex}
        >
          <Stack justify={'center'}>
            <Radio bg={'InactiveBorder'} size={'lg'} value="1"></Radio>
            <Radio bg={'InactiveBorder'} size={'lg'} value="2"></Radio>
          </Stack>
        </RadioGroup>
      )}
    </Flex>
  );
};
