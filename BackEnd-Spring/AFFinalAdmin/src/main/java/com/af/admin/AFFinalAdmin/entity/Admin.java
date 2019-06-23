package com.af.admin.AFFinalAdmin.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "admins")
public class Admin implements Serializable {

    @Id
    private String id;
    private String Admin_Id;
    private String name;
    private String role;

    public Admin(String id, String admin_Id, String name, String role) {
        this.id = id;
        this.Admin_Id = admin_Id;
        this.name = name;
        this.role = role;
    }

    public Admin(String id, String admin_Id, String name) {
        this.id = id;
        this.Admin_Id = admin_Id;
        this.name = name;
    }

    public Admin(String id, String admin_Id) {
        this.id = id;
        this.Admin_Id = admin_Id;
    }

    public Admin(String id) {
        this.id = id;
    }

    public Admin() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAdmin_Id() {
        return Admin_Id;
    }

    public void setAdmin_Id(String admin_Id) {
        Admin_Id = admin_Id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
