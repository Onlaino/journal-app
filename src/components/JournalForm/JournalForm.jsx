import cl from './JournalForm.module.css';

import Button from '../Button/Button';
import {useContext, useEffect, useReducer, useRef} from 'react';
import {INITIAL_STATE, formReducer} from './JournalFrom.state';
import {Input} from '../Input/Input';
import {UserContext} from '../../context/user.context.jsx';

export const JournalForm = ({removeItem, addNotes, data}) => {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const {isValid, isFormReadyToSubmit, values} = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const textRef = useRef();
    const {userId} = useContext(UserContext);

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        if (!data) {
            dispatchForm({type: 'CLEAR'});
            dispatchForm({type: 'SET_VALUE', payload: {userId}});
        }
        dispatchForm({type: 'SET_VALUE', payload: {...data}});
    }, [data]);
    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.text || !isValid.title) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({type: 'RESET_VALIDITY'});
            }, 1000);
        }
        return () => clearTimeout(timerId);
    }, [isValid]);
    useEffect(() => {
        if (isFormReadyToSubmit) {
            addNotes(values);
            dispatchForm({type: 'CLEAR'});
            dispatchForm({type: 'SET_VALUE', payload: {userId}});
        }
    }, [isFormReadyToSubmit, userId]);
    useEffect(() => {
        dispatchForm({type: 'SET_VALUE', payload: {userId}});
    }, [userId]);

    const addJournalItem = (evt) => {
        evt.preventDefault();
        dispatchForm({type: 'SUBMIT'});
    };

    const onChange = (e) => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: {[e.target.name]: e.target.value},
        });
    };

    const deleteJournalItem = () => {
        removeItem(data.id)
        dispatchForm({type: 'CLEAR'});
        dispatchForm({type: 'SET_VALUE', payload: {userId}});
    }
    return (
        <form className={cl['journal-form']} onSubmit={addJournalItem}>
            <div className={cl.title}>
                <Input
                    appereance={'title'}
                    isValid={isValid.title}
                    ref={titleRef}
                    onChange={onChange}
                    value={values.title}
                    type='title'
                    name='title'
                />
                {data?.id ? <button className={cl.delete} type={"button"} onClick={deleteJournalItem}>
                    <img onClick={removeItem} src={'/cartIcon.svg'} alt={'button удаления'}/>
                </button>: null}
            </div>
            <div className={cl.formRow}>
                <label htmlFor='date' className={cl.formLabel}>
                    <img src='/calendar.svg' alt='Дата'/>
                    <span>Дата</span>
                </label>
                <Input
                    isValid={isValid.date}
                    ref={dateRef}
                    value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
                    onChange={onChange}
                    id='date'
                    type='date'
                    name='date'
                />
            </div>

            <div className={cl.formRow}>
                <label htmlFor='tag' className={cl.formLabel}>
                    <img src='/folder.svg' alt='Иконка папки'/>
                    <span>Метки</span>
                </label>
                <Input
                    ref={textRef}
                    value={values.tag}
                    onChange={onChange}
                    type='text'
                    name='tag'
                    id='tag'
                />
            </div>
            <textarea
                value={values.text}
                onChange={onChange}
                name='text'
                id=''
                cols='30'
                rows='10'
            ></textarea>
            <Button>Save</Button>
        </form>
    );
};
