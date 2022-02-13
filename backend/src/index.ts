import "reflect-metadata";

import { Incident } from "./entity/Incident";
import { Service } from "./entity/Service";
import { Settings } from "./entity/Settings";
import { User } from "./entity/User";
import config from "./../config.json";
import cors from "cors";
import { createConnection } from "typeorm";
import helmet from "helmet";

const express = require('express');
const app = express();
const port = 8080;
const version = "v1";
export var connection = null;
app.use(express.json());
app.use(helmet());
app.use(cors())

app.get("/api/", async (req, res) => {
    const services = connection.getRepository(Service); 
    const incidents = connection.getRepository(Incident);
    const settings = connection.getRepository(Settings);

    res.send({
        "version": version,
        "services": await services.find(),
        "incidents": await incidents.find(),
        "settings": await settings.find(),
        "status": (await settings.find({ key: "systemStatus" }))[0].value,
        

    })
});

app.get("/api/" + version + "/users", async (req, res) => {

    const users = connection.getRepository(User);
    res.send(await users.find() || { error: "No users found" })
});
app.get("/api/" + version + "/users/:id", async (req, res) => {

    const users = connection.getRepository(User);
    res.send((await users.find({ id: req.params.id }))[0] || { error: "No users found" })
});
app.post("/api/" + version + "/users/remove/:id", async (req, res) => {
    const users = connection.getRepository(User);
    await users.remove(await users.find({ id: req.params.id }));
    res.redirect("/api/" + version + "/users");
});
app.post("/api/" + version + "/users/add", async (req, res) => {
    const users = connection.getRepository(User);
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;

    await connection.manager
        .save(user)
        .then(user => {
            res.redirect("/api/" + version + "/users/" + user.id);
        });
});


app.get("/api/" + version + "/services", async (req, res) => {

    const services = connection.getRepository(Service);
    res.send(await services.find() || { error: "No services found" })
});
app.get("/api/" + version + "/services/:id", async (req, res) => {

    const services = connection.getRepository(Service);
    res.send((await services.find({ id: req.params.id }))[0] || { error: "No services found" })
});
app.get("/api/" + version + "/services/status/:status", async (req, res) => {

    const services = connection.getRepository(Service);
    res.send((await services.find({ status: req.params.status })) || { error: "No services found" })
});
app.get("/api/" + version + "/services/creator/:creator", async (req, res) => {

    const services = connection.getRepository(Service);
    res.send((await services.find({ creator: req.params.creator })) || { error: "No services found" })
});
app.post("/api/" + version + "/services/remove/:id", async (req, res) => {
    const services = connection.getRepository(Service);
    await services.remove(await services.find({ id: req.params.id }));
    res.redirect("/api/" + version + "/services");
});
app.post("/api/" + version + "/services/add", async (req, res) => {
    const services = connection.getRepository(Service);
    let service = new Service();
    service.name = req.body.name;
    service.creator = req.body.creator;
    service.status = req.body.status;
    service.description = req.body.description;


    await connection.manager
        .save(service)
        .then(service => {
            res.redirect("/api/" + version + "/services/" + service.id);
        });
});
app.post("/api/" + version + "/services/update/:id", async (req, res) => {
    const services = connection.getRepository(Service);
    let service = await services.findOne(req.params.id);
    service.name = req.body.name ? req.body.name : service.name;
    service.creator = req.body.creator ? req.body.creator : service.name;
    service.status = req.body.status ? req.body.status : service.status;
    service.description = req.body.description ? req.body.description : service.description;

    await connection.manager
        .save(service);
    res.redirect("/api/" + version + "/services/" + service.id);
});


app.get("/api/" + version + "/incidents", async (req, res) => {

    const incidents = connection.getRepository(Incident);
    res.send(await incidents.find() || { error: "No incidents found" })
});
app.get("/api/" + version + "/incidents/:id", async (req, res) => {

    const incidents = connection.getRepository(Incident);
    res.send((await incidents.find({ id: req.params.id }))[0] || { error: "No incidents found" })
});
app.get("/api/" + version + "/incidents/date/:date", async (req, res) => {

    const incidents = connection.getRepository(Incident);
    res.send((await incidents.find({ date: req.params.date })) || { error: "No incidents found" })
});
app.get("/api/" + version + "/incidents/status/:status", async (req, res) => {

    const incidents = connection.getRepository(Incident);
    res.send((await incidents.find({ status: req.params.status })) || { error: "No incidents found" })
});
app.get("/api/" + version + "/incidents/creator/:creator", async (req, res) => {

    const incidents = connection.getRepository(Incident);
    res.send((await incidents.find({ creator: req.params.creator })) || { error: "No incidents found" })
});
app.post("/api/" + version + "/incidents/remove/:id", async (req, res) => {
    const incidents = connection.getRepository(Incident);
    await incidents.remove(await incidents.find({ id: req.params.id }));
    res.redirect("/api/" + version + "/incidents");
});
app.post("/api/" + version + "/incidents/add", async (req, res) => {
    const incidents = connection.getRepository(Incident);
    let incident = new Incident();
    incident.title = req.body.title;
    incident.creator = req.body.creator;
    incident.report = req.body.report;
    incident.status = req.body.status;
    incident.affected = req.body.affected;
    incident.date = req.body.date || new Date();


    await connection.manager
        .save(incident)
        .then(incident => {
            res.redirect("/api/" + version + "/incidents/" + incident.id);
        });
});
app.post("/api/" + version + "/incidents/update/:id", async (req, res) => {
    const incidents = connection.getRepository(Incident);
    let incident = await incidents.findOne(req.params.id);
    incident.title = req.body.title ? req.body.title : incident.title;
    incident.creator = req.body.creator ? req.body.creator : incident.creator;
    incident.report = req.body.report ? req.body.report : incident.report;
    incident.status = req.body.status ? req.body.status : incident.status;
    incident.affected = req.body.affected ? req.body.affected : incident.affected;
    incident.date = req.body.date ? req.body.date : incident.date;
    incident.time = req.body.time ? req.body.time : incident.time;

    await connection.manager
        .save(incident);
    res.redirect("/api/" + version + "/incidents/" + incident.id);
});

app.get("/api/" + version + "/status/:type", (req, res) => {
    res.send(req.params.type.includes("s") ? config.status.service : config.status.incident)
})

app.get("/api/" + version + "/logo", (req, res) => {
    res.sendFile(__dirname + "/config/logo.png");
})




app.listen(port, async () => {

    console.log(`Initializing connection to database...`);
    connection = await createConnection()
    console.log(`Connection established...`);
    console.log(`Listening on ${getLocalIPAddress()}:${port}/api/${version}`);

})
function getLocalIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }
    return '0.0.0.0';
}
function verifyStatus(status: string, incident: boolean) {
    const allowedStatus = incident ? config.status.incident : config.status.service;
    return allowedStatus.includes(status.toLocaleUpperCase())? status : false;
}

