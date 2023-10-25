import React, { useEffect, useRef, useState } from "react";
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
            }, isAndroid ? 100 : 1);
        }

    }, [prompt]);

    return (
        <Modal visible={prompt !== false ? true : false} transparent>
            <View style={{height:"100%", backgroundColor:"rgba(0, 0, 0, 0.4)", justifyContent:"center", alignItems:"center", width:"100%"}}>
                <Pressable onPress={prompt?.isOverlayClose ? close : ()=>{} } style={{position:"absolute", height:"100%", width:"100%"}} />
                <View style={{width:290, marginBottom:prompt?.keyboardSpace || ((prompt?.description || esTextoLargo) ? 15 : 0), alignItems:"center", backgroundColor: dark ? "rgba(47, 45, 45, 0.85)" : "rgba(255, 255, 255, 0.85)", padding:10, borderRadius:11}}>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:17, marginTop:3, maxWidth:"94%", color: dark ? "#fff" : "#000", fontWeight:"bold", textAlign:"center"}}>{prompt?.title}</Text>
                        {prompt?.description && <Text style={{fontSize:13.8, maxWidth:"93%", color:dark ? "#C8C8C8" : "#666666", marginTop:6, textAlign:"center"}}>{prompt?.description}</Text>}
                    </View>
                    <TextInput ref={textInputRef} placeholderTextColor={prompt?.placeholderTextColor || (dark ? "#717171" : "#DADADA")} onChangeText={txt=>textInputValue.current = txt} defaultValue={prompt?.textInputDefaultValue || ""} style={{marginTop:14, borderColor:dark ? "#484848" : "#EDEDED", color:dark ? "#B5B5B5" : "#545454", borderRadius:3, width:"95%", borderWidth:0.5, backgroundColor: dark ? "#535353" : "#fff", padding:8, fontSize:15}} placeholder={prompt?.placeholder || "Enter the required.."} />

                    <View style={{marginTop:13, width:"95%", alignItems:"center", justifyContent: !esTextoLargo ? "space-around" : "flex-start", flexDirection: esTextoLargo ? "column" : "row"}}>
                        <Pressable onPress={!cancel? close : cancel != "left" ? done : close} style={({pressed})=>[{opacity:pressed ? "0.6" : 1, marginBottom: esTextoLargo ? 5 : 0, borderColor: dark ? "#4A4A4A" : "#DEDEDE", minHeight:40, justifyContent:"center", borderWidth:0.5, width: esTextoLargo ? "100%" : "45%"}]}>
                            <Text style={{textAlign:"center", color: prompt?.leftButtonTextColor || "#D22929"}}>{prompt?.leftButtonText || "Cancel"}</Text>
                        </Pressable>
                        <Pressable onPress={!cancel ? done : cancel != "right" ? done : close} style={({pressed})=>[{opacity:pressed ? "0.6" : 1, borderColor:dark ? "#4A4A4A" : "#DEDEDE", minHeight:40, justifyContent:"center", borderWidth:0.5, width: esTextoLargo ? "100%" : "45%"}]}>
                            <Text style={{textAlign:"center", fontWeight:"bold", color: prompt?.rightButtonTextColor || "#76C856"}}>{prompt?.rightButtonText || "Done"}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

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

/*
    PROPIEDADES:

    darkMode: bool | default: false

    title: string | default: empty
    description: string | default: empty
    placeholder: string | default: Enter the required..
    placeholderTextColor: string | default: sistema
    textInputDefaultValue: string | default: empty
    autofocus: bool | default: true

    leftButtonText: string | default : Cancel
    rightButtonText: string | default : Done
    leftButtonTextColor: string | default color: #D22929 
    rightButtonTextColor: string | default color: #76C856
    

    isOverlayClose: bool | default: false
    keyboardSpace: number | default: 0 | rango: 1-500
*/