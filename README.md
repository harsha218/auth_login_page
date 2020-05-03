# auth_login_page
Simple login page with mail and mobile authentication bulit in node.js

#Instructions
I have only created 4 routes in this project. 

1. '/sendMail'
    It is a POST request and you have to feed it with a JSON object containing the registering Email ID.
    Eg: { "userMail" : "abc@domain.com" }

2. '/sendSms'
    It is a POST request and you have to feed it with a JSON object containing the registering Mobile number.
    Eg: { "userMobile" : "+91**********" }
    Note: you have to send the number along with Country Code [include '+' also]

3. '/validateMail'
    It is a POST request and you have to feed it with a JSON object containing the registering Email ID along with the OTP received.
    Eg: { "userMail" : "abc@domain.com", "token" : "043602" }

4. '/validateSms'
    It is a POST request and you have to feed it with a JSON object containing the registering Mobile no along with the OTP received.
    Eg: { "userMobile" : "+91**********", "token" : "043602" }

-Assumed procedure is the user selects mail or mobile as sign-up method and enters the mail/mobileNo which is given to either 1 or 2 routes according to what user selected.

-If the enter details is correct user will get an OTP to mail/mobile.

-When user enters the OTP in the web-application, route 3 or 4 is used which verifies whether the OTP is correct and not expired.

-The OTP will be alive for 90 sec.

#Note
1. In src>routes>routing.js line 22,23 are left with spaces where you have to give your mailId and passCode to send the mail. It will be the 'From' address. And make sure that mail account don't have 2-factor-authentication and allow access to less-secure apps.

2. Along with that you have to create an Twilio account and fill your accountSid, authToken and trail number given by twilio.
    Use this link - https://www.twilio.com/try-twilio

I don't think but hope it helps you and feel free to improve it... 
