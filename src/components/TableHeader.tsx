import React from 'react'
import { Table, Thead,  Tr, Th, TableContainer } from '@chakra-ui/react'

type Props = {
    title: string,
    secondTableHeading: string,
    thirdTableHeading: string,
    fourthTableHeading: string,
    fiveTableHeading: string,
    children: JSX.Element[]
    buttonTitle: string
}

const TableHeader: React.FC<Props> = ({ 
    title,
    secondTableHeading,
    thirdTableHeading,
    fourthTableHeading,
    fiveTableHeading,
    children,
    buttonTitle
}) => {
    
    return (
        <TableContainer width="90%">
            <Table variant='simple' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>S.no</Th>
                        <Th>{title}</Th>
                        <Th isNumeric>{secondTableHeading}</Th>
                        <Th isNumeric>{thirdTableHeading}</Th>
                        <Th>{fourthTableHeading}</Th>
                        <Th>{fiveTableHeading}</Th>
                        <Th>{buttonTitle}</Th>
                    </Tr>
                </Thead>
                {children}
            </Table>
        </TableContainer>
    )
}

export default TableHeader
