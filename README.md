# Qrewards v1.0.0

* port: 1500
* test port: 1400

---

Servicios REST que ofrecen:

Settings

* 'DELETE /settings/:id': 'SettingsController.destroy',
* 'PATCH /settings/:id': 'SettingsController.update',
* 'GET /settings/:idUser': 'SettingsController.findByUser',


Users (Me)

* 'GET /users/me': 'UsersController.findOne',
* 'PATCH /users/me': 'UsersController.update',

### Instalación

* requiere de [Node.js](https://nodejs.org/) v6+
* requiere de [MongoDB](https://www.mongodb.com/) 3.6

Instalar dependencias y arrancar el servicio.

```sh
$ cd users
$ npm install
$ sails lift
```

### SonarQube

Requerimientos:

* correr pruebas

```sh
$ npm run sonarQube
```

### Coverage