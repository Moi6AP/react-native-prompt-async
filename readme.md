## react-native-prompt-async

https://www.npmjs.com/package/react-native-prompt-async 

Package async similar to the JavaScript 'prompt' method, it's called in a single line with await

![Imagen 0](https://drive.google.com/uc?export=view&id=1j_nu06Z8mEakN_cq5xJxZbcdo5hRFwOh)
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

```js
import { View } from "react-native";
import { initializePrompt } from "react-native-prompt-async";

export default function App (){

  return (
    <View>
      <InitializePrompt/>
      {/* your code */}
    </View>
  );
}
```

# Usage

You can pass just a string by referencing the title property of the prompt or you can pass an object with the properties

```js
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

```javascript
async function action (){
  const response = await prompt({
    title: "¿Why are you a programmer??", 
	  description: "hello:)"
  });
  // your code
}
```

# Response
prompt returns only 2 types of data, `false`, `string` or `true`.

`false` will be returned only if the user presses the button associated to the **cancelButton** property or also if he presses the overlay component (gray background) as long as the **isOverlayClose** property is true.

`string` will only be returned if the user presses the button that is not associated to the **cancelButton** property as long as the text field is not empty.

`true` will only be returned if the **alert** property is true and the user presses the button that is not associated to the **cancelButton** property.

# Props

All props are optional

Prop              | Type     | Default     | Description
----------------- | -------- | ----------- | -----------
title | string | "" | Title of prompt (Main word).
description | string | "" | Prompt description, text that goes between the title and the text field.
placeholder | string | "Enter the required.." |  **placeholder** of `TextInput`.
placeholderTextColor | string | "#DADADA" | **placeholderTextColor** of `TextInput`.
textInputDefaultValue | string | "" | **defaultValue** of `TextInput`.
autofocus | bool | true | Sets the **autofocus** property of the prompt's `TextInput`. if true as soon as the prompt window opens the keyboard will be activated automatically.
cancelButton | string | "left" | Property that receives "left" or "right". Property that assigns as **"close or cancel button"** to any of the two buttons. if **cancelButton** is **"left"** then the left `Button` is going to be the close or cancel `Button`.
leftButtonText | string | "Cancel" | Text to be displayed on the left` button`.
rightButtonText | string | "Done" | Text to be displayed on the right `button`.
leftButtonTextColor | string | "#D22929" | Text color displayed on the left `button`.
rightButtonTextColor | string | "#76C856" | Text color displayed on the right `Button`.
isOverlayClose | bool | false | Establishes whether the overlay (gray background) when pressed closes or cancels the prompt, if false it will not do so.
keyboardSpace | number | 0 | Space between **keyboard** and prompt window, range 1-500.
alert | bool | false | if true: sets the prompt to alert. **`button` not associated with cancelButton returns true**.
buttonHidden | bool | none | hides either or both buttons. receives **"left", "right" or "all"** as a value. if **"all"** hides all buttons. if "left" or "right" hides the corresponding `button`.

This is how it looks by **default**:
![Imagen 1](http://drive.google.com/uc?export=view&id=1Y0OvsTvgERlYC0XV5xRgSB5SWfV_g-T3)

This is how it looks like applying the **description** property with the value **"hello:)"**:
![Imagen 2](http://drive.google.com/uc?export=view&id=1p1Di_xGoK6sXhH48FOTzlbbsSLuqfCZV)

This is how it looks like applying the **placeholderTextColor** property with the value **"blue"**:
![Imagen 3](http://drive.google.com/uc?export=view&id=1p1H83CdlxJTWVHU1SZ8IFqumSovpdZPn)

This is how it looks like applying the **darkMode** property with the value **true** and the **keyboardSpace** property with the value **50**:
![Imagen 4](http://drive.google.com/uc?export=view&id=1q3uXaJZ1iNYDnn_mHL-sO-56JxUZ-M2l)

This is how it looks like applying the **cancelButton** property with the value **"right"**:
[GIF 1](https://drive.google.com/uc?export=view&id=1NLEJPaBtkU90_BG7boM5Z7-r5q4u7KNx)