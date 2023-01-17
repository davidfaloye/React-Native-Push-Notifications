<?php
require_once __DIR__ . '/vendor/autoload.php';

try {
    $channelName = 'news';
    $recipient= 'ExponentPushToken[unique]';
    
    // You can quickly bootup an expo instance
    $expo = \ExponentPhpSDK\Expo::normalSetup();
    
    // Subscribe the recipient to the server
    $expo->subscribe($channelName, $recipient);
    
    // Build the notification data
    $notification = ['body' => 'Hello World!'];
    
    // Notify an interest with a notification
    $expo->notify([$channelName], $notification);
    echo 'Succeeded! We have created an Expo instance successfully';
} catch (Exception $e) {
    echo 'Test Failed';
}


?>