var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/SwipeoutComponent.tsx
import React2, { Component } from "react";
import {
  PanResponder,
  View as View2,
  StyleSheet as StyleSheet2
} from "react-native";
import PropTypes from "prop-types";

// src/SwipeoutBtn.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
var SwipeoutBtn = ({
  backgroundColor,
  color,
  component,
  onPress,
  text,
  type,
  underlayColor,
  height = 0,
  width = 0,
  disabled = false
}) => {
  const styleSwipeoutBtn = [styles.swipeoutBtn];
  if (type === "delete") styleSwipeoutBtn.push(styles.colorDelete);
  else if (type === "primary") styleSwipeoutBtn.push(styles.colorPrimary);
  else if (type === "secondary") styleSwipeoutBtn.push(styles.colorSecondary);
  if (backgroundColor) styleSwipeoutBtn.push({ backgroundColor });
  styleSwipeoutBtn.push({
    height,
    width
  });
  const styleSwipeoutBtnComponent = [{
    height,
    width
  }];
  const styleSwipeoutBtnText = [styles.swipeoutBtnText];
  if (color) styleSwipeoutBtnText.push({ color });
  return /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      onPress,
      disabled,
      style: [styles.swipeoutBtnTouchable, styleSwipeoutBtn],
      activeOpacity: underlayColor ? 1 : 0.85,
      underlayColor
    },
    component ? /* @__PURE__ */ React.createElement(View, { style: styleSwipeoutBtnComponent }, component) : /* @__PURE__ */ React.createElement(Text, { style: styleSwipeoutBtnText }, text)
  );
};
var styles = StyleSheet.create({
  swipeoutBtn: {
    justifyContent: "center",
    alignItems: "center"
  },
  swipeoutBtnText: {
    color: "#ffffff",
    alignSelf: "center"
  },
  swipeoutBtnTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  colorDelete: {
    backgroundColor: "red"
  },
  colorPrimary: {
    backgroundColor: "blue"
  },
  colorSecondary: {
    backgroundColor: "gray"
  }
});
var SwipeoutBtn_default = SwipeoutBtn;

// src/SwipeoutComponent.tsx
import { debounce } from "lodash";
var Swipeout = class extends Component {
  constructor(props) {
    super(props);
    this.swipeoutContent = null;
    this._handleSwipe = () => {
      if (this.props.autoOpenRight && !this.props.disabled && this.props.buttonWidth) {
        this._autoOpenRight();
      }
      if (this.props.autoOpenLeft && !this.props.disabled && this.props.buttonWidth) {
        this._autoOpenLeft();
      }
    };
    /**
     *   _autoOpenBoth = () => {
        this._autoOpenRight()
        setTimeout(() => {
          this.setState({
            contentPos: 0,
            btnsLeftWidth: 0
          });
        }, this.props.timeout || 2000)
        this._autoOpenLeft()
    
      }
    
     */
    this._autoOpenRight = () => {
      setTimeout(() => {
        this.setState({
          contentPos: -this.props.buttonWidth / 2,
          btnsRightWidth: this.props.buttonWidth / 2
        });
      }, 500);
      setTimeout(() => {
        this.setState({
          contentPos: 0,
          btnsRightWidth: 0
        });
      }, this.props.timeout || 2e3);
    };
    this._autoOpenLeft = () => {
      setTimeout(() => {
        this.setState({
          contentPos: this.props.buttonWidth / 2,
          btnsLeftWidth: this.props.left ? this.props.buttonWidth / 2 * this.props.left.length : 0
        });
      }, 500);
      setTimeout(() => {
        this.setState({
          contentPos: 0,
          btnsLeftWidth: 0
        });
      }, this.props.timeout || 2e3);
    };
    this._debouncedOnCTA = debounce(() => this.props.onCTA(), 300);
    this._handlePanResponderGrant = () => {
      var _a;
      if (this.props.disabled) return;
      if (!this.state.openedLeft && !this.state.openedRight) {
        this._callOnOpen();
      } else {
        this._callOnClose();
      }
      (_a = this.swipeoutContent) == null ? void 0 : _a.measure((ox, oy, width) => {
        let buttonWidth = width / 5;
        this.setState({
          btnWidth: buttonWidth,
          btnsLeftWidth: this.props.left ? buttonWidth * this.props.left.length : 0,
          btnsRightWidth: this.props.right ? buttonWidth * this.props.right.length : 0,
          swiping: true,
          timeStart: (/* @__PURE__ */ new Date()).getTime()
        });
      });
    };
    this._handlePanResponderMove = (event, gestureState) => {
      if (this.props.disabled) return;
      let posX = gestureState.dx;
      let posY = gestureState.dy;
      const leftWidth = this.state.btnsLeftWidth;
      const rightWidth = this.state.btnsRightWidth;
      if (this.state.openedRight) posX = gestureState.dx - rightWidth;
      else if (this.state.openedLeft) posX = gestureState.dx + leftWidth;
      const moveX = Math.abs(posX) > Math.abs(posY);
      if (this.props.scroll) {
        if (moveX) this.props.scroll(false);
        else this.props.scroll(true);
      }
      if (this.state.swiping) {
        if (posX < 0 && this.props.right) {
          this.setState({
            backgroundColor: this.props.rightBackgroundColor
          });
          if (this.props.dragToCTA && this.props.right.length == 1 && -(rightWidth + 150) >= Math.round(Math.min(posX, 0))) {
            return this._debouncedOnCTA();
          }
          this.setState({ contentPos: Math.min(posX, 0) });
        } else if (posX > 0 && this.props.left) {
          this.setState({
            backgroundColor: this.props.leftBackgroundColor
          });
          if (this.props.dragToCTA && this.props.left.length == 1 && leftWidth + 70 <= Math.round(Math.max(posX, 0))) {
            return this._debouncedOnCTA();
          }
          this.setState({ contentPos: Math.max(posX, 0) });
        }
      }
    };
    this._handlePanResponderEnd = (event, gestureState) => {
      if (this.props.disabled) return;
      const posX = gestureState.dx;
      const contentPos = this.state.contentPos;
      const contentWidth = this.state.contentWidth;
      const btnsLeftWidth = this.state.btnsLeftWidth;
      const btnsRightWidth = this.state.btnsRightWidth;
      const openX = contentWidth * 0.33;
      let openLeft = posX > openX || posX > btnsLeftWidth / 2;
      let openRight = posX < -openX || posX < -btnsRightWidth / 2;
      if (this.state.openedRight) openRight = posX - openX < -openX;
      if (this.state.openedLeft) openLeft = posX + openX > openX;
      const timeDiff = (/* @__PURE__ */ new Date()).getTime() - this.state.timeStart < 200;
      if (timeDiff) {
        openRight = posX < -openX / 10 && !this.state.openedLeft;
        openLeft = posX > openX / 10 && !this.state.openedRight;
      }
      if (this.state.swiping) {
        if (openRight && contentPos < 0 && posX < 0) {
          this._open(-btnsRightWidth, "right");
        } else if (openLeft && contentPos > 0 && posX > 0) {
          this._open(btnsLeftWidth, "left");
        } else {
          this._close();
        }
      }
      if (this.props.scroll) this.props.scroll(true);
    };
    this._tweenContent = (state, endValue) => {
      this.setState({ [state]: endValue });
    };
    this._rubberBandEasing = (value, limit) => {
      if (value < 0 && value < limit) return limit - Math.pow(limit - value, 0.85);
      else if (value > 0 && value > limit) return limit + Math.pow(value - limit, 0.85);
      return value;
    };
    this._autoClose = (btn) => {
      if (this.state.autoClose) this._close();
      const { onPress } = btn;
      if (onPress) onPress();
    };
    this._open = (contentPos, direction) => {
      const left = direction === "left";
      const { sectionID, rowID, onOpen } = this.props;
      onOpen && onOpen(sectionID, rowID, direction);
      this._tweenContent("contentPos", contentPos);
      this.setState({
        contentPos,
        openedLeft: left,
        openedRight: !left,
        swiping: false
      });
    };
    this._close = () => {
      const { sectionID, rowID, onClose } = this.props;
      if (onClose && (this.state.openedLeft || this.state.openedRight)) {
        const direction = this.state.openedRight ? "right" : "left";
        onClose(sectionID, rowID, direction);
      }
      this._tweenContent("contentPos", 0);
      this._callOnClose();
      this.setState({
        openedRight: false,
        openedLeft: false,
        swiping: false
      });
    };
    this._callOnClose = () => {
      if (this.props.onClose) this.props.onClose(this.props.sectionID, this.props.rowID);
    };
    this._callOnOpen = () => {
      if (this.props.onOpen) this.props.onOpen(this.props.sectionID, this.props.rowID);
    };
    this._openRight = () => {
      var _a;
      (_a = this.swipeoutContent) == null ? void 0 : _a.measure((ox, oy, width) => {
        let btnWidth = width / 5;
        this.setState({
          btnWidth,
          btnsRightWidth: this.props.right ? btnWidth * this.props.right.length : 0
        }, () => {
          this._tweenContent("contentPos", -this.state.btnsRightWidth);
          this._callOnOpen();
          this.setState({
            contentPos: -this.state.btnsRightWidth,
            openedLeft: false,
            openedRight: true,
            swiping: false
          });
        });
      });
    };
    this._openLeft = () => {
      var _a;
      (_a = this.swipeoutContent) == null ? void 0 : _a.measure((ox, oy, width) => {
        let btnWidth = width / 5;
        this.setState({
          btnWidth,
          btnsLeftWidth: this.props.left ? btnWidth * this.props.left.length : 0
        }, () => {
          this._tweenContent("contentPos", this.state.btnsLeftWidth);
          this._callOnOpen();
          this.setState({
            contentPos: this.state.btnsLeftWidth,
            openedLeft: true,
            openedRight: false,
            swiping: false
          });
        });
      });
    };
    this._onLayout = (event) => {
      const { width, height } = event.nativeEvent.layout;
      this.setState({
        contentWidth: width,
        contentHeight: height
      });
    };
    this._renderButtons = (buttons, isVisible, style) => {
      if (buttons && isVisible) {
        return /* @__PURE__ */ React2.createElement(View2, { style }, buttons.map(this._renderButton));
      } else {
        return /* @__PURE__ */ React2.createElement(View2, null);
      }
    };
    this._renderButton = (btn, i) => {
      return /* @__PURE__ */ React2.createElement(
        SwipeoutBtn_default,
        {
          backgroundColor: btn.buttonBackgroundColor,
          color: btn.color,
          component: btn.component,
          disabled: btn.disabled,
          height: this.state.contentHeight,
          key: i,
          onPress: () => this._autoClose(btn),
          text: btn.text,
          type: btn.type,
          underlayColor: btn.underlayColor,
          width: this.state.btnWidth
        }
      );
    };
    this.state = {
      autoClose: this.props.autoClose || false,
      btnWidth: 0,
      btnsLeftWidth: 0,
      btnsRightWidth: 0,
      contentHeight: 0,
      contentPos: 0,
      contentWidth: 0,
      openedRight: false,
      openedLeft: false,
      swiping: false,
      tweenDuration: 160,
      timeStart: null,
      backgroundColor: ""
    };
    this._initializePanResponder();
  }
  componentDidMount() {
    this._initializePanResponder();
    if (this.props.autoOpenRight || this.props.autoOpenLeft) {
      this._handleSwipe();
    }
  }
  _initializePanResponder() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => this.state.openedLeft || this.state.openedRight,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => Math.abs(gestureState.dx) > this.props.sensitivity && Math.abs(gestureState.dy) <= this.props.sensitivity,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: () => false,
      onPanResponderTerminationRequest: () => false
    });
  }
  render() {
    const { style, children, right, left } = this.props;
    const contentWidth = this.state.contentWidth;
    const height = this.state.contentHeight;
    const posX = this.state.contentPos;
    const styleSwipeout = [styles2.swipeout, style];
    if (this.state.backgroundColor) {
      styleSwipeout.push({ backgroundColor: this.state.backgroundColor });
    }
    let limit = -this.state.btnsRightWidth;
    if (posX > 0) limit = this.state.btnsLeftWidth;
    const styleLeftPos = {
      left: {
        left: 0,
        overflow: "hidden",
        width: Math.min(limit * (posX / limit), limit)
      }
    };
    const styleRightPos = {
      right: {
        left: Math.abs(contentWidth + Math.max(limit, posX)),
        right: 0
      }
    };
    const styleContentPos = {
      content: {
        transform: [{ translateX: this._rubberBandEasing(posX, limit) }]
      }
    };
    const styleContent = [styles2.swipeoutContent];
    styleContent.push(styleContentPos.content);
    const styleRight = [styles2.swipeoutBtns];
    styleRight.push(styleRightPos.right);
    const styleLeft = [styles2.swipeoutBtns];
    styleLeft.push(styleLeftPos.left);
    const isRightVisible = posX < 0;
    const isLeftVisible = posX > 0;
    return /* @__PURE__ */ React2.createElement(
      View2,
      { style: styleSwipeout },
      /* @__PURE__ */ React2.createElement(
        View2,
        __spreadValues({
          ref: (node) => this.swipeoutContent = node,
          style: [styleContent],
          onLayout: this._onLayout
        }, this._panResponder.panHandlers),
        children
      ),
      //@ts-ignore
      this._renderButtons(right, isRightVisible, styleRight),
      //@ts-ignore
      this._renderButtons(left, isLeftVisible, styleLeft)
    );
  }
};
Swipeout.propTypes = {
  autoClose: PropTypes.bool,
  buttonBackgroundColor: PropTypes.string,
  close: PropTypes.bool,
  left: PropTypes.array,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  right: PropTypes.array,
  scroll: PropTypes.func,
  style: PropTypes.object,
  sensitivity: PropTypes.number,
  buttonWidth: PropTypes.number,
  disabled: PropTypes.bool,
  autoOpenRight: PropTypes.bool,
  onCTA: PropTypes.func
};
Swipeout.defaultProps = {
  disabled: false,
  rowID: -1,
  sectionID: -1,
  sensitivity: 50
};
var styles2 = StyleSheet2.create({
  swipeout: {
    overflow: "hidden"
  },
  swipeoutContent: {
    flex: 1
  },
  swipeoutBtns: {
    position: "absolute",
    top: 0,
    bottom: 0,
    flexDirection: "row"
  }
});
var SwipeoutComponent_default = Swipeout;
export {
  SwipeoutComponent_default as Swipeout
};
