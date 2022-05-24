import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/react";
import React from "react";

export const PriceRangePicker = (props) => {
  const value = props.defaultValue || props.value;
  return (
    <RangeSlider defaultValue={[props.minPriceFilter, props.maxPriceFilter]} min={props.minPriceFilter} max={props.maxPriceFilter} onChange={(e) => console.log(e)} colorScheme="blue" step={10} aria-label={["minimum price", "maximux price"]}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} w="5" h="5" borderWidth="1px" borderColor="gray.200" />
      <RangeSliderThumb index={1} w="5" h="5" borderWidth="1px" borderColor="gray.200" />
    </RangeSlider>
  );
};
