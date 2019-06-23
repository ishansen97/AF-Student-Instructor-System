package com.af.admin.AFFinalAdmin.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "adminlogins")
public class AdminLogin implements Serializable {

    @Id
    private String admin;
    private String username;
    private String password;

    public AdminLogin(String admin_id, String username, String password) {
        this.admin = admin_id;
        this.username = username;
        this.password = password;
    }

    public AdminLogin(String username) {
        this.username = username;
    }

    public AdminLogin(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public AdminLogin() {
    }

    public String getAdmin_id() {
        return admin;
    }

    public void setAdmin_id(String admin_id) {
        this.admin = admin_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
