package com.bleapp

import android.bluetooth.BluetoothAdapter
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class PermissionsModule (reactContext : ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "PermissionsModule"
    }

//    @ReactMethod
//    fun navigateToMainActivity() {
//        Log.d("custom_text", "navigateToMainActivity: ")
//        val context = reactApplicationContext
//        val intent = Intent(context, MainActivity::class.java)
//        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
//        context.startActivity(intent)
//    }

    @RequiresApi(Build.VERSION_CODES.S)
    @ReactMethod
    fun startScanning() {
        val mainActivity = currentActivity as MainActivity?
        mainActivity?.startBleScan()
    }

    @RequiresApi(Build.VERSION_CODES.S)
    @ReactMethod
    fun stopScanning() {
        val mainActivity = currentActivity as MainActivity?
        mainActivity?.stopBleScan()
    }

    @ReactMethod
    fun connectToDevice(address: String) {
        val mainActivity = currentActivity as MainActivity?
        mainActivity?.connectToDevice(address)
    }
}