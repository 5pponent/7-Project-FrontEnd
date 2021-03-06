import { Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SmallProfile from "../SmallProfile";
import { useState } from "react";

export default function CreateFeed(props) {

  const [scope, setScope] = useState('');
  const [content, setContent] = useState(props.feedContent);
  const handleChangeScope = (e) => {
    setScope(e.target.value);
    console.log(scope);
  }
  const handleContentChange = (e) => {
    setContent(e.target.value);
    props.getContent(content);
  }
  const closeDrawer = () => {
    props.getOpen(false);
  }

  return (
    <Stack sx={{ width: '500px' }}>
      <Grid container>
        <Grid item xs={10.5} p={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>피드 작성</Typography>
        </Grid>
        <Grid item xs={1.5} p={1.5}>
          <IconButton onClick={closeDrawer}><CloseIcon/></IconButton>
        </Grid>
      </Grid>
      <Divider/>
      <Grid container spacing={2} p={2}>
        <Grid item xs={3}>
          <SmallProfile name={props.name} image={props.image} direction='row' spacing={1} />
        </Grid>
        <Grid item xs={5.7}/>
        <Grid item xs={3.3}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-label">공개 범위</InputLabel>
            <Select labelId="select-label"
              value={scope} size="small" label="공개 범위" onChange={handleChangeScope}>
              <MenuItem value={1}>나만 보기</MenuItem>
              <MenuItem value={2}>친구 공개</MenuItem>
              <MenuItem value={3}>전체 공개</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth rows={10} multiline value={content} onChange={handleContentChange} />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' fullWidth>게시</Button>
        </Grid>
      </Grid>
    </Stack>
  );
}