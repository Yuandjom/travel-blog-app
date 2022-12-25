import React from 'react'
import {AppBar, Tab, Tabs, Toolbar} from "@mui/material"
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { useState } from 'react';
/**
 * Toolbar gives a structure to how the AppBar looks like 
 * sx provides custom styling/color
 * 
 */
function Header() {
    const linksArr = ["Home", "Diaries", "Auth"]
    const [value, setValue] = useState()
    return (
        <AppBar sx={{bgcolor: "transparent"}}>
            <Toolbar>
                <ModeOfTravelIcon sx={{color: "black"}}/>
                <Tabs value={value} onChange={(e, val) => setValue(val)} sx={{ml: "auto", textDecoration: "none"}}>
                    {linksArr.map((link) => (
                        <Tab sx={{textDecoration : "none", ":hover": {
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