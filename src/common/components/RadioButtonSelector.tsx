import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Radio,
  Stack,
  FormLabel,
  Text,
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
  options: optionProps[];
  onSelect?: (selectedValues: optionProps | undefined) => void;
}

export interface optionProps {
  id: number;
  text: string;
  value: string;
  isSelected?: boolean;
}

export const RadioButtonSelector: FunctionComponent<SelectorProps> = (
  props
) => {
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const selectorContent = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<optionProps[]>(props.options);
  const [selectedOption, setSelectedOption] = useState<
    optionProps | undefined
  >();

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);
  useOutsideNotifier(selectorContent, () => setOptionsVisible(false));
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
          {selectedOption ? selectedOption?.text : "Select"}
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
          <Stack
            maxH={"15rem"}
            className="CheckBoxesWrapper"
            spacing={3}
            overflowY={"auto"}
            direction="column"
          >
            {options.map((x) => {
              return (
                <Radio
                  isChecked={x.isSelected}
                  borderColor="gray"
                  id={x.id.toString()}
                  value={x.value}
                  onChange={(e) => {
                    const optionsCopy = [...options];
                    optionsCopy.map((x) => (x.isSelected = false));
                    const indexToUpdate = optionsCopy.findIndex(
                      (x) => x.id === +e.currentTarget.id
                    );
                    optionsCopy[indexToUpdate].isSelected =
                      e.currentTarget.checked;

                    setOptions(optionsCopy);
                  }}
                >
                  {x?.text}
                </Radio>
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
                  return { ...x, isSelected: false };
                });
                setOptions(optionsCopy);
                setSelectedOption(
                  optionsCopy.find((x) => x.isSelected === true)
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
                props.onSelect?.(
                  props.options.find((x) => x.isSelected === true)
                );
                setSelectedOption(options.find((x) => x.isSelected === true));
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
