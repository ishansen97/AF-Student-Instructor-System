package com.af.admin.AFFinalAdmin.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "admin_roles")
public class AdminRole implements Serializable {

    @Id
    private String id;
    private String role;

    public AdminRole(String id, String role) {
        this.id = id;
        this.role = role;
    }

    public AdminRole(String id) {
        this.id = id;
    }

    public AdminRole() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
