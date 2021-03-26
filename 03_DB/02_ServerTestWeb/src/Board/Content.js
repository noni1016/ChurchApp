import React from 'react' ;
import styled from 'styled-components';

const TableRow = styled.tr`
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
`;

const TableData = styled.td`
    padding: 27px 15px;
    line-height: 18px;
    font-weight: normal;
    color: #777;
    border-bottom: 1px solid #e5e5e5;
    letter-spacing: -0.05em;
    display: table-cell;
    vertical-align: inherit;
    text-align: center;
`;

const TableDataTitle = styled.td`
    text-align: left;
`;

const Content = ({rowData, key}) => {

    return (
        <TableRow>
            <TableData>{rowData.num}</TableData>
            <TableData><TableDataTitle>{rowData.title}</TableDataTitle></TableData>
            <TableData>{rowData.writer}</TableData>
            <TableData>{rowData.date.substr(0,10)}</TableData>
            <TableData>{rowData.view}</TableData>
        </TableRow>
        // <TableRow>
        //     <TableData>43</TableData>
        //     <TableData><TableDataTitle>캠린이를 위한 동계 안전캠핑 5대수픽 소문내기 이벤트</TableDataTitle></TableData>
        //     <TableData>관리자</TableData>
        //     <TableData>2021-01-08</TableData>
        //     <TableData>1374</TableData>
        // </TableRow>
    )
}

export default Content;