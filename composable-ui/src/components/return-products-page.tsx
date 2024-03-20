import { FormatNumberOptions, useIntl } from 'react-intl'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import { Customer } from './pos/customer'
import { OrdersList } from './pos/orders-list'
import { useOrder } from 'hooks/use-order'
import { useState } from 'react'
import { OrderItemList } from './pos/order-item-list'
import dayjs from 'dayjs'

export const ReturnProductsPage = () => {
  const [orderId, setOrderId] = useState<string | null>()
  const { order, status: orderFetchStatus } = useOrder(orderId)
  return (
    <Container maxW="container.2xl" py={{ base: '4', md: '8' }}>
      <Grid templateColumns="repeat(2, 1fr)" gap={'md'}>
        <GridItem w="100%">
          <Customer />
          <Text
            textStyle={{ base: 'Mobile/L', md: 'Desktop/L' }}
            color={'shading.700'}
          >
            Orders
          </Text>
          <OrdersList onClick={(orderId) => setOrderId(orderId)} />
        </GridItem>
        <GridItem>
          <Text
            textStyle={{ base: 'Mobile/L', md: 'Desktop/L' }}
            color={'shading.700'}
          >
            Products
          </Text>

          {order && orderFetchStatus === 'success' && (
            <>
              <TableContainer maxWidth={400}>
                <Table size={'sm'}>
                  <Tbody>
                    <Tr>
                      <Td>Created at</Td>
                      <Td>
                        {dayjs(order.created_at).format('YYYY-MM-DD HH:MM')}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Status</Td>
                      <Td color={order.status === 'PAID' ? 'green' : 'gold'}>
                        {order.status}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Order id</Td>
                      <Td>{order.id}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <OrderItemList order={order} />
            </>
          )}
        </GridItem>
      </Grid>
    </Container>
  )
}
