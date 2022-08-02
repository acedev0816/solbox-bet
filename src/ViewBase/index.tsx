import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Header from "../Header"
const ViewBaseRoot = styled('div')({
    background: "radial-gradient(circle, rgba(228,228,25,1) 0%, rgba(240,35,77,1) 99%)",
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

