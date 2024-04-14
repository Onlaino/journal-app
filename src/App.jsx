import './App.css';

import {v4 as uuidv4} from 'uuid';

import {Header} from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import {JounalAddButton} from './components/JouralAddButton/JounalAddButton';
import {Body} from './layout/Body/Body';
import {LeftPanel} from './layout/LeftPanel/LeftPanel';
import {JournalForm} from './components/JournalForm/JournalForm';

import {useLocalStorage} from './hooks/useLocalStorage';
import {UserContextProvider} from './context/user.context';
import {useState} from "react";

function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map(i => ({
        ...i,
        date: new Date(i.date)
    }));
}

export const App = () => {
    const [notes, setNotes] = useLocalStorage('data');
    const [selectedItem, setSelectedItem] = useState(null);


    const addNotes = (item) => {
        if (!item.id) {
            setNotes([...mapItems(notes),
                {
                    ...item,
                    id: uuidv4(),
                    date: new Date(item.date),
                },
            ]);
        } else {
            setNotes([...mapItems(notes).map(i => {
                if (i.id === item.id) {
                    return {
                        ...item
                    }
                }
                return i;
            })])
        }
    };

    const removeNotes = (id) => {
        setNotes([...notes.filter(i => i.id !== id)]);
    };

    return (
        <div className='app'>
            <UserContextProvider>
                <LeftPanel>
                    <Header/>
                    <JounalAddButton clearForm={() => setSelectedItem(null)}/>
                    <JournalList  items={mapItems(notes)} setItem={setSelectedItem}/>
                </LeftPanel>
                <Body>
                    <JournalForm removeItem={removeNotes} addNotes={addNotes} data={selectedItem}/>
                </Body>
            </UserContextProvider>
        </div>
    );
};
