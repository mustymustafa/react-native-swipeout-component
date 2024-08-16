
### React Native Swipeout Component

`React Native Swipeout` is a customizable swipeable row component for React Native, allowing you to create swipe actions like deleting, archiving, or other actions you might want to trigger with a swipe.

![swipeout](https://github.com/user-attachments/assets/b2b3e3b0-3305-43a8-9067-04f304894111)

#### Installation


```bash

npm install react-native-swipeout-component

```

#### Usage

```javascript

import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Swipeout from 'react-native-swipeout-component';

const MyComponent = () => {

  const rightButtons = [

    {

      component: <Text style={styles.customButtonText}>Delete</Text>,

      buttonBackgroundColor: 'red',

      onPress: () => console.log('Delete pressed'),

    },

  ];

  return (

    <Swipeout

      right={rightButtons}

      autoClose={true}

      rightBackgroundColor="lightgray"

      buttonWidth={80} // Required when using autoOpenRight or autoOpenLeft

      autoOpenRight={true} // Automatically opens the right swipe action

    >

      <View style={styles.listItem}>

        <Text>Swipe me left to delete!</Text>

      </View>

    </Swipeout>

  );

};

const styles = StyleSheet.create({

  listItem: {

    padding: 20,

    backgroundColor: 'white',

  },

  customButtonText: {

    color: 'white',

    fontWeight: 'bold',

  },

});

export default MyComponent;

```

### Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `autoClose` | `boolean` | `false` | Automatically closes the swipe action after a button is pressed. |
| `buttonBackgroundColor` | `string` |  | Background color for the individual swipe buttons. |
| `leftBackgroundColor` | `string` |  | Background color when swiping to the left. |
| `rightBackgroundColor` | `string` |  | Background color when swiping to the right. |
| `close` | `boolean` |  | Programmatically close the swipeout. |
| `left` | `array` | `[]` | Array of buttons to show on the left swipe action. Each button can have properties like `text`, `onPress`, `type`, `component`, and `buttonBackgroundColor`. |
| `right` | `array` | `[]` | Array of buttons to show on the right swipe action. |
| `onOpen` | `function` |  | Callback function called when the swipe action is opened. |
| `onClose` | `function` |  | Callback function called when the swipe action is closed. |
| `scroll` | `function` |  | Callback function to handle scroll events. |
| `style` | `object` |  | Custom styles for the swipeout container. |
| `sensitivity` | `number` | `50` | Sensitivity of the swipe gesture. |
| `buttonWidth` | `number` |  | Width of the swipe buttons. **Must be provided if `autoOpenRight` or `autoOpenLeft` is used.** |
| `disabled` | `boolean` | `false` | Disable the swipe actions. |
| `autoOpenRight` | `boolean` | `false` | Automatically opens the right swipe action when the component is mounted. **Do not use with `autoOpenLeft`.** |
| `autoOpenLeft` | `boolean` | `false` | Automatically opens the left swipe action when the component is mounted. **Do not use with `autoOpenRight`.** |
| `timeout` | `number` |  | Time in milliseconds to keep the swipe action open when `autoOpenRight`or `autoOpenLeft` is used. |
| `children` | `ReactNode` |  | The content to render inside the swipeout container. |
| `dragToCTA` | `boolean` | `false` | Enable drag to call-to-action functionality. |
| `onCTA` | `function` |  | Callback function to handle the call-to-action event when `dragToCTA` is enabled. |                                                                 |


### Drag to CTA


https://github.com/user-attachments/assets/fce79d67-15c3-4b29-9f1e-725f7cb1f208



### Integration with FlatList

Here's how you can integrate `react-native-swipeout-component` with a `FlatList` to prevent scrolling while swiping:


```javascript

   import React, { useState } from 'react';

   import { FlatList, Text, View } from 'react-native';

   import Swipeout from 'react-native-swipeout';

   const YourComponent = () => {

     const [scrollEnabled, setScrollEnabled] = useState(true);

     const yourData = [

       { key: 'Item 1' },

       { key: 'Item 2' },

       { key: 'Item 3' },

       // Add more items as needed

     ];

     const renderItem = ({ item }) => {

       const swipeoutBtns = [

         {

           text: 'Delete',

           onPress: () => console.log('Delete pressed'),

         },

         // Add more buttons as needed

       ];

       return (

         <Swipeout

           right={swipeoutBtns}

           autoClose={true}

           backgroundColor="transparent"

           onOpen={() => setScrollEnabled(false)}   // Disable scrolling when swipeout is open

           onClose={() => setScrollEnabled(true)}   // Re-enable scrolling when swipeout is closed

         >

           <View style={{ padding: 20, backgroundColor: 'white' }}>

             <Text>{item.key}</Text>

           </View>

         </Swipeout>

       );

     };

     return (

       <FlatList

         data={yourData}

         renderItem={renderItem}

         scrollEnabled={scrollEnabled}   // Control scroll based on swipe state

         keyExtractor={(item) => item.key}

       />

     );

   };

   export default YourComponent;
```

### Explanation:

- **`scrollEnabled` State**: We use a `scrollEnabled` state variable to toggle the scrolling of the `FlatList`.

- **`Swipeout` Component**: This component wraps around the list item and provides swipeable buttons.

- **`onOpen` and `onClose` Callbacks**: These callbacks are triggered when the swipeout is opened or closed, respectively. They are used to disable the `FlatList`'s scrolling when a swipe action is in progress and re-enable it afterward.

### Notes:

- **Performance**: Disabling and enabling scrolling dynamically is usually efficient, but be cautious if you have a very large list or complex items, as it might cause slight jankiness.


### Important Rules

1\. **Auto Open Restrictions**: You should not use `autoOpenRight` and `autoOpenLeft` together. Only one of these properties should be set to `true` to avoid conflicting behaviors.

2\. **Button Width Requirement**: When using `autoOpenRight` or `autoOpenLeft`, you must pass a `buttonWidth` value. This ensures that the component can correctly calculate the swipe action's dimensions and behavior.

### Example with Custom Component Button and Background Colors

```javascript

import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Swipeout from 'react-native-swipeout-component';

const CustomButtonContent = () => (

  <View style={styles.customButtonContent}>

    <Text style={styles.customButtonText}>Custom Delete</Text>

  </View>

);

const MyComponent = () => {

  const rightButtons = [

    {

      component: <CustomButtonContent />, // Passing the custom component

      buttonBackgroundColor: 'red',

      onPress: () => console.log('Custom Delete pressed'),

      width: 80,

      height: 60,

    },

  ];

  return (

    <Swipeout

      right={rightButtons}

      autoClose={true}

      rightBackgroundColor="lightgray" // Set background color when swiping to the right

      buttonWidth={80} // Required when using autoOpenRight or autoOpenLeft

      autoOpenRight={true} // Automatically opens the right swipe action

    >

      <View style={styles.listItem}>

        <Text>Swipe me left to see the custom button!</Text>

      </View>

    </Swipeout>

  );

};

const styles = StyleSheet.create({

  listItem: {

    padding: 20,

    backgroundColor: 'white',

  },

  customButtonContent: {

    justifyContent: 'center',

    alignItems: 'center',

    height: '100%',

  },

  customButtonText: {

    color: 'white',

    fontWeight: 'bold',

  },

});

export default MyComponent;

```
