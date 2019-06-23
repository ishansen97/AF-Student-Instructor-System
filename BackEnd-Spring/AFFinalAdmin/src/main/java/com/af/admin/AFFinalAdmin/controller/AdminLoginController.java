package com.af.admin.AFFinalAdmin.controller;

import com.af.admin.AFFinalAdmin.entity.AdminLogin;
import com.af.admin.AFFinalAdmin.entity.AdminResponse;
import com.af.admin.AFFinalAdmin.service.AdminLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminLoginController {

    @Autowired
    private AdminLoginService adminLoginService;

    @CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = {"authorization", "content-type"})
    @RequestMapping(method = RequestMethod.POST, value = "/api/resources/admin-login/verify")
    public ResponseEntity<AdminLogin> verifyAdmin(@RequestBody AdminLogin adminLogin, @RequestHeader("authorization") String header) {
        boolean isAdmin = adminLoginService.isAdminAvailable(adminLogin, header);
        AdminResponse response = null;

        if (isAdmin) {
//            AdminResponse response = adminLoginService.getUsernameAndRole(adminLogin.getUsername());
            return new ResponseEntity<>(adminLogin, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = {"authorization", "content-type"})
    @RequestMapping(method = RequestMethod.PUT, value = "/api/resources/admin-login/update-password/{username}")
    public ResponseEntity<AdminLogin> updatePassword(@PathVariable("username") String username, @RequestHeader("authorization") String password) {
        AdminLogin adminLogin = adminLoginService.updatePassword(username, password);

        if (adminLogin != null) {
            return new ResponseEntity<>(adminLogin, HttpStatus.NO_CONTENT);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
