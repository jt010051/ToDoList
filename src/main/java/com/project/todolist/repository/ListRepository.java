package com.project.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.todolist.domain.Item;
import com.project.todolist.domain.ListOfItems;

@Repository
public interface ListRepository extends JpaRepository<ListOfItems, Long> {
	ListOfItems findByListName(String listName);

}
