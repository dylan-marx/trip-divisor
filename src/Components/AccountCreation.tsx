import { ChangeEvent, FC, useEffect, useState } from 'react';

import './Styling/AccountCreation.css'
import Account from './AccountBubble';

interface AccountCreationProps {
    updateNames: (newNames: string[]) => void;
}

const AccountCreation: FC<AccountCreationProps> = ({ updateNames }) => {
    let [names, setNames] = useState<string[]>([]);
    let [newName, setNewName] = useState<string>('');
    let [addingName, setAddingName] = useState<boolean>(false);
    let [showError, setShowError] = useState<boolean>(false);
    let [error, setError] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const onDelete = (name: string) => {
        const newNames = names.filter((n) => n !== name);
        setNames(newNames);
    }

    const onEdit = (oldName: string, newName: string) : boolean => {
        if (!names.includes(newName)) {
            let newNames = [...names];
            newNames[newNames.indexOf(oldName)] = newName;
    
            setNames(newNames);
            return true;
        } else if (newName === oldName) {
            setNames(names);
            return true;
        }

        return false;
    }

    useEffect(() => {
        updateNames(names);
    }, [names])

    // Adds a name if it is unique
    const addName = () => {
        if (newName.trim() !== '') {
            if (!(names.includes(newName))) {
                setNames([...names, newName]);
                setNewName('');
                setAddingName(false);
                setError('');
                setShowError(false);
            }  else {
                setShowError(true);
                setError('Names must be unique');
            }
        } else {
            setShowError(true);
            setError('Please enter a name');
        }
    }
    
    return (
        <div className='account-creation-container'>
            <h2>People</h2>
            {
                showError ? (
                    <div className='error'>{error}</div>
                ) : (
                    <label>Who went on the trip?</label>
                )
            }

            {
                addingName ? (
                    <div className='add-person-container'>
                        <input type='text' id='new-account' onChange={handleInputChange} value={newName}></input>
                        <div className='add-cancel-account-buttons'>
                            <button onClick={addName}>Add</button>
                            <button onClick={() => setAddingName(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className='add-person-container'>
                        <button id='add-person-button' className='primary-button' onClick={() => setAddingName(true)}>Add Person</button>
                    </div>
                )
                    
            }

            {
                names.map((name, index) => {
                    return (
                        <Account key={`${name}-${index}`} name={name} onDelete={onDelete} onEdit={onEdit}/>
                    )  
                })
            }
        </div>
    );
}

export default AccountCreation;