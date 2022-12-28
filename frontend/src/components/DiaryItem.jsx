import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import { Alert, Box, Snackbar } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { postDelete } from '../features/posts/postService';
/**
 * 
 * Change the sx to be a percentage for dynamic effect 
 * <Card sx={{ width: "50%" }}>
 */

/**
 * Instead of running all the static data, we need to pass in props into the DiaryItem
 * 
 */
function DiaryItem({title, description, image, location, date, id, user}) {
  const [open, setOpen] = useState(false)
  //check if the userId is the current user logged in 
  const isLoggedInUser = () => {
    if(localStorage.getItem("userId" === user)){
      return true
    }
    return false
  }
  //handle delete to delete the post
  const handleDelete = () => {
    postDelete(id).then(data=>console.log(data)).catch(err=> console.log(err))
  }
 
  return (
    <Card sx={{ 
        width: "50%", 
        height: "60%", 
        margin: 1, 
        padding:1, 
        display: "flex", 
        flexDirection:"column", 
        boxShadow:"5px 5px 10px #ccc" 
    }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          {<EditLocationAltIcon />}
        </IconButton>
      }
      title={location}
      header = {location}
      subheader={date }
    />
    {/**Bascially, if we are note passing in a static image, we need to change image="" to src="" */}
    <img
      height="194"
      src={image}
      alt={title}
    />
    <CardContent>
      <Typography paddingBottom={1} variant="h6" color="text.secondary">
        {title}
      </Typography>
      <hr />
      <Box paddingTop={1} display="flex">
        <Typography width="170px" fontWeight={"bold"} variant="caption">
            John Lim:
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </Box>
    </CardContent>
    { isLoggedInUser && <CardActions sx={{marginLeft: 'auto'}}>
        <IconButton LinkComponent={Link} to={`/post/${id}`} color='warning'>
            <ModeEditOutlineIcon />
        </IconButton>
        <IconButton onClick={handleDelete} color='error'>
            <DeleteForeverIcon />
        </IconButton>
    </CardActions>}
    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar>
  </Card>
  )
}

export default DiaryItem