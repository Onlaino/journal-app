import cl from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';

export const Input = forwardRef(function Input(
	{ className, isValid = true, appereance, ...props },
	ref
) {
	return (
		<input
			{...props}
			ref={ref}
			className={cn(className, cl['input'], {
				[cl['invalid']]: !isValid,
				[cl['input-title']]: appereance === 'title',
			})}
		/>
	);
});
