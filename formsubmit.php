<?php
//echo "<pre>"; print_r($_POST); die;

if(isset($_POST['email']))
{	
	
	$username = "Thiru";
	$password = "Eiffel@1234";
	$lead_source = "Website";

    $campaign_c = "";
    if($_POST["utmsource"]=="facebook-newsfeed" || $_POST["utmsource"]=="facebook-leadgen"){
                    $campaign_c='DIGITAL_FB_NOWORNEVER';
    }
    if($_POST["utmsource"]=="facebook-call-only"){
                    $campaign_c='DIGITAL_FB_CALL_NOWORNEVER';
    }
    if($_POST["utmsource"]=="google-search"){
                    $campaign_c='DIGITAL_GOOGLE_NOWORNEVER_SEARCH';
    }
    if($_POST["utmsource"]=="google-display"){
                    $campaign_c='DIGITAL_GOOGLE_NOWORNEVER_DISPLAY';
    }

	$projects_of_interest_c = filter_var($_POST['projects'],FILTER_SANITIZE_STRING);
	$first_name = ucwords(filter_var($_POST['name'],FILTER_SANITIZE_STRING));
	$email1 = filter_var($_POST['email'],FILTER_SANITIZE_EMAIL);
	$dialCode = filter_var($_POST['dialCode'],FILTER_SANITIZE_STRING);
	$phone_mobile = filter_var($_POST['phone'],FILTER_SANITIZE_STRING);
	$phone = filter_var($_POST['phone'],FILTER_SANITIZE_STRING);

	$url2="https://www.edenlandmarks.com/campaign/codenamenowornever/";
	$subject=filter_var($_POST['subject'],FILTER_SANITIZE_STRING);
	$message=ucfirst(filter_var($_POST['message'],FILTER_SANITIZE_STRING));

    $utmcampaign = filter_var($_POST['utmcampaign'],FILTER_SANITIZE_STRING);
	
	// Insert data into CRM    
    $url = "http://xrbia.in/xrbia/index.php?entryPoint=webapi";
    $postData = array(
        "name" => $first_name,
        "mobile" => $phone_mobile,
        "email" => $email1,
        "project_name" => $projects_of_interest_c,
        "comments" => $message,
        "campaign_c" =>$campaign_c,
        "prospect_url" => $url2,
		"prospect_source" => $lead_source 
    );
    $postData = json_encode($postData);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization:Basic eHJiaWE6WHJiIUAjMzIx",
        'Content-Type: application/json'
    ));
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    @curl_setopt($ch, HEADER, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   // setcookie("brochure_submitted", true, time()+30*24*60*60, '/');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    
    $data = curl_exec($ch);
    print_r($data);
    // print_r($phone);
    curl_close($ch);

    $filemsg = date("Y-m-d h:i:sa"). ', '. $first_name . ', ' .  $email1 . ', ' . $phone_mobile . ', ' .  $lead_source . ', ' .  $campaign_c . ', ' . $utmcampaign . ', ' .  $data ."\n";
    $filemsg .="\n=====================================================================================================================================================================\n";

    $file = fopen("leads.txt","a");
    fwrite($file, $filemsg);
    fclose($file);

}
?>