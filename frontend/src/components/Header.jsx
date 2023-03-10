import React from 'react'
import {AppBar, Tab, Tabs, Toolbar} from "@mui/material"
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
/**
 * Toolbar gives a structure to how the AppBar looks like 
 * sx provides custom styling/color
 */
function Header() {
    //getting the updated state
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    //
    const loggedInLinks = ["home","diaries", "add", "profile"]
    const linksArr = ["home", "diaries", "auth"]
    const [value, setValue] = useState()
    return (
        <AppBar sx={{bgcolor: "transparent", position: "sticky"}}>
            <Toolbar>
                <ModeOfTravelIcon sx={{color: "black"}}/>
                <Tabs value={value} onChange={(e, val) => setValue(val)} sx={{ml: "auto", textDecoration: "none"}}>
                    { isLoggedIn ? 
                    loggedInLinks.map((link) => (
                        <Tab 
                            LinkComponent={Link}
                            to={`${link === "home" ? "/" : link}`}
                        sx={{textDecoration : "none", ":hover": {
                            textDecoration: "underline", 
                            textUnderlineOffset: "18px"
                        }}}key={link} label={link} />
                    ))
                    : linksArr.map((link) => (
                        <Tab 
                            LinkComponent={Link}
                            to={`${link === "home" ? "/" : link}`}
                        sx={{textDecoration : "none", ":hover": {
                            textDecoration: "underline", 
                            textUnderlineOffset: "18px"
                        }}}key={link} label={link} />
                    ))}
                </Tabs>
            </Toolbar>
        </AppBar>
  )
}

export default Header