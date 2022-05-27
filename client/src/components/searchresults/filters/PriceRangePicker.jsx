import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/react";
import React from "react";

export const PriceRangePicker = (props) => {

  return (
    <>
      {props.minPriceFilterInitialValue ? (
        <RangeSlider
          defaultValue={[props.minPriceFilterInitialValue, props.maxPriceFilterInitialValue]}
          min={props.minPriceFilterInitialValue}
          max={props.maxPriceFilterInitialValue}
          onChangeEnd={(e) => {
            props.updatePriceFilter("min", e[0]);
            props.updatePriceFilter("max", e[1]);
          }}
          colorScheme="teal"
          step={10}
          aria-label={["minimum price", "maximux price"]}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} w="5" h="5" borderWidth="1px" borderColor="gray.200" />
          <RangeSliderThumb index={1} w="5" h="5" borderWidth="1px" borderColor="gray.200" />
        </RangeSlider>
      ) : (
        <></>
      )}
    </>
  );
};
