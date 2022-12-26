import React from 'react'
import DiaryItem from '../components/DiaryItem'
import { Box } from '@mui/material'

function Dairies() {
  /**
   * Use flexbox to align the items
   * 
   * This is to map and loop through 5 diary item
   * {[1,2,3,4,5].map((item) => <DiaryItem key={item} /> )} need to have key because of react stuff
   */
  return (
    <Box 
      display="flex" 
      flexDirection={'column'} 
      padding ={3} 
      justifyContent="center" 
      alignItems={"center"}
    > {[1,2,3,4,5].map((item) => <DiaryItem key={item}/> )}
      <DiaryItem />
    </Box>
  )
}

export default Dairies