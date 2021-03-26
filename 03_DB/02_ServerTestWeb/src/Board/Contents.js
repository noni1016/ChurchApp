import React, {useEffect, useState} from 'react' ;
import styled from 'styled-components';
import Content from './Content.js';


const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 0px;
    padding: 0px;
    display: table;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: grey;
    font-size: 15px;
    color: #626262;
    letter-spacing: -0.5px;
    line-height: 28px;
}
`;

const TableHead = styled.thead`
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    border-bottom: 1px solid #e5e5e5;
`;

const TableBody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
`;

const TableRow = styled.tr`
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
`;


var datas = [
    {num: 43, title: `캠린이를 위한 동계 안전캠핑 5대 수칙 소문내기 이벤트`, writer: `관리자`, date: `2021-01-08`, view: 1386},
    {num: 42, title: `일산화탄소 경보기 지원 이벤트 (11.5~11.18)(종료)`, writer: `관리자`, date: `2020-11-05	`, view: 1686},
    {num: 41, title: `2020년 등록야영장 지원사업(3차) 추진 계획 알림`, writer: `한국관광공사_어드민`, date: `2020-09-14`, view: 1424},
];



const Contents = () => {

    var [res, setRes] = useState([]);

    useEffect(() => {
        // fetch("https://jsonplaceholder.typicode.com/posts")
        // .then(res => res.json())
        // .then(json => setRes(json));
        
        // fetch('/noni')
        // .then(res => res.json())
        // .then(index => console.log(index[0]));

        fetch('/getBoard').then(res => res.json()).then(res => setRes(res));
    }, []);

    return (

        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일</th>
                        <th>조회</th>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res.map((data, i) => {
                        return (<Content rowData={data} key={data.num} />);
                    })}
                </TableBody>
            </Table>
            {/* {res.map((data, i) => {
                return <div>{data.title}</div>;
            })} */}
        </div>
        
    )

};

export default Contents;