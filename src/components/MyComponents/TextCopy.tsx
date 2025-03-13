import { useState } from "react";

interface TextCopyButtonProps {
    path: string;
}

const TextCopyButton = ({ path }: TextCopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string, e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }).catch((error) => {
            console.error("Clipboard copy failed:", error);
        });
    };

    return (
        <button
            type="button"
            onClick={(e) => handleCopy(path, e)}
            className="text-blue-500 text-sm hover:underline"
        >
            {copied ? "Copied!" : "Path Copy"}
        </button>
    );
};

export default TextCopyButton;
