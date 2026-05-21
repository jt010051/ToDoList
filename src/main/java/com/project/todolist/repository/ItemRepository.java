package com.project.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.todolist.domain.Item;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
	Item findByItemName(String itemName);
}
