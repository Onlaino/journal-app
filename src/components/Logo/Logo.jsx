import cl from './Logo.module.css';
import {memo} from "react";

function Logo({ image }) {
	console.log('logo');
	return <img className={cl.logo} src={image} alt={image} />;
}

export default memo(Logo);
