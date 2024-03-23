import React from 'react'
import { Tbody, Tr, Td } from '@chakra-ui/react'

type Props = {
    sno: number,
    price: string | number,
    quantity: string | number,
    createdby: string,
    createdon: string | number,
    productTitle: string,
    button: JSX.Element,
    background: string
}

const TableBody: React.FC<Props> = ({
    sno,
    price,
    quantity,
    createdby,
    createdon,
    productTitle,
    button,
    background
}) => {
    return (
        <>
            <Tbody>
                <Tr background={background}>
                    <Td>{sno}</Td>
                    <Td>{productTitle}</Td>
                    <Td isNumeric>{price}</Td>
                    <Td isNumeric>{quantity}</Td>
                    <Td>{createdby}</Td>
                    <Td>{createdon}</Td>
                    <Td>{button}</Td>
                </Tr>
            </Tbody>
            
        </>
    )
}

export default TableBody
