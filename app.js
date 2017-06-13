//module dependencies

var express=require('express');
var routes=require('./routes');
var http=require('http');
var path=require('path');

//load customers route
var customers=require('./routes/customers');
var app=express();

var connection=require('express-myconnection');
var mysql=require('mysql');

//all environments
app.set('port',process.env.PORT || 3100);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname,'public')));

//development only
if('development'==app.get('env')){
    app.use(express.errorHandler());
}

app.use(
    connection(mysql,{
        host:'localhost',
        user:'root',
        password:'123123',
        port:3306,
        database:'mydb'
    },'pool')
);

app.get('/',routes.index);
//todo customer login
//app.get('/customers/login',customers.login);
app.get('/customers',customers.list);
app.get('/customers/add',customers.add);
app.post('/customers/save',customers.save);
app.get('/customers/edit/:id',customers.edit);
app.post('/customers/edit/:id',customers.save_edit);
app.get('/customers/delete/:id',customers.delete_customer);
//app.get('/value',customers.procedure_call);
//todo

app.use(app.router);

http.createServer(app).listen(app.get('port'),function(){
    console.log('running port:'+app.get('port'));
});
