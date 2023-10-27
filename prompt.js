import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { TextInput, Modal, Pressable, Text, View, Platform } from "react-native";

let subs = [];
let cantSubs = 0;

function setModal (data){
    subs.map((a)=>{
        a(data);
    });
}

function modal (e){
    subs.push(e);
    cantSubs++;
}

export function InitializePrompt (){

    const isAndroid = Platform.OS == "android";

	const [prompt, setPrompt] = useState(false);
    const textInputRef = useRef(null);
    const textInputValue = useRef("");

    const esTextoLargo = (prompt?.leftButtonText?.length > 10 || prompt?.rightButtonText?.length > 10);
    const dark = prompt?.darkMode === true;
    const cancel = prompt?.cancelButton;

    if (prompt?.textInputDefaultValue) {
        textInputValue.current = prompt?.textInputDefaultValue;
    }

    function close (){
        setModal(false);
        textInputValue.current = "";
    }

    function done (){
        if (textInputValue.current.trim() != "") {
            setModal(textInputValue.current.trim());
            textInputValue.current = "";
        } else if (prompt?.alert){
            setModal(true);
        }
    }

    useEffect(()=>{
        modal((data)=>{
            setPrompt(typeof data === "string" ? {title:data} : data);
        });
    }, []);

    useEffect(()=>{

        // COMPATIBILIDAD ANDROID AUTOFOCUS, NO FUNCIONA CON PROP AUTOFOCUS
        if (prompt !== false && typeof prompt !== "string" && prompt?.autofocus !== false) {
            setTimeout(()=>{
                try {
                    textInputRef.current.focus();
                } catch {
                    
                }
            }, isAndroid ? 40 : 1);
        }

    }, [prompt]);

    return (
        <Modal style={{zIndex:5500}} visible={prompt !== false ? true : false} transparent>
            <View style={{height:"100%", zIndex:5500, minHeight: isAndroid ? Dimensions.get("screen").height : "100%", backgroundColor:"rgba(0, 0, 0, 0.4)", justifyContent:"center", alignItems:"center", width:"100%"}}>
                <Pressable onPress={prompt?.isOverlayClose ? close : ()=>{} } style={{position:"absolute", height:"100%", width:"100%"}} />
                <View style={{width:290, marginBottom:prompt?.keyboardSpace || ((prompt?.description || esTextoLargo) ? 15 : 0), alignItems:"center", backgroundColor: dark ? "rgba(47, 45, 45, 0.94)" : "rgba(255, 255, 255, 0.94)", padding:10, borderRadius:11}}>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:17, marginTop:3, maxWidth:"94%", color: dark ? "#fff" : "#000", fontWeight:"bold", textAlign:"center"}}>{prompt?.title}</Text>
                        { prompt?.description && 
                            <Text style={{fontSize:13.8, maxWidth:"93%", color:dark ? "#C8C8C8" : "#666666", marginTop:6, textAlign:"center"}}>{prompt?.description}</Text>
                        }
                    </View>
                    { !prompt?.alert &&
                        <TextInput ref={textInputRef} placeholderTextColor={prompt?.placeholderTextColor || (dark ? "#717171" : "#DADADA")} onChangeText={txt=>textInputValue.current = txt} defaultValue={prompt?.textInputDefaultValue || ""} style={{marginTop:14, borderColor:dark ? "#484848" : "#EDEDED", color:dark ? "#B5B5B5" : "#545454", borderRadius:3, width:"95%", borderWidth:0.5, backgroundColor: dark ? "#535353" : "#fff", padding:8, fontSize:15}} placeholder={prompt?.placeholder || "Enter the required.."} />
                    }

                    <View style={{marginTop:13, width:"95%", alignItems:"center", justifyContent: !esTextoLargo ? "space-around" : "flex-start", flexDirection: esTextoLargo ? "column" : "row"}}>
                        <Pressable onPress={!cancel? close : cancel != "left" ? done : close} style={({pressed})=>[{display: (prompt?.buttonHidden == "left" || prompt?.buttonHidden == "all") ? "none" : "flex", opacity:pressed ? "0.6" : 1, marginBottom: esTextoLargo ? 5 : 0, borderColor: dark ? "#4A4A4A" : "#DEDEDE", minHeight:40, justifyContent:"center", borderWidth:0.5, width: esTextoLargo ? "100%" : "45%"}]}>
                            <Text style={{textAlign:"center", color: prompt?.leftButtonTextColor || "#D22929"}}>{prompt?.leftButtonText || "Cancel"}</Text>
                        </Pressable>
                        <Pressable onPress={!cancel ? done : cancel != "right" ? done : close} style={({pressed})=>[{display: (prompt?.buttonHidden == "right" || prompt?.buttonHidden == "all") ? "none" : "flex", opacity:pressed ? "0.6" : 1, borderColor:dark ? "#4A4A4A" : "#DEDEDE", minHeight:40, justifyContent:"center", borderWidth:0.5, width: esTextoLargo ? "100%" : "45%"}]}>
                            <Text style={{textAlign:"center", fontWeight:"bold", color: prompt?.rightButtonTextColor || "#76C856"}}>{prompt?.rightButtonText || "Done"}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


/**
    DESCRIPTION PROMPT FUNCTION

    @param {Object} params - Object.
    @param {string} params.title - Title of prompt (Main word).
    @param {string} params.description - Prompt description, text that goes between the title and the text field.
    @param {string} params.placeholder - placeholder of TextInput.
    @param {string} params.placeholderTextColor - placeholderTextColor of TextInput.
    @param {string} params.textInputDefaultValue - defaultValue of TextInput.
    @param {bool} params.autofocus - Sets the autoFocus property of the prompt's TextInput. if true as soon as the prompt window opens the keyboard will be activated automatically.
    @param {string} params.cancelButton - Property that receives "left" or "right". Property that assigns as "close or cancel button" to any of the two buttons. if cancelButton is "left" then the left Button is going to be the close or cancel Button.
    @param {string} params.leftButtonText - Text to be displayed on the left button.
    @param {string} params.rightButtonText - Text to be displayed on the right button.
    @param {string} params.leftButtonTextColor - Text color displayed on the left button.
    @param {string} params.rightButtonTextColor - Text color displayed on the right button.
    @param {bool} params.isOverlayClose - Establishes whether the overlay (gray background) when pressed closes or cancels the prompt, if false it will not do so.
    @param {number} params.keyboardSpace - Space between keyboard and prompt window, range 1-500.
    @param {number} params.alert - if true:
                                   * sets the prompt to alert.
                                   * button not associated with cancelButton returns true.
    @param {number} params.buttonHidden - 

 */

export default function prompt (params){
    setModal(params);

    return new Promise ((res)=>{
        modal((data)=>{
            subs.splice(1, 1);
            if (modal !== false) {
                setModal(false);
            }
            res(data);
        });
    });
}