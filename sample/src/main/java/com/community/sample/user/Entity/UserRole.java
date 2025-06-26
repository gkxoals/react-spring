package com.community.sample.user.Entity;

public enum UserRole {
    ADMIN,
    USER;

    public String getRoleName() {
        return "ROLE_"+this.name();
    }

}
