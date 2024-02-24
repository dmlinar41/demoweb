<?php
    $name = $_POST["Ime"];
    $surname = $_POST["Priimek"];
    $company = $_POST["Podjetje"];
    $email = $_POST["E-mail"];
    $subject = $_POST["Zadeva"];
    $message = $_POST["Sporočilo"];
    $mailTo = "dmlinar@mail.com";

    $headers = "From: ".$name ..$surname ."<".$email.">";
    $txt = "Ime: ".$name."\r\nPriimek: ".$surname."\r\nPodjetje: ".$company."\r\nE-mail: ".$email."\r\nZadeva: ".$subject."\r\nSporočilo: ".$message.;

    mail($mailTo, $subject, $txt, $headers);
   
    header('Location:https://dmlinar41.github.io/demoweb/back_to_home.html');
?>