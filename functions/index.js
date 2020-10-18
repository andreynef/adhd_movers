const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const config = functions.config();//достаем конфиг из функции
const cors = require("cors")({origin:true});//разрешает кроссресурс шеринг. Решает проблему Local3000 !== cloudfunctions.com. То-есть эту: Access to XMLHttpRequest at 'https://us-central1-material-react-arc.cloudfunctions.net/sendMail' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

admin.initializeApp();//теперь наша ф установлена и теперь есть доступ к firebase через наш node.js код.
//теперь можно вызывать ф через URL хоть когда
//след шаг это Nodemailer чтобы понять какую ф мы будем сетапить. Потом Деплой. И все готово, можно будет вызывать ф по URL.

//Nodemailer.com

//firebase functions:config:set user.email="...логин от почты без собаки итд..."//важно " а не '
//firebase functions:config:set user.password="..."//важно " а не '
//теперь логин и пароль сохранены в базе firebase для безопасности
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {user: config.user.email, pass: config.user.password}
});


let mailOptions = {};

exports.sendMailFromKMovers= functions.https.onRequest((request, response)=>{
  cors(request, response, ()=>{
    const{name, email, phone, message, to, from, moveSize, date, time, elevatorFrom, elevatorTo, stairsFrom, stairsTo, parkingFrom, parkingTo, items, notes} = request.query

    if(to){//если в реквесте/ответе есть значение to то значит это пачка с заказом а если нет то это просто сообщение
      mailOptions = {//то что получим себе от того почтов ящика
        from: 'Konstant Movers',
        to:'andreynef@gmail.com, konstant.movers.bay@gmail.com',
        subject: 'Quote received',
        html:`
              <p style='font-size:16px'> From: ${name} </p>
              <p style='font-size:16px'> Email: ${email} </p>
              <p style='font-size:16px'> Phone: ${phone} </p>
              <p style='font-size:16px'> MoveFrom: ${from} </p>
              <p style='font-size:16px'> MoveTo: ${to} </p>
              <p style='font-size:16px'> Move size: ${moveSize} </p>
              <p style='font-size:16px'> Date of moving: ${date} </p>
              <p style='font-size:16px'> Time of moving: ${time} </p>
              <p style='font-size:16px'> Elevator (from): ${elevatorFrom} </p>
              <p style='font-size:16px'> Elevator (to): ${elevatorTo} </p>
              <p style='font-size:16px'> Stairs (from): ${stairsFrom} </p>
              <p style='font-size:16px'> Stairs (to): ${stairsTo} </p>
              <p style='font-size:16px'> Parking (from): ${parkingFrom} </p>
              <p style='font-size:16px'> Parking (to): ${parkingTo} </p>
              <p style='font-size:16px'> List of items: ${items} </p>
              <p style='font-size:16px'> Notes: ${notes} </p>

            `
      };
    }else {//просто сообщение
      mailOptions = {//то что получим себе от того почт ящика
        from: 'Konstant Movers',
        to: 'andreynef@gmail.com, konstant.movers.bay@gmail.com',
        subject: 'Message received',
        html: `
              <p style='font-size:16px'> From: ${name} </p>
              <p style='font-size:16px'> Email: ${email} </p>
              <p style='font-size:16px'> Phone: ${phone} </p>
              <p style='font-size:16px'> Message: ${message} </p>
            `,
      };
    }

    transporter.sendMail(mailOptions, error=> {
      if(error){
        response.send(error);
      } else {
        response.send('Message sent successfully');
      }
    });

    mailOptions = {//то что отправим им обратно
      from: 'Konstant Movers',
      to:email,
      subject: 'We have received your message!',
      // html: copiedResponseHugeHtmlForMessage,
    };
    transporter.sendMail(mailOptions)//просто отправить еще раз по новому адресу с новым шаблоном. Без проверок, ибо это лишнее тк уже проверено.

  });
});



//
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
//
