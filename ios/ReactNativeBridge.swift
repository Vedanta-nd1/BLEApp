//
//  ReactNativeBridge.swift
//  BLEApp
//
//  Created by Vedant Alimchandani on 15/03/24.
//

import React

@objc(ReactNativeBridge)
class ReactNativeBridge: NSObject {
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    // Method to send a string to React Native
    @objc func sendStringToReactNative(_ message: String) {
        if let bridge = RCTBridge.current() {
            let reactData = ["message": message]
            bridge.enqueueJSCall("RCTDeviceEventEmitter.emit", args: ["TestEvent", reactData])
        }
    }
    
    
}

