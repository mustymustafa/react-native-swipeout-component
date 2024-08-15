
### React Native Swipeout Component

`React Native Swipeout` is a customizable swipeable row component for React Native, allowing you to create swipe actions like deleting, archiving, or other actions you might want to trigger with a swipe.

#### Installation

```bash

npm install swipeout-component

```

#### Usage

```javascript

import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Swipeout from 'swipeout-component';

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

| Prop                  | Type          | Default   | Description                                                                                                                                              |

|-----------------------|---------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|

| `autoClose`           | `boolean`     | `false`   | Automatically closes the swipe action after a button is pressed.                                                                                         |

| `buttonBackgroundColor` | `string`     |           | Background color for the individual swipe buttons.                                                                                                       |

| `leftBackgroundColor` | `string`      |           | Background color when swiping to the left.                                                                                                               |

| `rightBackgroundColor` | `string`     |           | Background color when swiping to the right.                                                                                                              |

| `close`               | `boolean`     |           | Programmatically close the swipeout.                                                                                                                     |

| `left`                | `array`       | `[]`      | Array of buttons to show on the left swipe action. Each button can have properties like `text`, `onPress`, `type`, `component`, and `buttonBackgroundColor`. |

| `right`               | `array`       | `[]`      | Array of buttons to show on the right swipe action.                                                                                                      |

| `onOpen`              | `function`    |           | Callback function called when the swipe action is opened.                                                                                                |

| `onClose`             | `function`    |           | Callback function called when the swipe action is closed.                                                                                                |

| `scroll`              | `function`    |           | Callback function to handle scroll events.                                                                                                               |

| `style`               | `object`      |           | Custom styles for the swipeout container.                                                                                                                |

| `sensitivity`         | `number`      | `50`      | Sensitivity of the swipe gesture.                                                                                                                        |

| `buttonWidth`         | `number`      |           | Width of the swipe buttons. **Must be provided if `autoOpenRight` or `autoOpenLeft` is used.**                                                           |

| `disabled`            | `boolean`     | `false`   | Disable the swipe actions.                                                                                                                               |

| `autoOpenRight`       | `boolean`     | `false`   | Automatically opens the right swipe action when the component is mounted. **Do not use with `autoOpenLeft`.**                                            |

| `autoOpenLeft`        | `boolean`     | `false`   | Automatically opens the left swipe action when the component is mounted. **Do not use with `autoOpenRight`.**                                            |

| `timeout`             | `number`      |           | Time in milliseconds to keep the swipe action open when `autoOpenRight` or `autoOpenLeft` is used.                                                       |

| `children`            | `ReactNode`   |           | The content to render inside the swipeout container.                                                                                                     |

| `dragToCTA`           | `boolean`     | `false`   | Enable drag to call-to-action functionality.                                                                                                             |

| `onCTA`               | `function`    |           | Callback function to handle the call-to-action event when `dragToCTA` is enabled.                                                                        |

### Important Rules

1\. **Auto Open Restrictions**: You should not use `autoOpenRight` and `autoOpenLeft` together. Only one of these properties should be set to `true` to avoid conflicting behaviors.

2\. **Button Width Requirement**: When using `autoOpenRight` or `autoOpenLeft`, you must pass a `buttonWidth` value. This ensures that the component can correctly calculate the swipe action's dimensions and behavior.

### Example with Custom Component Button and Background Colors

```javascript

import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Swipeout from 'swipeout-component';

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

This example illustrates how to pass a custom component to a button and configure the swipe background colors. It also emphasizes the importance of the `buttonWidth` prop and the restriction against using `autoOpenRight` and `autoOpenLeft` together.