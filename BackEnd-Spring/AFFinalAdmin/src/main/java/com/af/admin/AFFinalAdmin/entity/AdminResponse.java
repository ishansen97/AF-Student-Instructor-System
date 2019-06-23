package com.af.admin.AFFinalAdmin.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class AdminResponse {

    private String username;
    private String admin_role;

    public AdminResponse(String username, String admin_role) {
        this.username = username;
        this.admin_role = admin_role;
    }

    public AdminResponse(String username) {
        this.username = username;
    }

    public AdminResponse() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAdmin_role() {
        return admin_role;
    }

    public void setAdmin_role(String admin_role) {
        this.admin_role = admin_role;
    }
}
