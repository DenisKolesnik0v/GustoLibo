import React, { useRef, useState, useEffect } from 'react';

type Props = {
    onSelect: (file: File) => void;
    defaultImageUrl?: string;
};

export const ImageUploader: React.FC<Props> = ({ onSelect, defaultImageUrl }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFile = (file: File) => {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        onSelect(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            style={{
                width: 200,
                height: 200,
                border: '2px dashed #ccc',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: dragOver ? '#f0f0f0' : '#fff',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {previewUrl
                ? (
                    <>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setPreviewUrl(null);
                                fileInputRef.current?.click();
                            }}
                            style={{
                                position: 'absolute',
                                bottom: 4,
                                right: 4,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: 4,
                                fontSize: 12,
                            }}
                        >
                        Заменить
                        </div>
                    </>
                )
                : (
                    <p style={{ textAlign: 'center', color: '#888' }}>
                    Перетащите или нажмите<br />для выбора изображения
                    </p>
                )}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        handleFile(e.target.files[0]);
                    }
                }}
            />
        </div>
    );
};
