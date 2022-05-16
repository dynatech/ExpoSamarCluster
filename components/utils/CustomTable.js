import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

const optionsPerPage = [10, 30, 50];

const CustomTable = (props) => {
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0])

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return(
        <DataTable>
            <DataTable.Header>
                {
                    props.titles && props.titles.map((title)=>(
                        <DataTable.Title>{title}</DataTable.Title>
                    ))
                }
            </DataTable.Header>
            {
                props.data && props.data.map((row)=> (
                    <DataTable.Row>
                        {/* <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                        <DataTable.Cell numeric>159</DataTable.Cell>
                        <DataTable.Cell numeric>6.0</DataTable.Cell> */}
                    </DataTable.Row>
                ))
            }
            <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={(page) => setPage(page)}
            label="1-2 of 6"
            optionsPerPage={optionsPerPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFastPagination
            optionsLabel={'Rows per page'}
            />
      </DataTable>
    )
}

export default CustomTable;