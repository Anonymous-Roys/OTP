const nodemailer = require('nodemailer');
const {EMAIL, PASSWORD}=require('../env.js')
const MailGen = require('mailgen');

const signup = async (req,res) =>{
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "maddison53@ethereal.email",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });

        // send mail with defined transport object
        let message = {
          from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
          to: "bar@example.com, baz@example.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        }
        transporter.sendMail(message)
        .then((info) => {
            console.log("almost")
            return res.status(201).json({msg: 'You will receive a mail',
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
           
        }).catch(error =>{
            return res.status(500).json({error})
        });
      
    
}


// real
const getBill = (req, res) =>{
    const {userEmail} = req.body;
    let config = {
        service : 'gmail',
        auth : {
            user : EMAIL,
            pass : PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new MailGen({
        theme : 'default',
        product : {
            name : 'Maddison',
            link : 'http://mailgen.js',

        }
    })

    let response = {
        body:{
            name: "Davies",
            intro: "Your bill is ready",
            table:{
                data:[
                    {
                        item:"Nodemailer stack book",
                        description: "A backend development",
                        price:"$100"
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }
    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to: userEmail,
        subject: "PlaceOrder",
        html: mail
    }
    transporter.sendMail(message)
    .then((info) => {
        return res.status(201).json({msg: 'You will receive a mail',})
    }).catch((error) => {
        return res.status(500).json({error})
    })


    // res.status(201).json('Bill successfully')
}

module.exports = {signup, getBill}