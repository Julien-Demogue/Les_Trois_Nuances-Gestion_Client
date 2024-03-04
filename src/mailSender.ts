import nodemailer from 'nodemailer';

export function sendEmail(){
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: 'demogue.julien.me@gmail.com',
      pass: '3691naFi',
    },
  });

  var mailOptions = {
    from: 'demogue.julien.me@gmail.com',
    to: 'julien.demogue@sfr.fr',
    subject: 'test',
    html: 'contenu'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      alert(error);
    } 
    else {
      alert('Email sent: ' + info.response);
    }
  });
}