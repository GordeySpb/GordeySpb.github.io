<?php

    $name = $_POST['user-name'];
    $tell = $_POST['user-tell'];
    $pay = $_POST['pay-option'];
    $message = $_POST['message'];
    $street = $_POST['user-street'];
    $house = $_POST['user-house'];
    $housing = $_POST['user-housing'];
    $flat = $_POST['user-flat'];
    $floor = $_POST['user-floor'];

    $disturb = $_POST['dont-disturb']; 
    $disturb = isset($disturb) ? 'НЕТ' : 'ДА'; 

    $mail_message = '
    <html>
        <head>
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя:'. $name .' </li>
                <li>Телефон:'. $tell .' </li>
                <li>Улица:'. $street .' </li>
                <li>Дом:'. $house .' </li>
                <li>Корпус:'. $housing .' </li>
                <li>Квартира:'. $flat .' </li>
                <li>Этаж:'. $floor .' </li>
                <li>Способ оплаты:'. $pay .' </li>
                <li>Комментарий к заказу:'. $message .' </li>
                <li>Перезвонить:'. $distrub .' </li>
            </ul>
        </body>
    </html>
    ';
    
    $headers = "From: Администратор сайта <chakNoris@snogiNa.com>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('gordey_89@mail.ru', 'Заказ', $mail_message, $headers);

    $data = [];
    
        if ($mail) {
            $data['status'] = true;
            $data['mes'] = "Письмо успешно отправлено";
        }else{
            $data['status'] = false;
            $data['mes'] = "На сервере произошла ошибка";
        }
    
        echo json_encode($data);
    
?>