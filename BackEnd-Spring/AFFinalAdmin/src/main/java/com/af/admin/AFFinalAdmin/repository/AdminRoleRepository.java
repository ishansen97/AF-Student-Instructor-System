package com.af.admin.AFFinalAdmin.repository;

import com.af.admin.AFFinalAdmin.entity.AdminRole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRoleRepository extends MongoRepository<AdminRole, String> {
}
