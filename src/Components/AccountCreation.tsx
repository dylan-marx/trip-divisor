import { ChangeEvent, FC, useState } from 'react';

const AccountCreation: FC = () => {
    let [names, setNames] = useState<string[]>([]);
    let [newName, setNewName] = useState<string>('');
    let [addingName, setAddingName] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const addName = () => {
        if (newName.trim() !== '') {
            setNames([...names, newName]);
            setNewName('');
            setAddingName(false);
        }
    }
    
    return (
        <div className='account-creation-container'>
            <h2>People</h2>
            {
                addingName ? (
                    <div>
                        <input type='text' id='new-account' onChange={handleInputChange} value={newName}></input>
                        <button onClick={addName}>Add</button>
                        <button onClick={() => setAddingName(false)}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setAddingName(true)}>Add Person</button>
                )
                    
            }

            {
                names.map((name, index) => {
                    return (
                        <div>
                            {name}
                        </div>
                    )  
                })
            }
        </div>
    );
}

export default AccountCreation;