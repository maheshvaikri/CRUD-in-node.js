
//show the lists of all customers
exports.list = function(req, res){

  req.getConnection(function(err,connect){

        //if there is no error then the all data are in the rows variable
        //var query = connect.query('SELECT * FROM customer',function(err,rows)
        var query=connect.query('call selectAll()',function(err,rows)
        {
            //if error occured then this message is shown and stopped
            if(err)
                console.log("Error Selecting : %s ",err );

            /*other wise if there is no error then pass the rows value  to the customers.ejs
            in views folder */

            res.render('customers',{page_title:"Customers - Node.js",data:rows[0]});
            //console.log(rows);
            /* send the rendered view to the client here customers page is send to the
            client side*/

            /*page_title:"" pass alocal variable to the view. page_title is mapping with the
            with the header.ejs file in the layouts folder and rows values are
            stored in data variables and mapping with the data in customers.ejs page
            in vies folder  */

         });

    });

};

exports.procedure_call=function(req,res){
  req.getConnection(function(err,connection){


    var query=connection.query('call edit(3)',function(err,rows){
      if(err)
        console.log("error slecting: %s",err);

        console.log(rows[0]);


    });
  });
};

//show the add page of customers
exports.add=function(req,res){
  res.render('add_customer',{page_title:"Add Customers - Node.js"});

};


//do the operation to save customer information
exports.save=function(req,res){
  var input=JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
    var data={
      name:input.name,
      address:input.address,
      email:input.email,
      phone:input.phone
    };

    var query=connection.query("call insert_customer(?,?,?,?);",[data.name,data.address,data.email,data.phone],
  function(err,rows)
{
  if(err)
  {
    console.log("Error inserting : %s",err);
  }
  res.redirect("/customers");

  console.log(data);
 });
});

};


//call the edit page by the id
exports.edit=function(req,res){
  var id=req.params.id;

  req.getConnection(function(err,connection){
    //var query=connection.query("select * from customer where id=?",[id],
    var query=connection.query("call edit(?)",[id],
      function(err,rows){
        if(err)
          console.log("Error selecting :%s",err );

        res.render('edit_customer',{page_title:"Edit customers - Node.js",data:rows[0]});


      });
  });

};


//do the edit action
exports.save_edit=function(req,res){
  var input=JSON.parse(JSON.stringify(req.body));
  var id=req.params.id;

  req.getConnection(function(err,connection){
    var data={
      name:input.name,
      address:input.address,
      email:input.email,
      phone:input.phone
    };

    //connection.query("update customer set ? where id=?",[data,id],
    connection.query('call update_customer(?,?,?,?,?)',[data.name,data.address,data.email,data.phone,id],
      function(err,rows)
      {
        if(err)
          console.log("Error updating: %s",err);

        res.redirect('/customers');
      });
  });
};

//delte the customer form the customer tabel
exports.delete_customer=function(req,res){
  var id=req.params.id;

  req.getConnection(function(err,connection){
    //connection.query("delete from customer where id=?",[id],
    connection.query("call delete_customer(?)",[id],
      function(err,rows){
        if(err)
          console.log("error deleting : %s",err);

        res.redirect('/customers');
      });
  });
};
