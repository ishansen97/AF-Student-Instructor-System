package com.af.admin.AFFinalAdmin.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.af.admin.AFFinalAdmin.entity.Admin;
import com.af.admin.AFFinalAdmin.entity.AdminLogin;
import com.af.admin.AFFinalAdmin.entity.AdminResponse;
import com.af.admin.AFFinalAdmin.entity.AdminRole;
import com.af.admin.AFFinalAdmin.repository.AdminLoginRepository;
import com.af.admin.AFFinalAdmin.repository.AdminRoleRepository;
import com.fasterxml.jackson.databind.ser.Serializers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class AdminLoginService {

    @Autowired
    private AdminLoginRepository adminLoginRepo;

    @Autowired
    private AdminRoleRepository adminRoleRepository;

    public boolean isAdminAvailable(AdminLogin adminLogin, String header) {
        String username = adminLogin.getUsername();

        AdminLogin adminObj = adminLoginRepo.findByUsername(username);

        if (adminObj != null) {
            String password = adminObj.getPassword();
            String[] pass_parts = header.split("Basic", 2);
            byte[] bytes = Base64.getDecoder().decode(pass_parts[1]);
            String input_password = new String(bytes);

            if (password.equals(input_password)) {
                System.out.println("password is admin");
                return true;
            }
            else {
                byte[] password_bytes = Base64.getDecoder().decode(password);
                String document_password = new String(password_bytes);

                if (input_password.equals(document_password)) {
                    System.out.println("very good");
                    return true;
                }
                else {
                    System.out.println("missed by kes gas");
                    return false;
                }
            }

        }
        else {
            System.out.println("No objects");
            return false;
        }
    }

    public AdminLogin updatePassword(String username, String password) {
        AdminLogin adminLogin = adminLoginRepo.findByUsername(username);

        if (adminLogin != null) {
            String[] pass_parts = password.split("Basic", 2);
            adminLogin.setPassword(pass_parts[1]);
            adminLoginRepo.save(adminLogin);
            return adminLogin;
        }
        else {
            return null;
        }

    }

//    public AdminResponse getUsernameAndRole(String username) {
//        AdminLogin adminLogin = adminLoginRepo.findByUsername(username);
//        String role = null;
//        List<String> roles = new ArrayList<>();
//
//        if (adminLogin != null) {
//            Admin admin = adminRepo.findByAdmin_Id(username);
//            String role_Id = admin.getRole();
//            roles.add(role_Id);
//            Iterable<AdminRole> adminRoles = adminRoleRepository.findAllById(roles);
//
//            for (AdminRole ar : adminRoles) {
//                role = ar.getRole();
//            }
//
//            AdminResponse adminResponse = new AdminResponse(username, role);
//
//            System.out.println("Everything is ok");
//
//            return adminResponse;
//        }
//
//        else {
//            System.out.println("Something is wrong");
//            return null;
//        }
//    }
}
