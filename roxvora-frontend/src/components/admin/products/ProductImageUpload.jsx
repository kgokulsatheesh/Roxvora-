import { useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

/**
 * ProductImageUpload — drag & drop / click-to-upload image widget.
 *
 * Props:
 *   images         {Array}    — current image list [{ id, url, preview }]
 *   onImagesChange {function} — called with the updated images array
 *   maxImages      {number}   — maximum allowed images (default 10)
 */
const ProductImageUpload = ({ images = [], onImagesChange, maxImages = 10 }) => {
    const inputRef = useRef(null);

    const handleFiles = (files) => {
        const remaining = maxImages - images.length;
        const toAdd = Array.from(files).slice(0, remaining);

        const newImages = toAdd.map((file) => ({
            id: `local-${Date.now()}-${Math.random()}`,
            url: null,
            preview: URL.createObjectURL(file),
            file,
        }));

        onImagesChange?.([...images, ...newImages]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleRemove = (id) => {
        const updated = images.filter((img) => img.id !== id);
        // Revoke object URLs created locally to avoid memory leaks.
        const removed = images.find((img) => img.id === id);
        if (removed?.file && removed.preview) {
            URL.revokeObjectURL(removed.preview);
        }
        onImagesChange?.(updated);
    };

    const canAdd = images.length < maxImages;

    return (
        <div>
            {/* Drop zone */}
            {canAdd && (
                <div
                    role="button"
                    tabIndex={0}
                    aria-label="Upload product images"
                    className="border-2 border-dashed border-neutral-200 rounded-xl p-6 text-center cursor-pointer hover:border-secondary transition-colors mb-4"
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    <FiUpload className="w-8 h-8 text-neutral-400 mx-auto mb-2" aria-hidden="true" />
                    <p className="text-sm font-medium text-primary mb-1">Click or drag images here</p>
                    <p className="text-xs text-secondary">
                        PNG, JPG, WEBP · Max {maxImages} images · {images.length}/{maxImages} uploaded
                    </p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                </div>
            )}

            {/* Preview grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3" role="list" aria-label="Uploaded images">
                    {images.map((img, index) => (
                        <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 group" role="listitem">
                            {img.preview || img.url ? (
                                <img
                                    src={img.preview || img.url}
                                    alt={`Product image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FiImage className="w-6 h-6 text-neutral-400" aria-hidden="true" />
                                </div>
                            )}
                            {index === 0 && (
                                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                                    Main
                                </span>
                            )}
                            <button
                                type="button"
                                className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemove(img.id)}
                                aria-label={`Remove image ${index + 1}`}
                            >
                                <FiX className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImageUpload;
