## react-native-prompt-async

https://www.npmjs.com/package/react-native-prompt-async 

Package async similar to the JavaScript 'prompt' method, it's called in a single line with await

![Demo Video]()

------

##### Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Response](#Response)
* [Props](#props)

# Installation
```shell
npm i react-native-prompt-async
```
or
```shell
yarn add react-native-prompt-async
```
After installation, you must import **InitializePrompt** and include it in the main root file of your app, usually **"App.js"**.
```jsx
import { View } from "react-native";
import { initializePrompt } from "react-native-prompt-async";

export default function App (){

	return (
		<View>
			<InitializePrompt/>
			// your code
		</View>
	);
}
```

# Usage

You can pass just a string by referencing the title property of the prompt or you can pass an object with the properties

```jsx
import react from 'react';
import { View, Text, Pressable } from "react-native";
import prompt from 'react-native-prompt-async';

function App() {

	async function action (){
		const response = await prompt("¿question?");
		// your code
	}

	return (
		<View>
			<Pressable onPress={action} >
				<Text>Button</Text>
			</Pressable>
		</View>
	);
}
```
passing properties to the object as parameters
```jsx
...
	async function action (){
		const response = await prompt({title:"¿Why are you a programmer??", description:"hello:)"});
		// your code
	}
...
```
# Response
the prompt returns only 2 types of data, `false` or `string`. 

`false` will only be returned if the user binds to the button that is associated with the **cancelButton** property or also if he binds to the overlay component (gray background) only if the **isOverlayClose** property is true. 

string will only be returned when the user binds to the button that does not have the **cancelButton** property as long as the `textInput` is not empty.

# Props

All props are optional

Prop              | Type     | Default     | Description
----------------- | -------- | ----------- | -----------
title | string | "" | 
description | string | "" | 
placeholder | string | "Enter the required.." |
placeholderTextColor | string | auto | 
textInputDefaultValue | string | ""
autofocus | bool | true
|
cancelButton | string | "left" | Property that assigns as **"close or cancel button"** to any of the two buttons. if **cancelButton** is **"left"** then the left `Button` is going to be the close or cancel `Button`.
leftButtonText | string | "Cancel"
rightButtonText | string | "Done"
leftButtonTextColor | string | "#D22929"
rightButtonTextColor | string | "#76C856"
|
isOverlayClose | bool | false
keyboardSpace | number | 0









