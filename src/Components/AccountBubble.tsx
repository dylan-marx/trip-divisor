import { ChangeEvent, FC, useState } from "react";

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
        <div className="account">
            {
               showError && <div className='error'>{error}</div>
            }
            {
                editing? (
                    <div>
                        <input type='text' onChange={handleInputChange} value={newName} />
                        <button onClick={() => editClick()}>Done</button>
                    </div>
                ) : (
                    <div>
                        <label>{name}</label>
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(name)}>Delete</button>
                    </div>
                )
            }
            
        </div>
    );
}

export default AccountBubble;