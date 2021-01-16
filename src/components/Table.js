import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
const { SearchBar } = Search

function Table() {
    const [profiles, setProfiles] = useState([])

    const getProfile = async () => {
        try {
            const result = await axios.get('http://api.enye.tech/v1/challenge/records')
            console.log(result.data)
            setProfiles(result.data.records.profiles)
        }
        catch (e) {
            console.log(e)
        }
    }

    const headerSortingStyle = { backgroundColor: "#e3edf8" };
    const columns = [
        { 
            dataField: 'MacAddress', 
            text: 'MAC Address',
            sort: true,
            headerSortingStyle
        },
        { 
            dataField: 'FirstName', 
            text: 'First Name' ,
            sort: true,
            headerSortingStyle
        },
        { 
            dataField: 'LastName', 
            text: 'Last Name',
            sort: true,
            headerSortingStyle
        },
        { 
            dataField: 'Gender', 
            text: 'Gender',
            sort: true,
            headerSortingStyle,
        },
        { 
            dataField: 'PhoneNumber', 
            text: 'Phone Number',
            sort: true,
            headerSortingStyle
        },
        { 
            dataField: 'CreditCardNumber', 
            text: 'Credit Card Number',
            sort: true,
            headerSortingStyle
        },
        { 
            dataField: 'CreditCardType', 
            text: 'Credit Card Type',
            sort: true,
            headerSortingStyle
        },
        { 
            dataField: 'PaymentMethod', 
            text: 'Payment Method',
            sort: true,
            headerSortingStyle
        }

    ]

    const defaultSorted = [{
        dataField: 'MacAddress',
        order: 'asc'
    }]

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div>
            <PaginationProvider
                pagination={ paginationFactory({
                    custom: true,
                    totalSize: profiles.length,
                    page: 1,
                    sizePerPage: 20,
                })}
                keyField='MacAddress'
                columns={columns}
                data={profiles}
            >
                {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                    keyField='MacAddress'
                    columns={columns}
                    data={profiles}
                    search
                    >
                        {toolkitprops => (
                            <div>
                                <SearchBar {...toolkitprops.searchProps} />
                                <BootstrapTable
                                    {...toolkitprops.baseProps}
                                    {...paginationTableProps}
                                    defaultSorted={defaultSorted}
                                    defaultSortDirection="asc"
                                    hover
                                    condensed
                                    noDataIndication="No Data Is Available"
                                />
                                <PaginationListStandalone {...paginationProps} />
                            </div>
                        )}
                    </ToolkitProvider>
                )}
            </PaginationProvider>
        </div>
    )
}

export default Table
