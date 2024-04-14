import './CardButton.css';


export const CardButton = ({ children, className, ...props }) => {
	const cl = 'card-button' + (className ? ' ' + className : '')
	return <button {...props} className={cl}>{children}</button>;
};
