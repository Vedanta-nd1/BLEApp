//
//  RCTCalendarModule.m
//  BLEApp
//
//  Created by Vedant Alimchandani on 11/03/24.
//

#import <Foundation/Foundation.h>

#import "RCTCalendarModule.h"
#import <React/RCTLog.h>


@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);

}

@end
