import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { countryReference } from '../../../data/countries-data';

import './FilteringForm.scss';

interface Parameter {
  key: string;
  value: string | undefined;
}

interface FilteringFormProps {
  defaultFilters?: string[];
}

export const FilteringForm: FunctionComponent<FilteringFormProps> = props => {
  const getQueryParam = (key: string) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(key);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [age, setAge] = useState<string>('');
  const [validation, setValidation] = useState<string>('validated');
  const [gender, setGender] = useState<string>(
    props.defaultFilters?.includes('women')
      ? 'Female'
      : props.defaultFilters?.includes('men')
      ? 'Male'
      : ''
  );
  const [living, setLiving] = useState<string>(
    props.defaultFilters?.includes('living')
      ? 'living'
      : props.defaultFilters?.includes('deceased')
      ? 'deceased'
      : ''
  );
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [aliveAt, setAliveAt] = useState<string | undefined>('');
  const [validationDate, setValidationDate] = useState<string | undefined>('');
  const [countryOfDeath, setCountryOfDeath] = useState<string>('');
  const [countryOfBirth, setCountryOfBirth] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [name, setName] = useState<string | undefined>('');
  const [direction, setDirection] = useState<string>('');
  const [finalValidationDateValue, setFinalValidationDateValue] = useState<
    string | undefined
  >(getQueryParam('finalValidationDateValue')?.substring(0, 10));
  const [initialBirthDateValue, setInitialBirthDateValue] = useState<
    string | undefined
  >('');
  const [initialDeathDateValue, setInitialDeathDateValue] = useState<
    string | undefined
  >('');
  const [finalBirthDateValue, setFinalBirthDateValue] = useState<
    string | undefined
  >('');
  const [finalDeathDateValue, setFinalDeathDateValue] = useState<
    string | undefined
  >('');

  const updateQueryParams = (queryParams: Parameter[]) => {
    const searchParams = new URLSearchParams(location.search);
    const keysForDel: string[] = [];
    searchParams.forEach((_value, key) => {
      keysForDel.push(key);
    });
    keysForDel.forEach(key => {
      searchParams.delete(key);
    });
    queryParams.forEach(parameter => {
      if (parameter.value !== '') {
        searchParams.set(parameter.key, parameter.value ?? '');
      }
    });

    const newSearch = `?${searchParams.toString()}`;
    navigate(newSearch);
  };

  const dateView = (typeOfDate: 'birth' | 'death') => {
    return (
      <>
        <div></div>
        <Input
          defaultValue={
            typeOfDate === 'birth'
              ? getQueryParam('initialBirthDateValue')?.substring(0, 10)
              : typeOfDate === 'death'
              ? getQueryParam('initialDeathDateValue')?.substring(0, 10)
              : ''
          }
          onChange={event => {
            typeOfDate === 'birth'
              ? setInitialBirthDateValue(
                  event.target.valueAsDate?.toISOString() ?? undefined
                )
              : setInitialDeathDateValue(
                  event.target.valueAsDate?.toISOString() ?? undefined
                );
          }}
          size={'sm'}
          type={'date'}
        />
      </>
    );
  };

  const dateBetweenView = (typeOfDate: 'birth' | 'death') => {
    return (
      <>
        <div></div>
        <Input
          defaultValue={
            typeOfDate === 'birth'
              ? getQueryParam('initialBirthDateValue')?.substring(0, 10)
              : typeOfDate === 'death'
              ? getQueryParam('initialDeathDateValue')?.substring(0, 10)
              : undefined
          }
          onChange={event => {
            typeOfDate === 'birth'
              ? setInitialBirthDateValue(
                  event.target.valueAsDate?.toISOString() ?? undefined
                )
              : setInitialDeathDateValue(
                  event.target.valueAsDate?.toISOString() ?? undefined
                );
          }}
          size={'sm'}
          type={'date'}
        />
        <div></div>
        <Input
          defaultValue={
            typeOfDate === 'birth'
              ? getQueryParam('finalBirthDateValue')?.substring(0, 10)
              : typeOfDate === 'death'
              ? getQueryParam('finalDeathDateValue')?.substring(0, 10)
              : undefined
          }
          onChange={event => {
            typeOfDate === 'birth'
              ? setFinalBirthDateValue(
                  event.target.valueAsDate?.toISOString() ?? undefined
                )
              : setFinalDeathDateValue(
                  event.target.valueAsDate?.toISOString() ?? undefined
                );
          }}
          size={'sm'}
          type={'date'}
        />
      </>
    );
  };

  const handleFilterClick = () => {
    const parameters: Parameter[] = [
      { key: 'age', value: age },
      { key: 'validation', value: validation },
      { key: 'validationDate', value: validationDate },
      { key: 'finalValidationDateValue', value: finalValidationDateValue },
      { key: 'gender', value: gender },
      { key: 'living', value: living },
      { key: 'dateOfBirth', value: dateOfBirth },
      { key: 'aliveAt', value: aliveAt },
      { key: 'initialBirthDateValue', value: initialBirthDateValue },
      { key: 'finalBirthDateValue', value: finalBirthDateValue },
      { key: 'dateOfDeath', value: dateOfDeath },
      { key: 'initialDeathDateValue', value: initialDeathDateValue },
      { key: 'finalDeathDateValue', value: finalDeathDateValue },
      { key: 'countryOfDeath', value: countryOfDeath },
      { key: 'countryOfBirth', value: countryOfBirth },
      { key: 'orderBy', value: orderBy },
      { key: 'name', value: name },
      { key: 'direction', value: direction },
    ];

    updateQueryParams(parameters);
  };

  const handleClearClick = () => {
    navigate(location.pathname);
  };

  return (
    <>
      <Grid className="filter-container">
        {location.pathname === '/atlas/world' ? (
          <Box className="input">
            <Text size={'lg'}>Name</Text>
            <Input
              defaultValue={getQueryParam('name') ?? undefined}
              onChange={event => {
                setName(event.target.value ?? undefined);
              }}
              size={'sm'}
              type={'text'}
            />
          </Box>
        ) : (
          <></>
        )}

        <Box className="input">
          <Text size={'lg'}>Age</Text>
          <Select
            defaultValue={getQueryParam('age') ?? 'any'}
            size={'sm'}
            onChange={event => {
              setAge(event.currentTarget.value);
            }}
          >
            <option value={'any'}>Any</option>
            <option value={'110+'}>110+</option>
            <option value={'111+'}>111+</option>
            <option value={'112+'}>112+</option>
            <option value={'113+'}>113+</option>
            <option value={'114+'}>114+</option>
            <option value={'115+'}>115+</option>
          </Select>
        </Box>
        <Box className="input">
          <Text size={'lg'}>Validation Status</Text>
          <RadioGroup
            size={'sm'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            defaultValue={getQueryParam('validation') ?? 'validated'}
            isDisabled={
              props.defaultFilters?.includes('validated') ? true : false
            }
            onChange={value => {
              setValidation(value);
              if (value !== 'validated') {
                setValidationDate('');
                setFinalValidationDateValue('');
              }
            }}
          >
            <Radio value={'validated'}>Validated</Radio>
            <Radio value={'not-validated'}>Under Review</Radio>
          </RadioGroup>
        </Box>
        <Box className="input">
          <Text size={'lg'}>Gender</Text>
          <Select
            size={'sm'}
            isDisabled={
              props.defaultFilters?.includes('women')
                ? true
                : props.defaultFilters?.includes('men')
                ? true
                : false
            }
            defaultValue={
              props.defaultFilters?.includes('women')
                ? 'Female'
                : props.defaultFilters?.includes('men')
                ? 'Male'
                : getQueryParam('gender') ?? 'any'
            }
            onChange={event => {
              setGender(event.currentTarget.value);
            }}
          >
            <option value={'Any'}>Any</option>
            <option value={'Female'}>Female</option>
            <option value={'Male'}>Male</option>
          </Select>
        </Box>
        <Box className="input">
          <Text size={'lg'}>Validation Date</Text>
          <Input
            disabled={validation !== 'validated' ? true : false}
            defaultValue={
              getQueryParam('finalValidationDateValue')?.substring(0, 10) ??
              undefined
            }
            value={finalValidationDateValue?.substring(0, 10) ?? undefined}
            onChange={event => {
              setValidationDate('beforeOrEqual');
              setFinalValidationDateValue(
                event.target.valueAsDate?.toISOString() ?? undefined
              );
            }}
            size={'sm'}
            type={'date'}
          />
        </Box>
        <Box className="input">
          <Text size={'lg'}>Living Status</Text>
          <Select
            size={'sm'}
            isDisabled={
              props.defaultFilters?.includes('living')
                ? true
                : props.defaultFilters?.includes('deceased')
                ? true
                : false
            }
            defaultValue={
              props.defaultFilters?.includes('living')
                ? 'living'
                : props.defaultFilters?.includes('deceased')
                ? 'deceased'
                : getQueryParam('living') ?? 'any'
            }
            onChange={event => {
              setLiving(event.currentTarget.value);
            }}
          >
            <option value={'any'}>Any</option>
            <option value={'living'}>Living</option>
            <option value={'deceased'}>Deceased</option>
          </Select>
        </Box>
        <Box className="input">
          <Text size={'lg'}>Date of birth</Text>
          <Select
            size={'sm'}
            defaultValue={getQueryParam('dateOfBirth') ?? 'any'}
            onChange={event => {
              setDateOfBirth(event.currentTarget.value);
            }}
          >
            <option value={'any'}>Any</option>
            <option value={'on'}>On</option>
            <option value={'before'}>Before</option>
            <option value={'after'}>After</option>
            <option value={'between'}>Between</option>
          </Select>
          {dateOfBirth === 'on' ||
          dateOfBirth === 'before' ||
          dateOfBirth === 'after' ? (
            dateView('birth')
          ) : dateOfBirth === 'between' ? (
            dateBetweenView('birth')
          ) : (
            <></>
          )}
        </Box>
        <Box className="input">
          <Text size={'lg'}>Date of death</Text>
          <Select
            size={'sm'}
            defaultValue={getQueryParam('dateOfDeath') ?? 'any'}
            onChange={event => {
              setDateOfDeath(event.currentTarget.value);
            }}
          >
            <option key="any" value={'any'}>
              Any
            </option>
            <option key="on" value={'on'}>
              On
            </option>
            <option key="before" value={'before'}>
              Before
            </option>
            <option key="after" value={'after'}>
              After
            </option>
            <option key="between" value={'between'}>
              Between
            </option>
          </Select>
          {dateOfDeath === 'on' ||
          dateOfDeath === 'before' ||
          dateOfDeath === 'after' ? (
            dateView('death')
          ) : dateOfDeath === 'between' ? (
            dateBetweenView('death')
          ) : (
            <></>
          )}
        </Box>
        <Box className="input">
          <Text size={'lg'}>Alive at</Text>
          <Input
            defaultValue={
              getQueryParam('aliveAt')?.substring(0, 10) ?? undefined
            }
            onChange={event => {
              setAliveAt(event.target.valueAsDate?.toISOString() ?? undefined);
            }}
            size={'sm'}
            type={'date'}
          />
        </Box>
        <Box className="input">
          <Text size={'lg'}>Country of death</Text>
          <Select
            size={'sm'}
            defaultValue={getQueryParam('countryOfDeath') ?? 'any'}
            onChange={event => {
              setCountryOfDeath(event.currentTarget.value);
            }}
          >
            <option value={'any'}>Any</option>
            {countryReference.map(item => {
              return (
                <option key={item.alpha2} value={item.country}>
                  {item.country}
                </option>
              );
            })}
          </Select>
        </Box>
        <Box className="input">
          <Text size={'lg'}>Order by</Text>
          <Select
            size={'sm'}
            defaultValue={getQueryParam('orderBy') ?? 'age'}
            onChange={event => {
              setOrderBy(event.currentTarget.value);
            }}
          >
            <option key="age" value={'age'}>
              Age
            </option>
            <option key="date-of-birth" value={'date-of-birth'}>
              Date of birth
            </option>
            <option key="date-of-death" value={'date-of-death'}>
              Date of death
            </option>
            <option key="validation-date" value={'validation-date'}>
              Validation Date
            </option>
          </Select>
        </Box>
        <Box className="input">
          <Text size={'lg'}>Country of birth</Text>
          <Select
            size={'sm'}
            defaultValue={getQueryParam('countryOfBirth') ?? 'any'}
            onChange={event => {
              setCountryOfBirth(event.currentTarget.value);
            }}
          >
            <option value={'any'}>Any</option>
            {countryReference.map(item => {
              return (
                <option key={item.alpha2} value={item.country}>
                  {item.country}
                </option>
              );
            })}
          </Select>
        </Box>
        <Box className="input">
          <Text size={'lg'}>Direction</Text>
          <Select
            size={'sm'}
            defaultValue={getQueryParam('direction') ?? 'descending'}
            onChange={event => {
              setDirection(event.currentTarget.value);
            }}
          >
            <option value={'ascending'}>Ascending</option>
            <option value={'descending'}>Descending</option>
          </Select>
        </Box>
        <Box></Box>
        {location.pathname === '/atlas/world' ? <Box></Box> : <></>}
        <div>
          <Flex w={'100%'} justify={'end'}>
            <Box
              className="action-group"
              display={'flex'}
              justifyContent={'flex-end'}
              gap={'0.5rem'}
            >
              <Button
                colorScheme={'blue'}
                variant={'outline'}
                onClick={() => handleClearClick()}
              >
                Clear
              </Button>
              <Button colorScheme={'blue'} onClick={() => handleFilterClick()}>
                Filter
              </Button>
            </Box>
          </Flex>
        </div>
      </Grid>
    </>
  );
};
