<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // Server settings
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host       = 'smtp.ionos.co.uk';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@samuellegrice.co.uk';
        $mail->Password   = '5UPHc$7tDpqYB8$';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('info@samuellegrice.co.uk', 'Mailer');
        $mail->addAddress('Samuellegrice@icloud.com', 'Joe User');

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;

        // Styled email body
        $bodyContent = "
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333333;
                }
                .container {
                    width: 90%;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                h1 {
                    color: #007BFF;
                }
                p {
                    font-size: 16px;
                }
                .details {
                    margin-top: 20px;
                }
                .details p {
                    margin: 5px 0;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <h1>Contact Request Details</h1>
                <div class='details'>
                    <p><strong>Name:</strong> {$name}</p>
                    <p><strong>Email:</strong> {$email}</p>
                    <p><strong>Subject:</strong> {$subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>{$message}</p>
                </div>
                <div class='footer'>
                    <p>This email was sent from your website contact form.</p>
                </div>
            </div>
        </body>
        </html>
        ";

        $mail->Body    = $bodyContent;
        $mail->AltBody = "Name: {$name}\nEmail: {$email}\nSubject: {$subject}\nMessage: {$message}";

        $mail->send();
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "successfully sent email";
        echo json_encode($output);
    } catch (Exception $e) {
        $output['status']['code'] = "500";
        $output['status']['name'] = "error";
        $output['status']['description'] = "something went wrong, email not sent: {$mail->ErrorInfo}";
        echo json_encode($output);
    }
}
?>
