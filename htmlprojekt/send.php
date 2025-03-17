<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    
    $to = "bitcoins829@gmail.com"; // Ваш email
    $subject = "Новое сообщение с сайта";
    
    $message_body = "Имя: " . $name . "\n" .
                   "Email: " . $email . "\n" .
                   "Телефон: " . $phone . "\n\n" .
                   "Сообщение:\n" . $message;
    
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    if (mail($to, $subject, $message_body, $headers)) {
        header("Location: thanks.html");
    } else {
        echo "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.";
    }
}
?> 