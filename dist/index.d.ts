import * as lodash from 'lodash';
import React, { Component } from 'react';
import { LayoutChangeEvent, ViewStyle } from 'react-native';
import PropTypes from 'prop-types';

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
    timeout?: number;
    children?: React.ReactNode;
    dragToCTA?: boolean;
    onCTA?: () => void;
    rowID?: number;
    sectionID?: number;
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
    openedLeft: boolean;
    swiping: boolean;
    tweenDuration: number;
    timeStart: number | null;
    backgroundColor: string;
}
declare class Swipeout extends Component<SwipeoutProps, SwipeoutState> {
    static propTypes: {
        autoClose: PropTypes.Requireable<boolean>;
        buttonBackgroundColor: PropTypes.Requireable<string>;
        close: PropTypes.Requireable<boolean>;
        left: PropTypes.Requireable<any[]>;
        onOpen: PropTypes.Requireable<(...args: any[]) => any>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        right: PropTypes.Requireable<any[]>;
        scroll: PropTypes.Requireable<(...args: any[]) => any>;
        style: PropTypes.Requireable<object>;
        sensitivity: PropTypes.Requireable<number>;
        buttonWidth: PropTypes.Requireable<number>;
        disabled: PropTypes.Requireable<boolean>;
        autoOpenRight: PropTypes.Requireable<boolean>;
        onCTA: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        disabled: boolean;
        rowID: number;
        sectionID: number;
        sensitivity: number;
    };
    private _panResponder;
    private swipeoutContent;
    constructor(props: SwipeoutProps);
    componentDidMount(): void;
    private _initializePanResponder;
    _handleSwipe: () => void;
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
    _autoOpenRight: () => void;
    _autoOpenLeft: () => void;
    _debouncedOnCTA: lodash.DebouncedFunc<() => void>;
    _handlePanResponderGrant: () => void;
    _handlePanResponderMove: (event: any, gestureState: any) => void;
    _handlePanResponderEnd: (event: any, gestureState: any) => void;
    _tweenContent: (state: string, endValue: number) => void;
    _rubberBandEasing: (value: number, limit: number) => number;
    _autoClose: (btn: any) => void;
    _open: (contentPos: number, direction: string) => void;
    _close: () => void;
    _callOnClose: () => void;
    _callOnOpen: () => void;
    _openRight: () => void;
    _openLeft: () => void;
    _onLayout: (event: LayoutChangeEvent) => void;
    _renderButtons: (buttons: any[], isVisible: boolean, style: ViewStyle) => React.JSX.Element;
    _renderButton: (btn: any, i: number) => React.JSX.Element;
    render(): React.JSX.Element;
}

export { Swipeout };
