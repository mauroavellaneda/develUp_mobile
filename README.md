# develUp_mobile

### To fix this problem
`currentlyFocusedField is deprecated and will be removed in a future release. Use currentlyFocusedInput
`
- We follow this [Solution](https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/440#issuecomment-699637083)

`Select the file: node_modules/react-native-keyboard-aware-scroll-view/lib/KeyboardAwareHOC.js
Line 372 & replace: const currentlyFocusedField = TextInput.State.currentlyFocusedInput ? findNodeHandle(TextInput.State.currentlyFocusedInput()) : TextInput.State.currentlyFocusedField();`
