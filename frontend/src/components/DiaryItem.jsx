import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import { Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
/**
 * 
 * Change the sx to be a percentage for dynamic effect 
 * <Card sx={{ width: "50%" }}>
 */

/**
 * Instead of running all the static data, we need to pass in props into the DiaryItem
 * 
 */
function DiaryItem({title, description, image, location, date, id}) {
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
    <CardActions sx={{marginLeft: 'auto'}}>
        <IconButton color='warning'>
            <ModeEditOutlineIcon />
        </IconButton>
        <IconButton color='error'>
            <DeleteForeverIcon />
        </IconButton>
    </CardActions>
  </Card>
  )
}

export default DiaryItem