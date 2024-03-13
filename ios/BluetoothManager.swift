//
//  BluetoothManager.swift
//  BLEApp
//
//  Created by Vedant Alimchandani on 12/03/24.
//

import Foundation
import UIKit
import CoreBluetooth

@objc(BluetoothManager) class BluetoothManager: UIViewController {
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  private var centralManager: CBCentralManager!

  override func viewDidLoad() {
    super.viewDidLoad()
    centralManager = CBCentralManager(delegate: self, queue: nil)
  }
  
  var discoveredPeripherals = [CBPeripheral]()
  
  @objc
  func startScanning() {
    guard centralManager != nil else {
        NSLog("Error: Bluetooth not Available.")
        return
    }
    centralManager.scanForPeripherals(withServices: nil, options: nil)
    NSLog("scan started!")
  }
}

extension BluetoothManager: CBCentralManagerDelegate {
  
  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
    self.discoveredPeripherals.append(peripheral)
    
    for peripheral in discoveredPeripherals {
        NSLog("Discovered Peripheral: \(peripheral)")
    }
  }
 
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
      switch central.state {
          case .poweredOn:
              startScanning()
          case .poweredOff:
              displayBluetoothOffAlert()
          case .resetting:
              break
              // Wait for next state update and consider logging interruption of Bluetooth service
          case .unauthorized:
              displayBluetoothPermissionAlert()
              // Alert user to enable Bluetooth permission in app Settings
          case .unsupported:
              displayBluetoothUnsupportedAlert()
              // Alert user their device does not support Bluetooth and app will not work as expected
          case .unknown:
              break
             // Wait for next state update
          @unknown default:
              fatalError()
      }
  }
  
    private func displayBluetoothOffAlert() {
        let alert = UIAlertController(title: "Bluetooth Turned Off", message: "Please turn on Bluetooth in Settings to use this feature.", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
    private func displayBluetoothPermissionAlert() {
        let alert = UIAlertController(title: "Bluetooth Permission Denied", message: "Please enable Bluetooth permission in app settings to use this feature.", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
    
    private func displayBluetoothUnsupportedAlert() {
        let alert = UIAlertController(title: "Bluetooth Unsupported", message: "Your device does not support Bluetooth, and this app will not work as expected.", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
}
