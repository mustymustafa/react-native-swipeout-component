import React, { Component } from 'react';
import {
  PanResponder,
  View,
  ViewStyle,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import PropTypes from 'prop-types';
import SwipeoutBtn from './SwipeoutBtn';
import { debounce } from 'lodash';

interface SwipeoutProps {
  autoClose?: boolean;
  buttonBackgroundColor?: string;
  leftBackgroundColor?: string;
  rightBackgroundColor?: string;
  close?: boolean;
  left?: Array<any>;
  onOpen?: (sectionID?: number, rowID?: number, direction?: string) => void;
  onClose?: (sectionID?: number, rowID?: number, direction?: string) => void;
  right?: Array<any>;
  scroll?: (scrollEnabled: boolean) => void;
  style?: ViewStyle;
  sensitivity?: number;
  buttonWidth?: number;
  disabled?: boolean;
  autoOpenRight?: boolean;
  autoOpenLeft?: boolean;
  //autoOpenBoth?: boolean;
  timeout?: number;
  children?: React.ReactNode
  dragToCTA?: boolean
  onCTA?: () => void;
}

interface SwipeoutState {
  autoClose: boolean;
  btnWidth: number;
  btnsLeftWidth: number;
  btnsRightWidth: number;
  contentHeight: number;
  contentPos: number;
  contentWidth: number;
  openedRight: boolean;
  swiping: boolean;
  tweenDuration: number;
  timeStart: number | null;
  backgroundColor: string;
}

class Swipeout extends Component<SwipeoutProps, SwipeoutState> {
  static propTypes = {
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

  static defaultProps = {
    disabled: false,
    rowID: -1,
    sectionID: -1,
    sensitivity: 50,
  };

  private _panResponder: any;
  private swipeoutContent: View | null = null;

  constructor(props: SwipeoutProps) {
    super(props);

    this.state = {
      autoClose: this.props.autoClose || false,
      btnWidth: 0,
      btnsLeftWidth: 0,
      btnsRightWidth: 0,
      contentHeight: 0,
      contentPos: 0,
      contentWidth: 0,
      openedRight: false,
      swiping: false,
      tweenDuration: 160,
      timeStart: null,
      backgroundColor: ''
    };
    this._initializePanResponder();
  }

  componentDidMount() {
    this._initializePanResponder()
    if (this.props.autoOpenRight || this.props.autoOpenLeft || this.props.autoOpenBoth) {
      this._handleSwipe()
    }

  }

  private _initializePanResponder() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () =>
        this.state.openedLeft || this.state.openedRight,
      onMoveShouldSetPanResponderCapture: (event, gestureState) =>
        Math.abs(gestureState.dx) > this.props.sensitivity &&
        Math.abs(gestureState.dy) <= this.props.sensitivity,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: () => false,
      onPanResponderTerminationRequest: () => false,
    });
  }




  _handleSwipe = () => {

    if (this.props.autoOpenRight && !this.props.disabled && this.props.buttonWidth) {
      this._autoOpenRight()
    }

    if (this.props.autoOpenLeft && !this.props.disabled && this.props.buttonWidth) {
      this._autoOpenLeft()
    }


   /**
    * if (this.props.autoOpenBoth && !this.props.disabled && this.props.buttonWidth) {
      this._autoOpenBoth()
    }
    *  */ 
  }


/**
 *   _autoOpenBoth = () => {
    this._autoOpenRight()
    setTimeout(() => {
      this.setState({
        contentPos: 0,
        btnsLeftWidth: 0
      });
    }, this.props.timeout)
    this._autoOpenLeft()

  }

 */


  _autoOpenRight = () => {

    setTimeout(() => {
      this.setState({
        contentPos: -this.props.buttonWidth / 2,
        btnsRightWidth: this.props.buttonWidth / 2
      });
    }, 500)
  
    setTimeout(() => {
      this.setState({
        contentPos: 0,
        btnsRightWidth: 0
      });
    }, this.props.timeout)
  }

  _autoOpenLeft = () => {
    setTimeout(() => {
    this.setState({
      contentPos: this.props.buttonWidth / 2,
      btnsLeftWidth: this.props.left ? this.props.buttonWidth / 2 * this.props.left.length : 0,
    });
  }, 500)

    setTimeout(() => {
      this.setState({
        contentPos: 0,
        btnsLeftWidth: 0
      });
    }, this.props.timeout)

  }




   _debouncedOnCTA = debounce(() => this.props.onCTA(), 300);

  _handlePanResponderGrant = () => {
    if (this.props.disabled) return;
    if (!this.state.openedLeft && !this.state.openedRight) {
      this._callOnOpen();
    } else {
      this._callOnClose();
    }
    this.swipeoutContent?.measure((ox, oy, width) => {
      let buttonWidth = (width / 5);
      this.setState({
        btnWidth: buttonWidth,
        btnsLeftWidth: this.props.left ? buttonWidth * this.props.left.length : 0,
        btnsRightWidth: this.props.right ? buttonWidth * this.props.right.length : 0,
        swiping: true,
        timeStart: (new Date()).getTime(),
      });
    });
  }

  _handlePanResponderMove = (event: any, gestureState: any) => {
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
        backgroundColor: this.props.rightBackgroundColor,
      })
        if(this.props.dragToCTA &&  this.props.right.length == 1 && (-(rightWidth + 150)) >=  (Math.round(Math.min(posX, 0)))){
          
        return  this._debouncedOnCTA()
        } 
        this.setState({ contentPos: Math.min(posX, 0) });
      } else if (posX > 0 && this.props.left) {
        this.setState({
          backgroundColor: this.props.leftBackgroundColor,
        })
        if(this.props.dragToCTA && this.props.left.length == 1 && (leftWidth + 70)  <=  (Math.round(Math.max(posX, 0)))){
      
          return this._debouncedOnCTA()
        }
        this.setState({ contentPos: Math.max(posX, 0) });

      }
    }
  }

  _handlePanResponderEnd = (event: any, gestureState: any) => {
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

    const timeDiff = (new Date()).getTime() - this.state.timeStart! < 200;
    if (timeDiff) {
      openRight = posX < -openX / 10 && !this.state.openedLeft;
      openLeft = posX > openX / 10 && !this.state.openedRight;
    }

    if (this.state.swiping) {
      if (openRight && contentPos < 0 && posX < 0) {
        this._open(-btnsRightWidth, 'right');
        
      } else if (openLeft && contentPos > 0 && posX > 0) {
        this._open(btnsLeftWidth, 'left');
        
      } else {
        this._close();
      }
    }

    if (this.props.scroll) this.props.scroll(true);
  }

  _tweenContent = (state: string, endValue: number) => {
    this.setState({ [state]: endValue } as Pick<SwipeoutState, keyof SwipeoutState>);
  }

  _rubberBandEasing = (value: number, limit: number) => {
    if (value < 0 && value < limit) return limit - Math.pow(limit - value, 0.85);
    else if (value > 0 && value > limit) return limit + Math.pow(value - limit, 0.85);
    return value;
  }

  _autoClose = (btn: any) => {
    if (this.state.autoClose) this._close();
    const { onPress } = btn;
    if (onPress) onPress();
  }

  _open = (contentPos: number, direction: string) => {
    const left = direction === 'left';
    const { sectionID, rowID, onOpen } = this.props;
    onOpen && onOpen(sectionID, rowID, direction);
    this._tweenContent('contentPos', contentPos);
    this.setState({
      contentPos,
      openedLeft: left,
      openedRight: !left,
      swiping: false,
    });
  }

  _close = () => {
    const { sectionID, rowID, onClose } = this.props;
    if (onClose && (this.state.openedLeft || this.state.openedRight)) {
      const direction = this.state.openedRight ? 'right' : 'left';
      onClose(sectionID, rowID, direction);
    }
    this._tweenContent('contentPos', 0);
    this._callOnClose();
    this.setState({
      openedRight: false,
      openedLeft: false,
      swiping: false,
    });
  }

  _callOnClose = () => {
    if (this.props.onClose) this.props.onClose(this.props.sectionID, this.props.rowID);
  }

  _callOnOpen = () => {
    if (this.props.onOpen) this.props.onOpen(this.props.sectionID, this.props.rowID);
  }

  _openRight = () => {
    this.swipeoutContent?.measure((ox, oy, width) => {
      let btnWidth = (width / 5);

      this.setState({
        btnWidth,
        btnsRightWidth: this.props.right ? btnWidth * this.props.right.length : 0,
      }, () => {

        this._tweenContent('contentPos', -this.state.btnsRightWidth);
        this._callOnOpen();
        this.setState({
          contentPos: -this.state.btnsRightWidth,
          openedLeft: false,
          openedRight: true,
          swiping: false
        });
      });
    });
  }

  _openLeft = () => {
    this.swipeoutContent?.measure((ox, oy, width) => {
      let btnWidth = (width / 5);

      this.setState({
        btnWidth,
        btnsLeftWidth: this.props.left ? btnWidth * this.props.left.length : 0,
      }, () => {
        this._tweenContent('contentPos', this.state.btnsLeftWidth);
        this._callOnOpen();
        this.setState({
          contentPos: this.state.btnsLeftWidth,
          openedLeft: true,
          openedRight: false,
          swiping: false
        });
      });
    });
  }

  _onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      contentWidth: width,
      contentHeight: height,
    });
  }

  _renderButtons = (buttons: any[], isVisible: boolean, style: ViewStyle) => {
    if (buttons && isVisible) {
      return (<View style={style}>
        {buttons.map(this._renderButton)}
      </View>);
    } else {
      return (
        <View />
      );
    }
  }

  _renderButton = (btn: any, i: number) => {
    return (
      <SwipeoutBtn
        backgroundColor={btn.buttonBackgroundColor}
        color={btn.color}
        component={btn.component}
        disabled={btn.disabled}
        height={this.state.contentHeight}
        key={i}
        onPress={() => this._autoClose(btn)}
        text={btn.text}
        type={btn.type}
        underlayColor={btn.underlayColor}
        width={this.state.btnWidth}
      />
    );
  }

  render() {
    const {  style, children, right, left } = this.props;
    const contentWidth = this.state.contentWidth;
    const height = this.state.contentHeight
    const posX = this.state.contentPos;


    const styleSwipeout = [styles.swipeout, style];
    if (this.state.backgroundColor) {
      styleSwipeout.push({ backgroundColor: this.state.backgroundColor,});
    }

    let limit = -this.state.btnsRightWidth;
    if (posX > 0) limit = this.state.btnsLeftWidth;

    const styleLeftPos = {
      left: {
        left: 0,
        overflow: 'hidden',
        width: Math.min(limit * (posX / limit), limit),
      },
    };
    const styleRightPos = {
      right: {
        left: Math.abs(contentWidth + Math.max(limit, posX)),
        right: 0,
      },
    };
    const styleContentPos = {
      content: {
        transform: [{ translateX: this._rubberBandEasing(posX, limit) }],
      },
    };

    const styleContent = [styles.swipeoutContent];
    styleContent.push(styleContentPos.content);

    const styleRight = [styles.swipeoutBtns];
    styleRight.push(styleRightPos.right);

    const styleLeft = [styles.swipeoutBtns];
    styleLeft.push(styleLeftPos.left);

    const isRightVisible = posX < 0;
    const isLeftVisible = posX > 0;

    return (
      <View style={styleSwipeout}>
        <View
          ref={node => (this.swipeoutContent = node)}
          style={[styleContent]}
          onLayout={this._onLayout}
          {...this._panResponder.panHandlers}
        >
          {children}
        </View>
        {this._renderButtons(right, isRightVisible, styleRight)}
        {this._renderButtons(left, isLeftVisible, styleLeft)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swipeout: {
    overflow: 'hidden',
  },
  swipeoutContent: {
    flex: 1,
  },
  swipeoutBtns: {
    position: 'absolute',
    top: 10,
    bottom: 0,
    flexDirection: 'row',
  },
});

export default Swipeout;
