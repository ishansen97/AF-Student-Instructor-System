package com.af.admin.AFFinalAdmin.repository;

import com.af.admin.AFFinalAdmin.entity.AdminLogin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminLoginRepository extends MongoRepository<AdminLogin, String> {
    public AdminLogin findByUsername(String username);
}
