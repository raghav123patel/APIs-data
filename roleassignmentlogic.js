let assignedRole = ROLES.user; // default role
    if (role && role.toLowerCase() === "admin") {
      assignedRole = ROLES.admin;
    }
