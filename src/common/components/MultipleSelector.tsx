import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  OtherProps,
  FormLabel,
  Stack,
  Text,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import dropDownIcon from "../../assets/drop-down-arrow.svg";
import { useOutsideNotifier } from "../hooks/use-outside-notifier";

interface SelectorProps {
  style?: CSSProperties;
  title?: string;
  options: OptionProps[];
  withSearch?: boolean;
  onSelect?: (selectedValues: OptionProps[]) => void;
}

export interface OptionProps {
  id: number;
  text: string;
  value: string;
  isSelected?: boolean;
  hideElement?: boolean;
}

export const MultipleSelector: FunctionComponent<SelectorProps> = (props) => {
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const selectorContent = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<OptionProps[]>(props.options);
  const [selectedValueCount, setSelectedValueCount] = useState<number>();
  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);
  useOutsideNotifier(selectorContent, () => setOptionsVisible(false));

  const getSelectionText = () => {
    if (!selectedValueCount) {
      return "Select";
    } else if (selectedValueCount === 1) {
      const selected = props.options.filter((x) => x.isSelected === true);
      return selected[0]?.text;
    } else {
      return `Selected(${selectedValueCount})`;
    }
  };

  const handelSearch = () => {
    const value = searchInput.current?.value ?? "";
    let tempOptions = [];
    if (value === "") {
      tempOptions = options?.map((x) => {
        return { ...x, hideElement: false };
      });
      setOptions(tempOptions);
      return;
    }

    tempOptions = options.map((x) => {
      if (!x.text.toLowerCase().includes(value.toLowerCase())) {
        x.hideElement = true;
      } else {
        x.hideElement = false;
      }
      return x;
    });

    setOptions(tempOptions);
  };

  return (
    <Box style={props.style ?? {}} maxH={3} className="SelectorWrapper">
      <FormLabel fontWeight={"bold"}>{props.title}</FormLabel>
      <Flex
        className="SelectorOptionsWrapper"
        borderRadius="0.3125rem"
        background="#F0F4F7"
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={5}
        cursor={"pointer"}
        onClick={() => {
          setOptionsVisible(!!!optionsVisible);
        }}
      >
        <Text fontFamily="Inter" fontSize="1rem" color="#787A7B">
          {getSelectionText()}
        </Text>
        <Image src={dropDownIcon} width={4} alt="Dropdown Icon" />
      </Flex>
      {optionsVisible && (
        <Flex
          zIndex={"9999"}
          className="SelectorContent"
          ref={selectorContent}
          direction={"column"}
          gap={2}
          bg={"#f0f4f7"}
          borderRadius="0.3125rem"
          maxH={"20rem"}
          padding={3}
          position={"relative"}
        >
          <InputGroup size="lg" maxWidth="100%">
            <Input
              width={"100%"}
              ref={searchInput}
              placeholder="Search"
              size="lg"
              bg="white"
              onChange={(e) => {
                handelSearch();
              }}
            />
          </InputGroup>
          <Stack
            maxH={"15rem"}
            className="CheckBoxesWrapper"
            spacing={3}
            overflowY={"auto"}
            direction="column"
          >
            {options.map((x, itemIndex) => {
              if (!x.hideElement)
                return (
                  <Checkbox
                    key={x.id.toString()}
                    isChecked={x.isSelected}
                    borderColor="gray"
                    id={x.id.toString()}
                    value={x.value}
                    onChange={(e) => {
                      const optionsCopy = [...options];
                      optionsCopy[itemIndex].isSelected =
                        e.currentTarget.checked;
                      setOptions(optionsCopy);
                      setSelectedValueCount(
                        optionsCopy.filter((x) => x.isSelected === true).length
                      );
                    }}
                  >
                    {x?.text}
                  </Checkbox>
                );
            })}
          </Stack>
          <Flex direction={"row"} marginTop={2} gap={2} justifyContent={"end"}>
            <Button
              bg="white"
              _hover={{ bg: "#c2c2c2" }}
              color={"#003058"}
              onClick={() => {
                const optionsCopy = options.map((x) => {
                  return { ...x, isSelected: false, hideElement: false };
                });
                setOptions(optionsCopy);
                setSelectedValueCount(
                  optionsCopy.filter((x) => x.isSelected === true).length
                );
              }}
            >
              Reset
            </Button>
            <Button
              bg="#003058"
              _hover={{ bg: "#145477" }}
              color={"#ffff"}
              onClick={() => {
                props.onSelect?.(options.filter((x) => x.isSelected === true));
                setOptionsVisible(!!!optionsVisible);
              }}
            >
              Apply
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
