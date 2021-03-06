import React, { useState } from 'react';
import { post } from 'axios';
import Dialog from'@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	hidden: {
			display: 'none'
	}
})

function MemberCreate(props) {
	const [info, setInfo] = useState({
			file: null,
			userName: '',
			birthday: '',
			gender: '',
			job: '',
			fileName: '',
			open: false
	});

	const { file, userName, birthday, gender, job, fileName } = info;

	const addMember = () => {
			const formData = new FormData();
			formData.append('image', info.file);
			formData.append('name', info.userName);
			formData.append('birthday', info.birthday);
			formData.append('gender', info.gender);
			formData.append('job', info.job);
			const config = {
					headers: {
							'content-type' : 'multipart/form-data'
					}
			}
			return post('./7-Project/addMember', formData, config);
	}

	const handleClickOpen = () => {
			setInfo({
					...info,
					open : true
			});
	}

	const handleFileChange = (e) => {
			setInfo({
					...info,
					file: e.target.files[0],
					fileName: e.target.value
			});
	}

	const handleValueChange = (e) => {
			const {name, value} = e.target;
			setInfo({
					...info,
					[name]: value
			});
	}

	const handleFormSubmit = (e) => {
			e.preventDefault();
			addMember()
			.then((response) => {
					console.log(response.data);
					props.stateRefresh();
			})
			.catch(err => console.log(err));
			setInfo({
					...info,
					file: null,
					userName: '',
					birthday: '',
					gender: '',
					job: '',
					fileName: '',
			});
	}

	const handleClose = () => {
			setInfo({
					...info,
					file: null,
					userName: '',
					birthday: '',
					gender: '',
					job: '',
					fileName: '',
					open: false
			});
	}

	const {classes} = props;
	return (
			<div>
					<Button variant="contained" color="primary" onClick={handleClickOpen}>
							?????? ??????
					</Button>
					<Dialog open={info.open} onClose={handleClose}>
							<DialogTitle>????????????</DialogTitle>
							<DialogContent>
									<input className={classes.hidden}
											id="raised-button-file" type="file" file={file} value={fileName||''}
											onChange={handleFileChange}/><br/>
									<label htmlFor="raised-button-file">
											<Button variant="contained" color="primary" component="span" name="file">
													{info.fileName === '' ? "????????? ????????? ??????" : info.fileName}
											</Button>
									</label><br/>
									<TextField label="??????" type="text" name="userName" value={userName||''} onChange={handleValueChange}/><br/>
									<TextField label="??????" type="text" name="birthday" value={birthday||''} onChange={handleValueChange}/><br/>
									<TextField label="??????" type="text" name="gender" value={gender||''} onChange={handleValueChange}/><br/>
									<TextField label="??????" type="text" name="job" value={job||''} onChange={handleValueChange}/><br/>
							</DialogContent>
							<DialogActions>
									<Button variant="contained" color="primary" onClick={handleFormSubmit}>??????</Button>
									<Button variant="outlined" color="primary" onClick={handleClose}>??????</Button>
							</DialogActions>
					</Dialog>
			</div>
	);
}

export default withStyles(styles)(MemberCreate);