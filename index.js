const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var userData = require("./userData");


const app = express();
const apiPort = 3003 ;

//console.log(userData);

const router = express.Router();

userData = userData.userData;           // Se va directamente a la lista del archivo

router.get("/get-user-data/:id", function(request, response){
    try{
        const {params: {id :input}} = request;
        console.log(input);
        user = userData.find(function(item){
            console.log(item.id," =? ", input);
            return input == item.id;
        })
        if(user==undefined){
            response.send({
                status: 404,
                "ERROR":"404 - Usuario no existe"
            });
        }else{
            response.send({
                "status":200,
                "user":{
                    "fullName": user.firstName + " " + user.lastName + " " + user.maidenName,
                    "email":user.email,
                    "age":user.age,
                    "address":user.address,
                    "jobTitle":user.company.title,
                }
            });
        }
    }catch(error){
        console.log(error);
        response.send({
            status: 500,
            "ERROR":"500 - Algo ha salido mal"
        });
    }
});

router.put("/update-user-address/:id", function(request, response){
    try{
        const {params: {id :input}} = request;
        console.log(input);
        user = userData.find(function(item){
            console.log(item.id," =? ", input);
            return input == item.id;
        })
        if(user==undefined){
            response.send({
                status:404,
                "ERROR":"404 - Usuario no existe"
            });
        }else{
            let idx = userData.indexOf(user);
            user.address = request.body.address;
            userData[idx] = user;
            response.send({
                "status":200,
                "user":{
                    "fullName": user.firstName + " " + user.lastName + " " + user.maidenName,
                    "email":user.email,
                    "age":user.age,
                    "address":user.address,
                    "jobTitle":user.company.title,
                }
            });
        }
    }catch(error){
        console.log(error);
        response.send({
            status: 500,
            "ERROR":"500 - Algo ha salido mal"
        });
    }
});


app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(bodyParser.json())
app.use('/', router)

app.listen(apiPort, () => console.log(`server running on port ${apiPort}`))
