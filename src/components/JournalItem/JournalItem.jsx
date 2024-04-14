import './journalItem.css';

export const JournalItem = ({ title, date, text }) => {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);
	//new Intl.DateTimeFormat('ru-RU').format

	return (
		<>
			<h2 className="journal-item__header">{title}</h2>
			<h2 className="journal-item__body">
				<div className="journal_item__date">{formatedDate}</div>
				<div className="journal_item__text">{text}</div>
			</h2>
		</>
	);
};
