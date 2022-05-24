import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React from 'react'
import { HiChevronRight } from 'react-icons/hi'

export const ProductBreadcrumb = (props) => {
  const { data } = props
  return (
    <Breadcrumb
      fontSize="sm"
      fontWeight="medium"
      color={mode('gray.600', 'gray.400')}
      separator={<Box as={HiChevronRight} color={mode('gray.400', 'gray.600')} />}
    >
      {data.map((breadcrumb, index) => (
        <BreadcrumbItem key={breadcrumb.slug} isCurrentPage={index === data.length - 1}>
          <BreadcrumbLink href={breadcrumb.slug}>{breadcrumb.label}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
