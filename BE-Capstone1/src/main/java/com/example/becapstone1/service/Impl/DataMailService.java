package com.example.becapstone1.service.Impl;


import com.example.becapstone1.model.event.DataMail;
import com.example.becapstone1.service.IDataMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class DataMailService implements IDataMailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Override
    public void sendMail(DataMail dataMail, String templateName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        Context context = new Context();
        context.setVariables(dataMail.getProps());

        String html = templateEngine.process(templateName, context);

        helper.setTo(dataMail.getTo());
        helper.setSubject(dataMail.getSubject());
        helper.setText(html, true);
        mailSender.send(message);
    }

    public void sendMail(String toMail, String subject, String body){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("nguyenvansy091201@gmail.com");
        message.setTo(toMail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);

        System.out.println("Send success!!");
    }
}
