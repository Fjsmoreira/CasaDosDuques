#!/bin/sh
export SMTP_HOST='smtp.gmail.com'
export SMTP_PORT='587'
export SMTP_USER=''
export SMTP_PASS=''
export EMAIL_FROM=''
export EMAIL_TO='fernando@casadosduques.pt'
exec node /app/server.js
