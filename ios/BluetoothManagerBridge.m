//
//  BluetoothManagerBridge.m
//  BLEApp
//
//  Created by Vedant Alimchandani on 12/03/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(BluetoothManager, NSObject)

RCT_EXTERN_METHOD(startScanning)

RCT_EXTERN_METHOD(stopScanning)

//RCT_EXTERN_METHOD(sendStringToReactNative:(NSString *)message)

RCT_EXTERN_METHOD(connectToDevice:(NSString *)address)


@end
