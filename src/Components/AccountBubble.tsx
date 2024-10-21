import { ChangeEvent, FC, useState } from "react";
import './Styling/AccountCreation.css'

interface AccountProps {
    name: string;
    onDelete: (name: string) => void;
    onEdit: (oldName: string, newName: string) => boolean;
}

const AccountBubble: FC<AccountProps> = ({name, onDelete, onEdit}) => {
    let [editing, setEditing] = useState(false);
    let [newName, setNewName] = useState(name);

    let [error, setError] = useState('');
    let [showError, setShowError] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const editClick = () => {
        if (onEdit(name, newName)) {
            setError('');
            setShowError(false);
            setEditing(false);
        } else {
            setError('Names must be unique');
            setShowError(true);
        }
        
    }
    return (
        <div className="account-bubble">
            {
               showError && <div className='error'>{error}</div>
            }
            {
                editing? (
                    <div className="account-bubble-content">
                        <input type='text' onChange={handleInputChange} value={newName} />
                        <button onClick={() => editClick()}>Done</button>
                    </div>
                ) : (
                    <div className="account-bubble-content">
                        <label>{name}</label>
                        <div className="account-bubble-buttons">
                            <button className="edit-button" onClick={() => setEditing(true)}>Edit</button>
                            <button className="delete-button" onClick={() => onDelete(name)}>X</button>
                        </div>
                    </div>
                )
            }
            
        </div>
    );
}

export default AccountBubble;