'use client';
import { InputBase } from '@mui/material';
import { memo } from 'react';

interface IProps {
	value: any;
	handleChange: any;
}
const Field = ({ handleChange, value }: IProps) => {
	return <InputBase value={value} onChange={(e) => handleChange(e.target.value)} />;
};

export default memo(Field);
