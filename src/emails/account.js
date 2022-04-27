const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name)=> {

    sgMail.send({
        to: email,
        from :'jrenderle13@gmail.com',
        subject: "Welcome to the app",
        text: `Welcome to the app, ${name}. Let me know how you like the app please!`,
        cc: ''
    })
    
}

const sendDeleteEmail = (email, name) =>{

    sgMail.send({
        to: email,
        from :'jrenderle13@gmail.com',
        subject: "We're sad your'e leaving the app!",
        text:  `Sorry to see you leave the app, ${name}. We hope you'll be back some day, partner!`,
        cc: ''
    })


}

module.exports= {
    sendWelcomeEmail,
    sendDeleteEmail
}




// sgMail.send({
//     to: 'jrenderle13@gmail.com',
//     from: 'jrenderle13@gmail.com',
//     subject: 'This is my first test email',
//     text:'I hope this email finds you well'
// })