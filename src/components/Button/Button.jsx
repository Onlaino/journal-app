import './button.css';
import {memo} from "react";

function Button({ children, onClick }) {
	console.log('button');
	return (
		<button className='button accent' onClick={onClick}>
			{children}
		</button>
	);
}

export default memo(Button);