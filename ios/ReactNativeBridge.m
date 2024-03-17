//
//  ReactNativeBridge.m
//  BLEApp
//
//  Created by Vedant Alimchandani on 15/03/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(ReactNativeBridge, NSObject)
RCT_EXTERN_METHOD(sendStringToReactNative:(NSString *)message)
@end
