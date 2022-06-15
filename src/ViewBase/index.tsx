import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Header from "../Header"
const ViewBaseRoot = styled('div')({
    background: "center center url('/assets/back6.jpg') no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column'
});
const MainContent  = styled("div")({
    flexGrow: 1,
    paddingLeft: "10%",
    paddingRight: "10%"
});

export default () => {
    React.useEffect(() => {
        console.log("===== effectin viewbase");
        document.body.style.overflowY = "scroll";
    }, [])
    return (
        <ViewBaseRoot>
            <Header />
            <MainContent>
                <Outlet/>
            </MainContent>
        </ViewBaseRoot>);
};

