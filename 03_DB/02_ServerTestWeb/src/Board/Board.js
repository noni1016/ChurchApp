import React, {useState, useEffect} from 'react' ;
import styled from 'styled-components';
import Contents from './Contents'
import {useForm} from 'react-hook-form';
import AddItem from './AddItem'

const Title = styled.div`
    position: relative;
    font-size: 20px;
    color: #000;
    padding-left: 29px;
    line-height: 27px;
    background: url("/images/Buttons/icon_h3.gif") no-repeat left 6px;
    margin: 40px 0 13px 0;
    letter-spacing: -0.08em;
    word-break: break-all;
`;

const TotalBar = styled.p`
    display: block;
    margin-bottom: 10px;
    text-align: right;
`;

const TotalItems = styled.span`
    background: url(/images/Buttons/total_icon.gif) no-repeat 0 7px;
    padding-left: 22px;
    display: inline-block;
    text-align:right;
    color: #626262;
    letter-spacing: -0.5px;
    font-size: 14px;
    line-height: 28px;
`;

const TotalPages = styled.span`
    background: url(/images/Buttons/line_h11.gif) no-repeat 0 9px;
    padding-left: 10px;
    margin-left: 10px;
    display: inline-block;
    text-align:right;
    color: #626262;
    letter-spacing: -0.5px;
    font-size: 14px;
    line-height: 28px;
`;




const Board = () => {

    var [data, setData] = useState([]);



    return (
        <div>
            <Title>공지사항</Title> 
            <TotalBar>
                <TotalItems>전체게시물 <strong>48</strong></TotalItems>
                <TotalPages>현재페이지 <strong>1/3</strong></TotalPages>
            </TotalBar>
            <Contents></Contents>

            <br/>
            <br/>

            <AddItem></AddItem>

            {/* {data !== null && console.log(data[0].id)} */}
            


		</div>
    );

};

export default Board;