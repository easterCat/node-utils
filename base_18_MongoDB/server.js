/**
 * Created by easterCat on 2017/9/12.
 */
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(multer({dest: '/tmp'}).array('image'));
app.use(cookieParser());


app.get('/', (request, response) => {
    response.send('hello world');
    console.log('cookie', request.cookies);
});

app.get('/index.html', (request, response) => {
    response.sendFile(__dirname + '/' + 'index.html');
});

app.get('/process_get', (request, response) => {
    let data = {
        "first_name": request.query.first_name,
        "last_name": request.query.last_name
    };
    console.log(data);
    response.end(JSON.stringify(data));
});

app.post('/process_post', bodyParser.urlencoded({
    extended: false
}), (request, response) => {
    let data = {
        "first_name": request.body.first_name,
        "last_name": request.body.last_name
    };
    console.log(data);
    response.end(JSON.stringify(data));
});

app.get('/list_user', (request, response) => {
    console.log('/list_user这是用户列表');
    fs.readFile(__dirname + "/" + "User.json", 'utf8', (err, data) => {
        console.log(data);
        response.end(data);
    });
});

app.get('/add_user', (request, response) => {
    console.log('/add_user这是添加用户列表');
    fs.readFile(__dirname + "/" + "User.json", 'utf8', (err, data) => {
        let jsonlength = 1;
        data = JSON.parse(data);
        for (let item in data) {
            jsonlength++;
        }
        console.log(jsonlength);
        let new_data = {
            "name": request.query.name,
            "password": request.query.password,
            "profession": request.query.profession,
            "id": jsonlength
        };
        data[`user${jsonlength}`] = new_data;
        fs.writeFile(__dirname + "/" + "User.json", JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });
        console.log(data);
        response.end(JSON.stringify(data));
    });
});

app.get('/:id', (request, response) => {
    fs.readFile(__dirname + '/' + 'User.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let user = data[`user${request.params.id}`];
        console.log(user);
        response.end(JSON.stringify(user))
    })
});

app.get('/delete_user/:id', (request, response) => {
    fs.readFile(__dirname + '/' + 'User.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        delete data[`user${request.params.id}`];
        fs.writeFile(__dirname + '/' + 'User.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });
        console.log(data);
        response.end(JSON.stringify(data));
    })
});


app.post('/file_upload', (request, response) => {
    console.log(request.files[0]);
    let des_file = __dirname + "/public/images/" + request.files[0].originalname;
    fs.readFile(request.files[0].path, (err, data) => {
        fs.writeFile(des_file, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                info = {
                    message: 'file uploaded success',
                    filename: request.files[0].originalname
                };
            }
            console.log(info);
            response.end(JSON.stringify(info));
        })
    })
});


const server = app.listen(8081, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});