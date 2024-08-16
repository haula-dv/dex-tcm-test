'use client';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomFormLabel = styled((props: any) => (
	<Typography variant="subtitle1" fontWeight={600} {...props} component="label" htmlFor={props.htmlFor} />
))(() => ({
	marginBottom: '6px',
}));

export default CustomFormLabel;
