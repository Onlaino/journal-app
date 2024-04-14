import { CardButton } from '../CardButton/CardButton';
import './JounalAddButton.css';

export const JounalAddButton = ({clearForm}) => {
	return (
		<CardButton onClick={clearForm} className='journal-add'>
			<img src='/plus.svg' alt='plus воспоминание' />
			Новое воспоминание
		</CardButton>
	);
};
