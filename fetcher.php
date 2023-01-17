<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $request_raw = file_get_contents('php://input');
    $request = json_decode($request_raw,true);
    $title=$request['title'];
    $body=$request['body'];
    $data=$request['data'];
    require_once __DIR__ . '/../../../vendor/autoload.php';//after installing expo push notification library via "putty"

try {
    $channelName = 'test';
    $recipient= 'ExponentPushToken[L7hLDOF7fjNxWVNQ65zlbb]';
    
    // You can quickly bootup an expo instance
    $expo = \ExponentPhpSDK\Expo::normalSetup();
    
    // Subscribe the recipient to the server
    $expo->subscribe($channelName, $recipient);
    
    // Build the notification data
    $notification = ['title'=>$title,'body'=>$body,'data'=>json_encode($data)];
    
    // Notify an interest with a notification
    $expo->notify([$channelName], $notification);
    echo 'Succeeded! We have created an Expo instance successfully';
} catch (Exception $e) {
    echo 'Test Failed';
}
}

?>