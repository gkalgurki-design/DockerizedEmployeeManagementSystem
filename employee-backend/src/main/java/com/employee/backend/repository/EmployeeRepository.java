package com.employee.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee.backend.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}