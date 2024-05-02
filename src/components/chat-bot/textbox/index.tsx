import "./style.css";
import React, { useCallback, useState, FormEvent, ChangeEvent } from "react";
import { MdImage, MdSend } from "react-icons/md";

interface TextboxProps {
  handleSubmit: ({ text, imgSrc }: { text?: string; imgSrc?: string }) => void;
}

const Textbox: React.FC<TextboxProps> = ({ handleSubmit }) => {
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Handling change in image
  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    }
  }, []);

  // form submit handling
  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage || image) {
      const formData = new FormData();
      formData.append("image", image || "");
      handleSubmit({
        text: newMessage,
        imgSrc: image ? image : undefined,
      });
      setNewMessage("");
      setImage(null);
    }
  };

  return (
    <form className="chat-input" onSubmit={onSubmitForm}>
      <input
        autoFocus
        name="text-message"
        type="text"
        placeholder="Type a message..."
        autoComplete="off"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="fileInput"
        style={{ display: "none" }}
      />
      {!image && (
        <label className="file-input-label" htmlFor="fileInput">
          <MdImage size={32} />
        </label>
      )}
      {image && (
        <img
          src={image}
          width={32}
          height={32}
          onClick={() => setImage(null)}
        />
      )}
      <button type="submit" disabled={!newMessage && !image}>
        <MdSend />
      </button>
    </form>
  );
};

const MemoizedTextbox = React.memo(Textbox);
export default MemoizedTextbox;
