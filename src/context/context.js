import { createContext, useState } from "react";
import runChat from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading,setloading] = useState(false);
    const [resultData, setresultData] = useState("");

    const delayPara = (index, nextWord) => {
            setTimeout(() => {
            setresultData((prev) => prev + nextWord);
            }, 75*index);
    }

    const newChat = () =>{
        setloading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setloading(true);
        // const result = await runChat(input);
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt);
            setrecentPrompt(prompt);
        }
        else{
            setprevPrompts((prev) => [...prev, input]);
            setrecentPrompt(input);
            response = await runChat(input);
        }
        setloading(false);

        if (response) {
          let responseArray = response.split("**");
          let newResponse = "";

          for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 1) {
              newResponse += "<b>" + responseArray[i] + "</b>";
            } else {
              newResponse += responseArray[i];
            }
          }

          let newResponse2 = newResponse.split("*").join("<br/>");

          let newresponseArry = newResponse2.split(" ");
          setresultData(""); // Clear previous result data

          for (let i = 0; i < newresponseArry.length; i++) {
            const nextWord = newresponseArry[i];
            delayPara(i, nextWord + " ");
          }

          setShowResult(true);
        }

        // setrecentPrompt(input);
        // setprevPrompts((prev) => [...prev, input]);
        setInput("");
      };

    const contextValue = {
        prevPrompts,
        setprevPrompts,
        onSent,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;