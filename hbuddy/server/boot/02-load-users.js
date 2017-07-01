'use strict';

// to enable these logs set `DEBUG=boot:02-load-users` or `DEBUG=boot:*`
var log = require('debug')('boot:02-load-users');

module.exports = function(app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

//  createDefaultUsers();

  function createDefaultUsers() {

    log('Creating roles and users');

    var MyUser = app.models.MyUser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    var users = [];
    var roles = [{
      name: 'admin',
      users: [{
        firstName: 'Gurvinder',
        lastName: 'Singh',
        email: 'sinny777@gmail.com',
        username: 'sinny777',
        password: '1SatnamW',
        provider: 'hukam'
      }]
    }];

    roles.forEach(function(role) {
      Role.findOrCreate(
        {where: {name: role.name}}, // find
        {name: role.name}, // create
        function(err, createdRole, created) {
          if (err) {
            console.error('error running findOrCreate('+role.name+')', err);
            return false;
          }
          
          console.log('created: >>>>> ', created);
          console.log('createdRole: >>>>> ', createdRole)
          if(createdRole){
        	  (created) ? log('created role', createdRole.name)
                      : log('found role', createdRole.name);
          }
         
          role.users.forEach(function(roleUser) {
        	MyUser.findOrCreate(
              {where: {username: roleUser.username}}, // find
              roleUser, // create
              function(err, createdUser, created) {
                if (err) {
                  console.error('error creating roleUser', err);
                }
                (created) ? log('created user', createdUser.username)
                          : log('found user', createdUser.username);
                createdRole.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: createdUser.id
                }, function(err, rolePrincipal) {
                  if (err) {
                    console.error('error creating rolePrincipal', err);
                  }
                  users.push(createdUser);
                });
              });
          });
        });
    });
    return users;
  }

};
