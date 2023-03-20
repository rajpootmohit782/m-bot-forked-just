import React, { useState } from "react";
import axios from "axios";
import "./com.css";
const MyComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageURL1, setImageURL1] = useState("");

  const generateImage = async () => {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "image-alpha-001",
        prompt: prompt,
        n: 2, // Change n to 1
        size: "512x512",
        response_format: "url"
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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"
        }
      }
    );
    console.log(response.data);
    setImageURL(response.data.data[0].url);
    setImageURL1(response.data.data[1].url);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateImage();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={handlePromptChange} />
        </label>
        <button type="submit">Generate Image</button>
      </form>
      {imageURL && <img src={imageURL} alt="Generated Image" />}
      {imageURL1 && <img src={imageURL1} alt="Generated Image1" />}
    </div>
  );
};

export default MyComponent;
