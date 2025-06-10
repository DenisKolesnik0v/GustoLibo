import {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react';

interface EditableNameProps {
    username: string;
    onSave: (newUsername: string) => void;
}

export const EditName = forwardRef<HTMLInputElement, EditableNameProps>(
    ({ username, onSave }, ref) => {
        const [newUsername, setNewUsername] = useState(username);
        const inputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.style.width = '0';
                inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
            }
        }, [newUsername]);

        const handleSave = () => {
            if (newUsername.trim() === '') {
                return;
            }
            onSave(newUsername);
        };

        return (
            <input
                ref={inputRef}
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                    if (e.key === 'Escape') setNewUsername(username);
                }}
                style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    padding: '0',
                    minWidth: '1ch',
                    boxSizing: 'content-box',
                }}
            />
        );
    },
);

EditName.displayName = 'EditName';
