import { FormControl, FormLabel, HStack, useRadioGroup } from '@chakra-ui/react'
import * as React from 'react'
import { SizePickerButton } from './SizePickerButton'

export const SizePicker = (props) => {
  const { options, rootProps, hideLabel, label, ...rest } = props
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest)
  const selectedOption = options.find((option) => option.value == value)
  return (
    <FormControl {...rootProps}>
      {!hideLabel && (
        <FormLabel fontSize="sm" fontWeight="medium">
          {label ?? `Size: ${selectedOption?.label}`}
        </FormLabel>
      )}
      <HStack {...getRootProps()}>
        {options.map((option) => (
          <SizePickerButton
            key={option.value}
            label={option.label}
            {...getRadioProps({
              value: option.value,
            })}
          />
        ))}
      </HStack>
    </FormControl>
  )
}
