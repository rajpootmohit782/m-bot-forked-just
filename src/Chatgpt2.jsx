// ///////////////////////////////////////////////
// import { useState } from "react";
// import "./styles.css";

// function ChatGPT() {
//   const apiUrl = "process.env.REACT_APP_API_URL";
//   const aaa = "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";
//   console.log(apiUrl);
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: (
//         <div className="message-content">
//           {" "}
//           <p>Hello from MohiT! How can I help you today?</p>{" "}
//           <p>
//             You can ask me almost any question! As a language model, I am
//             designed to understand and respond to a wide range of topics and
//             queries.
//           </p>{" "}
//           <ul>
//             {" "}
//             <li>Can you tell me a joke?</li>{" "}
//             <li>Write a letter for job holiday</li>{" "}
//             <li>Write an essay on India?</li>{" "}
//             <li>Can you recommend a good book to read?</li>{" "}
//             <li>What is the difference between a virus and a bacteria?</li>{" "}
//           </ul>{" "}
//         </div>
//       ),
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversationHistory, setConversationHistory] = useState([]);

//   // create a new message object for the user's input
//   const userMessage = { role: "user", content: inputValue };

//   const handleUserInput = async () => {
//     console.log(conversationHistory);
//     setIsLoading(true); // set loading state to true
//     // add the user's message to the conversation history
//     setConversationHistory((prevHistory) => [...prevHistory, userMessage]);
//     const formattedInput = inputValue
//       .trim()
//       .split("\n")
//       .map((line, index) => (
//         <div key={index} className="message user">
//           {" "}
//           {line}{" "}
//         </div>
//       ));
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "user", content: formattedInput },
//     ]);
//     setInputValue("");
//     let val = [...conversationHistory, { role: "user", content: inputValue }];
//     console.log(val);
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${aaa}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: val,
// [
//   { role: "user", content: "horse" },
//   { role: "user", content: inputValue },
// ],

import { useState } from "react";
import "./styles.css";

function ChatGPT() {
  const apiUrl = "process.env.REACT_APP_API_URL";
  const aaa = "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";
  console.log(apiUrl);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: (
        <div className="message-content">
          {" "}
          <p>Hello from MohiT! How can I help you today?</p>{" "}
          <p>
            You can ask me almost any question! As a language model, I am
            designed to understand and respond to a wide range of topics and
            queries.
          </p>{" "}
          <ul>
            {" "}
            <li>Can you tell me a joke?</li>{" "}
            <li>Write a letter for job holiday</li>{" "}
            <li>Write an essay on India?</li>{" "}
            <li>Can you recommend a good book to read?</li>{" "}
            <li>What is the difference between a virus and a bacteria?</li>{" "}
          </ul>{" "}
        </div>
      ),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);

  const recognition = new window.webkitSpeechRecognition(); // create a new instance of SpeechRecognition

  const handleVoiceInput = () => {
    setIsLoading(true); // set loading state to true
    recognition.start(); // start recording user's voice input

    recognition.onresult = (event) => {
      const userMessage = {
        role: "user",
        content: event.results[0][0].transcript,
      };
      //  setConversationHistory((prevHistory) => [...prevHistory, userMessage]); // add user's message to the conversation history
      setInputValue(event.results[0][0].transcript); // set the input value to the user's spoken text

      //  handleUserInput(); // call the function to handle the user's input
    };

    recognition.onend = () => {
      setIsLoading(false); // set loading state back to false after recording ends
    };
  };

  const handleUserInput = async () => {
    setIsLoading(true); // set loading state to true
    // add the user's message to the conversation history
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: inputValue },
    ]);
    const formattedInput = inputValue
      .trim()
      .split("\n")
      .map((line, index) => (
        <div key={index} className="message user">
          {" "}
          {line}{" "}
        </div>
      ));
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: formattedInput },
    ]);
    setInputValue("");
    let val = [...conversationHistory, { role: "user", content: inputValue }];
    console.log(val);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aaa}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: val,
        // [
        //   { role: "user
      }),
    });

    const data = await response.json();
    console.log(data);
    const output = data.choices[0].message.content;
    // output.split(" =>
    const formattedOutput = output.split("\n").map((line, index) => (
      <div key={index} className="message assistant">
        {line}
      </div>
    ));
    // add the bot's response to the conversation history
    const botMessage = { role: "assistant", content: output };
    setConversationHistory((prevHistory) => [...prevHistory, botMessage]);
    console.log(formattedOutput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: formattedOutput },
    ]);
    setIsLoading(false); // set loading state back to false after response is received
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {" "}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {" "}
            {message.content}{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <div className="chat-input">
        {" "}
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleUserInput();
            }
          }}
        />
        {!isLoading && (
          <button className="send-button" onClick={handleUserInput}>
            {" "}
            Send{" "}
          </button>
        )}
        {isLoading && <div className="loading-spinner"></div>}
        <button className="voice-button" onClick={handleVoiceInput}>
          {isLoading ? "Listening..." : "Voice Input"}
        </button>
      </div>{" "}
    </div>
  );
}
export default ChatGPT;
//////////////////////////////////////////////////
// import { useState } from "react";
// import "./styles.css";
// function ChatGPT() {
//   const apiUrl = "process.env.REACT_APP_API_URL";
//   const aaa = "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";
//   console.log(apiUrl);
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: (
//         <div className="message-content">
//           {" "}
//           <p>Hello from MohiT! How can I help you today?</p>{" "}
//           <p>
//             You can ask me almost any question! As a language model, I am
//             designed to understand and respond to a wide range of topics and
//             queries.
//           </p>{" "}
//           <ul>
//             {" "}
//             <li>Can you tell me a joke?</li>{" "}
//             <li>Write a letter for job holiday</li>{" "}
//             <li>Write an essay on India?</li>{" "}
//             <li>Can you recommend a good book to read?</li>{" "}
//             <li>What is the difference between a virus and a bacteria?</li>{" "}
//           </ul>{" "}
//         </div>
//       ),
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const handleUserInput = async () => {
//     const formattedInput = inputValue
//       .trim()
//       .split("\n")
//       .map((line, index) => (
//         <div key={index} className="message user">
//           {" "}
//           {line}{" "}
//         </div>
//       ));
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "user", content: formattedInput },
//     ]);
//     setInputValue("");

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${aaa}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: inputValue }],
//       }),
//     });

//     const data = await response.json();
//     console.log(data);
//     const output = data.choices[0].message.content;
//     // output.split(" =>
//     const formattedOutput = output.split("\n").map((line, index) => (
//       <div key={index} className="message assistant">
//         {line}
//       </div>
//     ));
//     console.log(formattedOutput);
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "assistant", content: formattedOutput },
//     ]);
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-history">
//         {" "}
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.role}`}>
//             {" "}
//             {message.content}{" "}
//           </div>
//         ))}{" "}
//       </div>{" "}
//       <div className="chat-input">
//         {" "}
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={inputValue}
//           onChange={(event) => setInputValue(event.target.value)}
//           onKeyPress={(event) => {
//             if (event.key === "Enter") {
//               handleUserInput();
//             }
//           }}
//         />{" "}
//         <button className="send-button" onClick={handleUserInput}>
//           {" "}
//           Send{" "}
//         </button>{" "}
//       </div>{" "}
//     </div>
//   );
// }
// export default ChatGPT;
// import { useState } from "react";

// import "./styles.css";

// function ChatGPT() {
//   const apiUrl = "process.env.REACT_APP_API_URL";
//   const aaa = "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";

//   console.log(apiUrl);
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: (
//         <div>
//           "Hello from MohiT! How can I help you today?
//           <h4>
//             You can ask me almost any question! As a language model, I am
//             designed to understand and respond to a wide range of topics and
//             queries. Here are some examples of questions you can ask:
//           </h4>
//           <h5>Can you tell me a joke?</h5>{" "}
//           <h5> Write a letter for job holiday</h5>{" "}
//           <h5> Write an essay on India?</h5>{" "}
//           <h5> Can you recommend a good book to read?</h5>{" "}
//           <h5> What is the difference between a virus and a bacteria?</h5>
//         </div>
//       ),
//     },
//   ]);

//   const [inputValue, setInputValue] = useState("");

//   const handleUserInput = async () => {
//     const formattedInput = inputValue
//       .trim()
//       .split("\n")
//       .map((line, index) => (
//         <div key={index} className="message user">
//           {line}
//         </div>
//       ));
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "user", content: formattedInput },
//     ]);
//     setInputValue("");

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${aaa}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: inputValue }],
//       }),
//     });

//     const data = await response.json();
//     console.log(data);
//     const output = data.choices[0].message.content;
//     // output.split(" =>
//     const formattedOutput = <div className="message assistant">{output}</div>;
//     console.log(formattedOutput);
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "assistant", content: formattedOutput },
//     ]);
//   };

//   return (
//     <div>
//       <div className="chat-container">
//         <div className="chat-history">
//           {messages.map((message, index) => (
//             <div key={index} className={`message ${message.role}`}>
//               {message.content}
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={inputValue}
//             onChange={(event) => setInputValue(event.target.value)}
//             onKeyPress={(event) => {
//               if (event.key === "Enter") {
//                 handleUserInput();
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatGPT;

// import { useState } from "react";
// //import Homepage from "./Header";
// import Header from "./Header";
// import "./styles.css";
// function ChatGPT() {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: "Hello from MohiT ! How can I help you today?"
//     }
//   ]);
//   const [messages1, setMessages1] = useState([
//     {
//       role: "assistant",
//       content: "Hello1 from MohiT ! How can I help you today?"
//     }
//   ]);

//   const handleUserInput = async (text) => {
//     const formattedOutput1 = text.split("\n").map((line, index) => (
//       <div key={index} className="message assistant">
//         {line}
//       </div>
//     ));
//     setMessages([...messages, { role: "user", content: formattedOutput1 }]);
//     setMessages1([...messages1, { role: "user", content: formattedOutput1 }]);

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer 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`
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: text }]
//       })
//     });

//     //   const data = await response.json();
//     //   console.log(data.choices[0].message);
//     //   setMessages([
//     //     ...messages,
//     //     { role: "assistant", content: data.choices[0].message.content }
//     //   ]);
//     // };

//     const data = await response.json();
//     console.log(data);
//     const output = data.choices[0].message.content;
//     console.log(output);
//     const formattedOutput = output.split("\n").map((line, index) => (
//       <div key={index} className="message assistant">
//         {line}
//       </div>
//     ));
//     setMessages1([
//       ...messages1,
//       { role: "assistant", content: formattedOutput }
//     ]);
//   };

//   console.log(messages);
//   return (
//     <div>
//       <div className="chat-container">
//         <div className="chat-history">
//           {messages1.map((message, index) => (
//             <div key={index} className={`message ${message.role}`}>
//               {message.content}
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             onKeyPress={(event) => {
//               if (event.key === "Enter") {
//                 handleUserInput(event.target.value);
//                 event.target.value = "";
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatGPT;
