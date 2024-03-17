//
//  AlertManagerBridge.m
//  BLEApp
//
//  Created by Vedant Alimchandani on 14/03/24.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CustomAlertManager, NSObject)

RCT_EXTERN_METHOD(showAlert:(NSString *)message)

@end
