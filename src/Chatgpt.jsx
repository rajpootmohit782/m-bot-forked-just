// import React, { useState, useEffect } from "react";
// import "./styles.css";

// const App1 = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");

//   useEffect(() => {
//     const handleInitialMessage = async () => {
//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer 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`
//           },
//           body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             prompt: "Hello, how can I help you today?"
//           })
//         }
//       );

//       const data = await response.json();
//       console.log(data);
//       setMessages([
//         { role: "assistant", content: data.choices[0].message.content }
//       ]);
//     };

//     handleInitialMessage();
//   }, []);

//   const handleUserInput = async (text) => {
//     setMessages([...messages, { role: "user", content: text }]);

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer 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`
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: messages.concat({ role: "user", content: text })
//       })
//     });

//     const data = await response.json();
//     const output = data.choices[0].message.content;
//     const formattedOutput = output.split("\n").map((line, index) => (
//       <div key={index} className="message assistant">
//         {line}
//       </div>
//     ));
//     setMessages([...messages, { role: "assistant", content: formattedOutput }]);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" && inputText.trim() !== "") {
//       handleUserInput(inputText.trim());
//       setInputText("");
//     }
//   };

//   const handleChange = (event) => {
//     setInputText(event.target.value);
//   };

//   return (
//     <div className="app">
//       <div className="chat-window">
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.role}`}>
//             {message.content}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           className="input"
//           placeholder="Type your message here..."
//           value={inputText}
//           onKeyDown={handleKeyDown}
//           onChange={handleChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default App1;

import React, { useState, useEffect } from "react";
import "./styles.css";

const App1 = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const handleInitialMessage = async () => {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            prompt: "Hello, how can I help you today?"
          })
        }
      );

      const data = await response.json();
      console.log(data);
      setMessages([
        { role: "assistant", content: data.choices[0].message.content }
      ]);
    };

    handleInitialMessage();
  }, []);

  const handleUserInput = async (text) => {
    setMessages([...messages, { role: "user", content: text }]);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages.concat({ role: "user", content: text })
      })
    });

    const data = await response.json();
    const output = data.choices[0].message.content;
    const formattedOutput = output.split("\n").map((line, index) => (
      <div key={index} className="message assistant">
        {line}
      </div>
    ));
    setMessages([...messages, { role: "assistant", content: formattedOutput }]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputText.trim() !== "") {
      handleUserInput(inputText.trim());
      setInputText("");
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="app">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input"
          placeholder="Type your message here..."
          value={inputText}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default App1;
