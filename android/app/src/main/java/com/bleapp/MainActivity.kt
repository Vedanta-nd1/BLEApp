package com.bleapp

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothGatt
import android.bluetooth.BluetoothGattCallback
import android.bluetooth.BluetoothManager
import android.bluetooth.BluetoothProfile
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.*
import kotlin.collections.ArrayList

private const val ENABLE_BLUETOOTH_REQUEST_CODE = 1
private const val RUNTIME_PERMISSION_REQUEST_CODE = 2
const val TAG = "custom_tag"

@Suppress("DEPRECATION")
class MainActivity : ReactActivity() {
    private var timer: Timer? = null
    private var timerTask: TimerTask? = null

    private fun startTimer() {
        // Schedule the timer task to run every 5 seconds
        timer = Timer()
        timerTask = MyTimerTask()
        timer?.scheduleAtFixedRate(timerTask, 0, 5000)
    }

    private fun stopTimer() {
        // Cancel the timer and timer task
        timer?.cancel()
        timerTask?.cancel()
    }

    inner class MyTimerTask : TimerTask() {
        @RequiresApi(Build.VERSION_CODES.N)
        override fun run() {
            // This code will run periodically
            Log.d("timer", "Timer over")
            // Call your function here
            scanCallback.startBatchProcessing()
        }
    }

    private var isScanning = false
    private val bluetoothAdapter: BluetoothAdapter by lazy {
        val bluetoothManager = getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
        bluetoothManager.adapter
    }

    @RequiresApi(Build.VERSION_CODES.S)
    override fun onResume() {
        super.onResume()
        if (!bluetoothAdapter.isEnabled) {
            promptEnableBluetooth()
        }
    }

    @Suppress("DEPRECATION")
    @RequiresApi(Build.VERSION_CODES.S)
    private fun promptEnableBluetooth() {
//        Log.d(TAG, "promptEnableBluetooth: ${bluetoothAdapter.name} ")
        if (!bluetoothAdapter.isEnabled) {
            val enableBtIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.BLUETOOTH_CONNECT
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                ActivityCompat.requestPermissions(this@MainActivity, arrayOf(
                    Manifest.permission.BLUETOOTH_CONNECT,
                ), 0)
                return
            }
            startActivityForResult(enableBtIntent, ENABLE_BLUETOOTH_REQUEST_CODE)
        }
        else {
            Log.d(TAG, "promptEnableBluetooth: bt is enabled")
        }
    }
    @RequiresApi(Build.VERSION_CODES.S)
    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        when (requestCode) {
            ENABLE_BLUETOOTH_REQUEST_CODE -> {
                if (resultCode != Activity.RESULT_OK) {
                    promptEnableBluetooth()
                }
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.S)
    fun startBleScan() {
        if (!hasRequiredRuntimePermissions() || !bluetoothAdapter.isEnabled) {
            Log.d(TAG, "startBleScan: bt disabled. Please enable!")
            requestRelevantRuntimePermissions()
            promptEnableBluetooth()
        } else { /*
            TODO: Actually perform scan */
            Log.d(TAG, "startBleScan: scan started!")

            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.BLUETOOTH_SCAN
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                return
            }
            bleScanner.startScan(null, scanSettings, scanCallback)
            isScanning = true
            startTimer()
        }
    }


    private fun Context.hasPermission(permissionType: String): Boolean {
        return ContextCompat.checkSelfPermission(this, permissionType) ==
                PackageManager.PERMISSION_GRANTED
    }

    private fun Context.hasRequiredRuntimePermissions(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            hasPermission(Manifest.permission.BLUETOOTH_SCAN) &&
                    hasPermission(Manifest.permission.BLUETOOTH_CONNECT)
        } else {
            hasPermission(Manifest.permission.ACCESS_FINE_LOCATION)
        }
    }

    private fun Activity.requestRelevantRuntimePermissions() {
        if (hasRequiredRuntimePermissions()) { return }
        when {
            Build.VERSION.SDK_INT < Build.VERSION_CODES.S -> {
                requestLocationPermission()
            }
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
                requestBluetoothPermissions()
            }
        }
    }

    private fun requestLocationPermission() {
        runOnUiThread {
            val alertDialogBuilder = AlertDialog.Builder(this@MainActivity) // Replace YourActivity with your actual activity name
            alertDialogBuilder.apply {
                setTitle("Location permission required")
                setMessage("Starting from Android M (6.0), the system requires apps to be granted " +
                        "location access in order to scan for BLE devices.")
                setCancelable(false)
                setPositiveButton(android.R.string.ok) { dialog, _ ->
                    ActivityCompat.requestPermissions(
                        this@MainActivity, // Make sure to replace YourActivity with your actual activity name
                        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                        RUNTIME_PERMISSION_REQUEST_CODE
                    )
                    dialog.dismiss()
                }
            }
            val alertDialog = alertDialogBuilder.create()
            alertDialog.show()
        }
    }

    @RequiresApi(Build.VERSION_CODES.S)
    private fun requestBluetoothPermissions() {
        runOnUiThread {
            val alertDialogBuilder = AlertDialog.Builder(this@MainActivity) // Replace YourActivity with your actual activity name
            alertDialogBuilder.apply {
                setTitle("Bluetooth permissions required")
                setMessage("Starting from Android 12, the system requires apps to be granted " +
                        "Bluetooth access in order to scan for and connect to BLE devices.")
                setCancelable(false)
                setPositiveButton(android.R.string.ok) { dialog, _ ->
                    ActivityCompat.requestPermissions(
                        this@MainActivity, // Make sure to replace YourActivity with your actual activity name
                        arrayOf(
                            Manifest.permission.BLUETOOTH_SCAN,
                            Manifest.permission.BLUETOOTH_CONNECT
                        ),
                        RUNTIME_PERMISSION_REQUEST_CODE
                    )
                    dialog.dismiss()
                }
            }
            val alertDialog = alertDialogBuilder.create()
            alertDialog.show()
        }
    }








//    val filter = ScanFilter.Builder().setServiceUuid(
//        ParcelUuid.fromString(ENVIRONMENTAL_SERVICE_UUID.toString())
//    ).build()

    private val bleScanner by lazy {
        bluetoothAdapter.bluetoothLeScanner
    }

    private val scanSettings = ScanSettings.Builder()
        .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
        .build()

    private val BLE_SCAN_RESULT_EVENT = "BLEScanResult"

    @RequiresApi(Build.VERSION_CODES.N)
    private val scanCallback = object : ScanCallback() {
        @RequiresApi(Build.VERSION_CODES.N)
        private val uniqueAddresses: MutableSet<String> = HashSet()

        override fun onScanResult(callbackType: Int, result: ScanResult) {
            super.onScanResult(callbackType, result)
            with(result.device) {
                if (ActivityCompat.checkSelfPermission(
                        this@MainActivity,
                        Manifest.permission.BLUETOOTH_CONNECT
                    ) != PackageManager.PERMISSION_GRANTED
                ) {
                    // Permission not granted
                    return
                }

                // Check if the address is already in the set of unique addresses
                if (!uniqueAddresses.contains(address)) {
                    // Emitting the scan result to React Native side
                    val scanResultMap = Arguments.createMap()
                    scanResultMap.putString("name", name ?: "Unnamed")
                    scanResultMap.putString("address", address)
                    // Add other parameters as needed
                    val rssi = result.rssi
                    scanResultMap.putInt("rssi", rssi)

                    // Adding raw data
                    val scanRecordBytes = result.scanRecord?.bytes
                    if (scanRecordBytes != null) {
                        val rawData = StringBuilder()
                        var lastIndex = scanRecordBytes.size - 1
                        while (lastIndex >= 0 && scanRecordBytes[lastIndex].toInt() == 0) {
                            lastIndex--
                        }
                        for (i in 0..lastIndex) {
                            rawData.append(String.format("0x%02X\t", scanRecordBytes[i]))
                        }
                        scanResultMap.putString("rawData", rawData.toString())
                    }

                    Log.d("ScanResult1", "Scan result added to queue")
                    synchronized(scanResultQueue) {
                        scanResultQueue.add(scanResultMap)
                        uniqueAddresses.add(address)
                        if (scanResultQueue.size > 15) {
                            val removedScanResult = scanResultQueue.poll() // Remove lowest RSSI if queue size exceeds 20
                            // Remove the address from the set to ensure uniqueness
                            removedScanResult?.getString("address")?.let { uniqueAddresses.remove(it) }
                        }
                    }
                }
            }
        }

        private val scanResultQueue: PriorityQueue<WritableMap> = PriorityQueue(compareBy { it.getDouble("rssi") })
        private var isBatchProcessing: Boolean = false

        fun startBatchProcessing() {
            isBatchProcessing = true
            try {
                val batchToSend = synchronized(scanResultQueue) {
                    val batch = ArrayList(scanResultQueue)
                    scanResultQueue.clear()
                    batch
                }
                if (batchToSend.isNotEmpty()) {
                    sendBatch(batchToSend)
                    batchToSend.clear()
                    uniqueAddresses.clear()
                } else {
                    stopBatchProcessing()
                }
            } catch (e: Exception) {
                // Handle any exceptions, e.g., log them
                e.printStackTrace()
            }
        }

        @SuppressLint("VisibleForTests")
        private fun sendBatch(batchToSend: List<WritableMap>) {
            try {

                // Get the DeviceEventManagerModule
                val deviceEventEmitter = reactInstanceManager?.currentReactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)

                // Emit each WritableMap individually
                batchToSend.forEach { writableMap ->
                    deviceEventEmitter?.emit(BLE_SCAN_RESULT_EVENT, writableMap)
                }
            } catch (e: Exception) {
                // Handle any exceptions, e.g., log them
                e.printStackTrace()
            }
        }

        private fun stopBatchProcessing() {
            isBatchProcessing = false
        }



    }

    @RequiresApi(Build.VERSION_CODES.N)
    fun stopBleScan() {
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.BLUETOOTH_SCAN
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            return
        }
        stopTimer()
        bleScanner.stopScan(scanCallback)
        isScanning = false
    }

    @RequiresApi(Build.VERSION_CODES.N)
    fun connectToDevice(address: String) {
        // Connect to the device using the provided address
        // Example code for connecting to the device
        val device = BluetoothAdapter.getDefaultAdapter().getRemoteDevice(address)
        stopBleScan()
        Log.d("Connext", "Connecting to ${device.name ?: "Unnamed"} : $address")
        // Implement your connection logic here
        if (isScanning) {
            stopBleScan()
        }

        with(device) {
            if (ActivityCompat.checkSelfPermission(
                    this@MainActivity,
                    Manifest.permission.BLUETOOTH_CONNECT
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                return
            }
            connectGatt(this@MainActivity, false, gattCallback)
        }
    }

    private val gattCallback = object : BluetoothGattCallback() {
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            val deviceAddress = gatt.device.address

            if (status == BluetoothGatt.GATT_SUCCESS) {
                if (newState == BluetoothProfile.STATE_CONNECTED) {
                    Log.w("Connext", "Successfully connected to $deviceAddress")
                    // TODO: Store a reference to BluetoothGatt
                } else if (newState == BluetoothProfile.STATE_DISCONNECTED) {
                    Log.w("Connext", "Successfully disconnected from $deviceAddress")
                    if (ActivityCompat.checkSelfPermission(
                            this@MainActivity,
                            Manifest.permission.BLUETOOTH_CONNECT
                        ) != PackageManager.PERMISSION_GRANTED
                    ) {
                        // TODO: Consider calling
                        //    ActivityCompat#requestPermissions
                        return
                    }
                    gatt.close()
                }
            } else {
                Log.w("Connext", "Error $status encountered for $deviceAddress! Disconnecting...")
                gatt.close()
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.S)
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            RUNTIME_PERMISSION_REQUEST_CODE -> {
                val containsPermanentDenial = permissions.zip(grantResults.toTypedArray()).any {
                    it.second == PackageManager.PERMISSION_DENIED &&
                            !ActivityCompat.shouldShowRequestPermissionRationale(this, it.first)
                }
                val containsDenial = grantResults.any { it == PackageManager.PERMISSION_DENIED }
                val allGranted = grantResults.all { it == PackageManager.PERMISSION_GRANTED }
                when {
                    containsPermanentDenial -> {
                        // TODO: Handle permanent denial (e.g., show AlertDialog with justification)
                        // Note: The user will need to navigate to App Settings and manually grant
                        // permissions that were permanently denied
                    }
                    containsDenial -> {
                        requestRelevantRuntimePermissions()
                    }
                    allGranted && hasRequiredRuntimePermissions() -> {
                        startBleScan()
                    }
                    else -> {
                        // Unexpected scenario encountered when handling permissions
                        recreate()
                    }
                }
            }
        }
    }


    /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "BLEApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

}
