//
//  AlertManager.swift
//  BLEApp
//
//  Created by Vedant Alimchandani on 14/03/24.
//

import Foundation
import UIKit

@objc(CustomAlertManager)
class CustomAlertManager: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
      return true
  }
    @objc
    func showAlert(_ message: String) {
        DispatchQueue.main.async {
            let alertController = UIAlertController(title: "Alert", message: message, preferredStyle: .alert)
            alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
            UIApplication.shared.keyWindow?.rootViewController?.present(alertController, animated: true, completion: nil)
        }
    }
}
