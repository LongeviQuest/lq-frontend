import { format } from "date-fns";
import {
  Box,
  Image,
  FormLabel,
  Flex,
  InputGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dropDownIcon from "../../../assets/drop-down-arrow.svg";
import calendarIcon from "../../../assets/calendar.svg";

import "./DateRangePicker.scss";
import { useOutsideNotifier } from "../../hooks/use-outside-notifier";

export interface DateRangePickerProps {
  isDeath?: boolean;
  title?: string;
  date: Range;
  onChange: (range: Range) => void;
  style?: CSSProperties;
}

export interface Range {
  startDate?: Date;
  endDate?: Date;
  key?: string;
}

export const DateRangePicker: FunctionComponent<DateRangePickerProps> = (
  props
) => {
  const yearsToBeSupercentenarian = 100;
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [startYear, setStartYear] = useState<number | undefined>(undefined);
  const [endYear, setEndYear] = useState<number | undefined>(undefined);

  const handlePickerVisibility = () => {
    setIsPickerVisible(!isPickerVisible);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideNotifier(wrapperRef, () => setIsPickerVisible(false));

  const getHeader = () => {
    return (
      <div
        className={`Preview ${isPickerVisible ? "" : "Closed"}`}
        onClick={() => handlePickerVisibility()}
      >
        <div
          className="CalendarIcon"
          onClick={() => handlePickerVisibility()}
          style={{ backgroundImage: `url("${calendarIcon}")` }}
        />
        <div
          className={`DateRangeLabel ${
            props.date.startDate === undefined ? "default" : ""
          }`}
          onClick={() => handlePickerVisibility()}
        >
          {startYear === undefined && endYear === undefined
            ? "Select Date"
            : `${startYear ?? ""} - ${endYear ?? ""}`}
        </div>
        <Image
          width={"1rem"}
          className="ShowRangePickerButton"
          alt="drop"
          src={dropDownIcon}
          onClick={() => handlePickerVisibility()}
        />
      </div>
    );
  };

  const resetYears = () => {
    if (startYear) resetYearElementColor(startYear);
    if (endYear) resetYearElementColor(endYear);
    setStartYear(undefined);
    setEndYear(undefined);
  };

  const handleApply = () => {
    const range: Range = {
      startDate: startYear ? new Date(startYear, 0) : undefined,
      endDate: endYear ? new Date(endYear, 0) : undefined,
    };
    props.onChange(range);
  };

  const getContent = () => {
    return (
      <Flex className="DateRange" direction={"column"}>
        <Flex paddingEnd={2} paddingStart={2}>
          <InputGroup size="lg" gap={3} maxWidth="100%">
            <Flex direction={"column"}>
              <>Start date</>
              <NumberInput
                value={startYear}
                onChange={(value) => {
                  setStartYear(+value);
                }}
                bg={"white"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex direction={"column"}>
              <>End date</>
              <NumberInput
                onChange={(value) => {
                  setEndYear(+value);
                }}
                value={endYear}
                bg={"white"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </InputGroup>
        </Flex>
        {getYearSelectors()}
        <Flex
          direction={"row"}
          marginTop={2}
          marginBottom={2}
          marginEnd={2}
          gap={2}
          justifyContent={"end"}
        >
          <Button
            bg="white"
            _hover={{ bg: "#c2c2c2" }}
            color={"#003058"}
            onClick={() => {
              resetYears();
            }}
          >
            Reset
          </Button>
          <Button
            bg="#003058"
            _hover={{ bg: "#145477" }}
            color={"#ffff"}
            onClick={() => {
              handleApply();
              handlePickerVisibility();
            }}
          >
            Apply
          </Button>
        </Flex>
      </Flex>
    );
  };
  const getYearSelectors = () => {
    return (
      <Flex
        direction={"row"}
        marginTop={2}
        marginStart={2}
        gap={1}
        wrap={"wrap"}
        position={"relative"}
        height={"100%"}
        overflowY={"auto"}
      >
        {getYears()}
      </Flex>
    );
  };

  const resetYearElementColor = (year: number) => {
    const oldElement = document.getElementById(`year${year}`);
    if (oldElement) {
      oldElement.style.backgroundColor = "#f0f4f7";
    }
  };

  const setStartYearColor = (year: number) => {
    if (startYear) {
      resetYearElementColor(startYear);
    }
    const element = document.getElementById(`year${year}`);
    if (element) {
      element.style.backgroundColor = "#43bbab";
    }
  };

  const setEndYearColor = (year: number) => {
    if (endYear) {
      resetYearElementColor(endYear);
    }
    const element = document.getElementById(`year${year}`);
    if (element) {
      element.style.backgroundColor = "#43bbab";
    }
  };

  const handleYearSelection = (year: number) => {
    if (!startYear || endYear || year < startYear) {
      setStartYearColor(year);
      setStartYear(year);
      setEndYear(undefined);
      setEndYearColor(year);
      return;
    }
    setEndYear(year);
    setEndYearColor(year);
  };

  const getYears = () => {
    const _startYear = 1750;
    const _endYear = props.isDeath
      ? new Date().getFullYear()
      : new Date().getFullYear() - yearsToBeSupercentenarian;

    let result = [];

    for (let year = _startYear; year <= _endYear; year++) {
      result.push(
        <Box
          id={`year${year}`}
          textAlign={"center"}
          width={45}
          borderRadius={20}
          background={
            year === startYear || year === endYear ? "#43bbab" : "#f0f4f7"
          }
          _hover={{ background: "#43bbab" }}
          onClick={() => {
            handleYearSelection(year);
          }}
        >
          {year}
        </Box>
      );
    }

    return result;
  };

  return (
    <Box style={props.style ?? {}} maxH={3} className="SelectorWrapper">
      <FormLabel fontWeight={"bold"}>{props.title}</FormLabel>
      <div ref={wrapperRef} className="RepDateRangePicker">
        {getHeader()}
        {isPickerVisible && getContent()}
      </div>
    </Box>
  );
};
