//
//  BluetoothManager.swift
//  BLEApp
//
//  Created by Vedant Alimchandani on 12/03/24.
//

import SwiftUI
import CoreBluetooth
import React

@objc(BluetoothManager)
class BluetoothManager: NSObject, ObservableObject {
  @objc static func requiresMainQueueSetup() -> Bool {
      return true
  }
  private var centralManager: CBCentralManager?
  private var peripherals: [CBPeripheral] = []
  var peripheralInfos: [PeripheralInfo] = []
  private var peripheralQueue = PriorityQueue<PeripheralInfo>(priorityFunction: { $0.rssi.intValue > $1.rssi.intValue })
  private var timer: Timer?
  private var  isScanning = false
  
//  private var bridge: RCTBridge?
//
//  init(bridge: RCTBridge) {
//    super.init()
//    self.bridge = bridge
//  }

  override init() {
      super.init()
      self.centralManager = CBCentralManager(delegate: self, queue: .main)
  }
  
  private func startTimer() {
      timer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: #selector(sendDataToReactNative), userInfo: nil, repeats: true)
  }
//  private func stopTimer() {
//    timer?.invalidate()
//  }
// 
  @objc private func sendDataToReactNative() {
      NSLog("5 seconds over")
      
      while !peripheralQueue.isEmpty {
          if let peripheral = peripheralQueue.dequeue() {
              // Convert peripheral to a format suitable for sending to React Native
            let peripheralData: [String: Any] = ["name": peripheral.name ?? "", "address": peripheral.address, "rssi": peripheral.rssi, "uuid": peripheral.uuid.uuidString, "state": peripheral.state]
              
              // Send data to React Native for each peripheral
              if let bridge = RCTBridge.current() {
                  let reactData = peripheralData
                  bridge.enqueueJSCall("RCTDeviceEventEmitter.emit", args: ["BLEScanResultFromIOS", reactData])
              }
          }
      }
      
      peripheralQueue.clear()
  }

//  @objc func sendStringToReactNative(_ message: String) {
//      if let bridge = RCTBridge.current() {
//          let reactData = ["message": message]
//          bridge.enqueueJSCall("RCTDeviceEventEmitter.emit", args: ["TestEvent", reactData])
//      }
//  }
  
  
  @objc func startScanning() {
//          if !isScanning {
          centralManager?.scanForPeripherals(withServices: nil)
          isScanning = true
          startTimer()
//          }
      }
      
      @objc func stopScanning() {
          if isScanning {
            centralManager?.stopScan()
            isScanning = false
            peripheralInfos.removeAll()
            peripherals.removeAll()
//            stopTimer()
          }
        peripherals.removeAll()
      }
  
  @objc func connectToDevice(_ address: String) {
    NSLog("Trying to connect to \(address) ...")
          guard let uuid = UUID(uuidString: address) else {
              NSLog("Invalid UUID")
              return
          }
        
          if let peripheral = peripherals.first(where: { $0.identifier == uuid }) {
              centralManager?.connect(peripheral, options: nil)
          } else {
              NSLog("Peripheral with UUID \(address) not found")
          }
      }
  func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
          NSLog("Connected to peripheral: \(peripheral)")
          // Here you can perform any necessary tasks after successful connection, such as discovering services, characteristics, etc.
      }
    
      func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
          NSLog("Failed to connect to peripheral: \(peripheral), error: \(error?.localizedDescription ?? "Unknown error")")
          // Handle the failure to connect here, such as displaying an alert to the user or retrying the connection.
      }
    
      func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
          NSLog("Disconnected from peripheral: \(peripheral), error: \(error?.localizedDescription ?? "Unknown error")")
          // Handle disconnection events here, such as reconnection attempts or updating UI state.
      }
}

extension BluetoothManager: CBCentralManagerDelegate {
  

  func centralManagerDidUpdateState(_ central: CBCentralManager) {
          if central.state == .poweredOn {
            startScanning()
            stopScanning()
            
          }
      }
  
  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
          if !peripherals.contains(peripheral) {
              self.peripherals.append(peripheral)
              NSLog("Discovered Peripheral: \(peripheral)")
          }
    let name = peripheral.name ?? "Unnamed Device"
        let address = peripheral.identifier.uuidString
        let uuid = peripheral.identifier
        let state = peripheral.state.rawValue
    let peripheralInfo = PeripheralInfo(name: name, address: address, rssi: RSSI, uuid: uuid, state: state)
        
        if !peripheralInfos.contains(where: { $0.address == address }) {
            peripheralInfos.append(peripheralInfo)
          peripheralQueue.enqueue(peripheralInfo)
//          NSLog("Discovered peripheral: \(peripheralInfo)")
        }
      }

//    private func displayBluetoothOffAlert() {
//      DispatchQueue.main.async {
//          let alertController = UIAlertController(title: "Bluetooth Turned Off", message: "Please turn on Bluetooth in Settings to use this feature", preferredStyle: .alert)
//          alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
//          UIApplication.shared.keyWindow?.rootViewController?.present(alertController, animated: true, completion: nil)
//      }
//    }
//
//    private func displayBluetoothPermissionAlert() {
//      DispatchQueue.main.async {
//        let alert = UIAlertController(title: "Bluetooth Permission Denied", message: "Please enable Bluetooth permission in app settings to use this feature.", preferredStyle: .alert)
//        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
//        UIApplication.shared.keyWindow?.rootViewController?.present(alert, animated: true, completion: nil)
//      }
//    }
//
//    private func displayBluetoothUnsupportedAlert() {
//      DispatchQueue.main.async {
//        let alert = UIAlertController(title: "Bluetooth Unsupported", message: "Your device does not support Bluetooth, and this app will not work as expected.", preferredStyle: .alert)
//        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
//        UIApplication.shared.keyWindow?.rootViewController?.present(alert, animated: true, completion: nil)
//      }
//    }
  
  struct PeripheralInfo {
      let name: String?
      let address: String
      let rssi: NSNumber
      let uuid: UUID
      let state: Int
  }
  
  struct PriorityQueue<T> {
      private var elements: [T]
      private let priorityFunction: (T, T) -> Bool

      init(priorityFunction: @escaping (T, T) -> Bool) {
          self.elements = []
          self.priorityFunction = priorityFunction
      }

      var isEmpty: Bool {
          return elements.isEmpty
      }

      mutating func enqueue(_ element: T) {
          elements.append(element)
          elements.sort(by: { priorityFunction($0, $1) })
      }

      mutating func dequeue() -> T? {
          return isEmpty ? nil : elements.removeFirst()
      }

      mutating func clear() {
          elements.removeAll()
      }
  }
}
