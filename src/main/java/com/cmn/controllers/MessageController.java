package com.cmn.controllers;

import com.cmn.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/room/con")
    public Message getContent(@RequestBody Message message){
        try {
            Thread.sleep(1000);
        }catch (InterruptedException exe){
            exe.printStackTrace();
        }
        return message;
    }
}
