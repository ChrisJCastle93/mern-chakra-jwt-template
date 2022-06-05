import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/react";
import React from "react";

export const PriceRangePicker = (props) => {
  const { updatePriceFilter } = props;
  let defaultValueArr = [props.minPriceFilter, props.maxPriceFilter];

  return (
    <>
      {props.minPriceFilterInitialValue !== undefined ? (
        <RangeSlider 
          key={props.maxPriceFilter-props.minPriceFilter}
          defaultValue={defaultValueArr}
          // defaultValue={[props.minPriceFilter, props.maxPriceFilter]}
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-label={["min", "max"]}
          min={props.minPriceFilterInitialValue}
          max={props.maxPriceFilterInitialValue}
          colorScheme="teal"
          onChangeEnd={(e) => {
            updatePriceFilter("min", e[0]);
            updatePriceFilter("max", e[1]);
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      ) : (
        <p> NO VALUES</p>
      )}
    </>
  );
};
