import {useContext} from "react";
import {UserContext} from "../../context/user.context.jsx";
import cl from './SelectUser.module.css';


export const SelectUser = () => {
	const {userId, setUserId} = useContext(UserContext);
	const changeUser = (e) => {
		setUserId(Number(e.target.value));
		console.log(userId);
	}

	return (
		<select className={cl.select} value={userId} name={'user'} id={'user'} onChange={changeUser}>
			<option value="1">Vasya</option>
			<option value="2">Anton</option>
		</select>
	)
};

